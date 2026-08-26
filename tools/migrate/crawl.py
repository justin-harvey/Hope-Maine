#!/usr/bin/env python3
"""
Phase 1 — Inventory.

Walks a site breadth-first and writes the raw HTML of every page to disk,
plus a manifest of every link found and how it was classified.

This does NOT extract content. That is the point. The scripts this grew out
of fetched and converted in a single pass, which means every change to an
extraction rule costs another full crawl of somebody else's server. Here the
crawl happens once; `extract.py` runs against the saved HTML as many times as
the rules need to change.

The manifest also makes the whole thing resumable, which is what lets an
agent run this in a loop: a second run re-fetches only what failed or what is
older than --max-age, and reports what changed since last time.

    python3 tools/migrate/crawl.py https://example.gov --out ./migration

Outputs, under --out:
    raw/<slug>.html     one file per page, untouched
    manifest.json       per-URL status, fetch time, content hash
    inventory.json      every link found, classified
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
import time
import urllib.robotparser
from collections import deque
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag

import requests
from bs4 import BeautifulSoup

ASSET_SUFFIXES = (
    ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
    ".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp", ".zip", ".csv", ".txt",
)
SKIP_SCHEMES = ("mailto:", "tel:", "javascript:", "data:", "#")


@dataclass
class PageRecord:
    url: str
    slug: str
    status: int | None = None
    content_hash: str | None = None
    fetched_at: str | None = None
    error: str | None = None
    depth: int = 0


@dataclass
class LinkRecord:
    """One link, as found. `kind` drives what later phases do with it."""
    source: str
    href_raw: str
    url: str
    text: str
    kind: str  # page | asset | external | mail | tel | skipped
    anchor: str = ""


def slugify_url(url: str) -> str:
    """A filename that survives round-tripping and does not collide.

    Uses the whole path, not just the basename. Flattening to a basename is
    the classic mistake here: a site with Agendas/2026/minutes.pdf and
    Minutes/2026/minutes.pdf silently loses one of them.
    """
    parsed = urlparse(url)
    path = parsed.path.strip("/")
    if parsed.query:
        path = f"{path}__{parsed.query}"
    slug = re.sub(r"[^A-Za-z0-9._-]+", "_", path).strip("_")
    return slug or "index"


def classify(source: str, href: str, base_domain: str) -> LinkRecord | None:
    href = href.strip()
    if not href or href.lower().startswith(SKIP_SCHEMES):
        kind = "mail" if href.lower().startswith("mailto:") else (
            "tel" if href.lower().startswith("tel:") else "skipped"
        )
        return LinkRecord(source, href, href, "", kind)

    # urljoin resolves relative paths against the *source page's* URL, which
    # is what makes page-relative and root-relative links come out the same.
    # Do not hand-roll this: about/index.php linking to about/contact.php is
    # page-relative and resolves to /about/contact.php, while /about/contact
    # is root-relative. Getting that backwards produces a whole tree of
    # plausible-looking 404s.
    absolute, _ = urldefrag(urljoin(source, href))
    parsed = urlparse(absolute)

    if parsed.scheme not in ("http", "https"):
        return LinkRecord(source, href, absolute, "", "skipped")

    is_asset = parsed.path.lower().endswith(ASSET_SUFFIXES)

    if base_domain not in parsed.netloc.lower():
        # A document is a document wherever it is served from. Municipal
        # sites routinely keep their PDFs on a separate document host or a
        # CDN subdomain, and calling those merely "external" is how a
        # migration quietly leaves the entire ordinance library behind.
        return LinkRecord(source, href, absolute, "",
                          "external_asset" if is_asset else "external")

    return LinkRecord(source, href, absolute, "", "asset" if is_asset else "page")


class Crawler:
    def __init__(self, start: str, out: Path, delay: float, max_pages: int,
                 user_agent: str, obey_robots: bool):
        self.start = start
        self.base_domain = urlparse(start).netloc.lower()
        self.out = out
        self.raw = out / "raw"
        self.delay = delay
        self.max_pages = max_pages
        self.session = requests.Session()
        self.session.headers["User-Agent"] = user_agent
        self.pages: dict[str, PageRecord] = {}
        self.links: list[LinkRecord] = []
        self.robots = self._load_robots(user_agent) if obey_robots else None

    def _load_robots(self, user_agent: str):
        parsed = urlparse(self.start)
        rp = urllib.robotparser.RobotFileParser()
        rp.set_url(f"{parsed.scheme}://{parsed.netloc}/robots.txt")
        try:
            rp.read()
            return rp
        except Exception as exc:  # noqa: BLE001 - reported, not swallowed
            print(f"  robots.txt unreadable ({exc}); proceeding politely", file=sys.stderr)
            return None

    def allowed(self, url: str) -> bool:
        return self.robots.can_fetch(self.session.headers["User-Agent"], url) if self.robots else True

    def load_manifest(self) -> None:
        path = self.out / "manifest.json"
        if not path.exists():
            return
        for row in json.loads(path.read_text()):
            self.pages[row["url"]] = PageRecord(**row)
        print(f"  resuming: {len(self.pages)} pages already in the manifest")

    def save(self) -> None:
        self.out.mkdir(parents=True, exist_ok=True)
        (self.out / "manifest.json").write_text(
            json.dumps([asdict(p) for p in self.pages.values()], indent=2)
        )
        (self.out / "inventory.json").write_text(
            json.dumps([asdict(l) for l in self.links], indent=2)
        )

    def run(self, refetch: bool) -> int:
        self.raw.mkdir(parents=True, exist_ok=True)
        queue: deque[tuple[str, int]] = deque([(self.start, 0)])
        seen: set[str] = set()
        fetched = 0
        changed: list[str] = []

        while queue and fetched < self.max_pages:
            url, depth = queue.popleft()
            url, _ = urldefrag(url)
            if url in seen:
                continue
            seen.add(url)

            existing = self.pages.get(url)
            cached = existing and existing.status == 200 and not refetch
            slug = slugify_url(url)

            if cached and (self.raw / f"{slug}.html").exists():
                html = (self.raw / f"{slug}.html").read_text(encoding="utf-8", errors="replace")
            else:
                if not self.allowed(url):
                    self.pages[url] = PageRecord(url, slug, error="disallowed by robots.txt", depth=depth)
                    continue

                record = PageRecord(url, slug, depth=depth)
                try:
                    res = self.session.get(url, timeout=15)
                    record.status = res.status_code
                    record.fetched_at = datetime.now(timezone.utc).isoformat()
                    if res.status_code != 200:
                        record.error = f"HTTP {res.status_code}"
                        self.pages[url] = record
                        time.sleep(self.delay)
                        continue
                    if "text/html" not in res.headers.get("Content-Type", ""):
                        record.error = "not HTML"
                        self.pages[url] = record
                        continue
                    html = res.text
                    digest = hashlib.sha256(html.encode("utf-8", "replace")).hexdigest()[:16]
                    if existing and existing.content_hash and existing.content_hash != digest:
                        changed.append(url)
                    record.content_hash = digest
                    (self.raw / f"{slug}.html").write_text(html, encoding="utf-8")
                    self.pages[url] = record
                    fetched += 1
                # Every failure is recorded rather than passed over. A bare
                # `except: pass` here means a page silently missing from the
                # migration, which nobody notices until a resident does.
                except requests.RequestException as exc:
                    record.error = f"{type(exc).__name__}: {exc}"
                    self.pages[url] = record
                    time.sleep(self.delay)
                    continue
                time.sleep(self.delay)

            soup = BeautifulSoup(html, "html.parser")
            for a in soup.find_all("a", href=True):
                link = classify(url, a["href"], self.base_domain)
                if link is None:
                    continue
                link.text = a.get_text(" ", strip=True) or "[no text]"
                link.anchor = urlparse(urljoin(url, a["href"])).fragment
                self.links.append(link)
                if link.kind == "page" and link.url not in seen:
                    queue.append((link.url, depth + 1))

        self.save()
        ok = sum(1 for p in self.pages.values() if p.status == 200)
        failed = [p for p in self.pages.values() if p.status != 200]
        print(f"\n  pages fetched OK : {ok}")
        print(f"  pages failed     : {len(failed)}")
        for p in failed[:10]:
            print(f"    {p.status or '---'}  {p.url}  ({p.error})")
        print(f"  links recorded   : {len(self.links)}")
        for kind in ("page", "asset", "external_asset", "external", "mail", "tel"):
            print(f"    {kind:9}: {sum(1 for l in self.links if l.kind == kind)}")
        if changed:
            print(f"\n  CHANGED since last run: {len(changed)}")
            for url in changed[:20]:
                print(f"    {url}")
        return 1 if failed else 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("start", help="URL to start from")
    ap.add_argument("--out", type=Path, default=Path("./migration"))
    ap.add_argument("--delay", type=float, default=1.0,
                    help="seconds between requests (default 1.0 — this is somebody's server)")
    ap.add_argument("--max-pages", type=int, default=500)
    ap.add_argument("--refetch", action="store_true", help="ignore cached HTML and fetch everything again")
    ap.add_argument("--ignore-robots", action="store_true")
    ap.add_argument("--user-agent", default="HopeMigrationBot/1.0 (+contact: admin@hopemaine.org)")
    args = ap.parse_args()

    crawler = Crawler(args.start, args.out, args.delay, args.max_pages,
                      args.user_agent, obey_robots=not args.ignore_robots)
    crawler.load_manifest()
    return crawler.run(refetch=args.refetch)


if __name__ == "__main__":
    raise SystemExit(main())
