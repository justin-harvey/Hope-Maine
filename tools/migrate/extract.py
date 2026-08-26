#!/usr/bin/env python3
"""
Phase 2 — Extract.

Turns the saved HTML from `crawl.py` into Markdown. Runs entirely offline,
so extraction rules can be tuned and re-run as often as they need to be
without touching the source server again.

    python3 tools/migrate/extract.py --out ./migration

Outputs, under --out:
    pages/<slug>.md     one Markdown file per page, with a source header
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import html2text
from bs4 import BeautifulSoup

# Chrome that appears on every page. Removing it is what makes the diff
# between two pages mean something.
CHROME = "header, footer, nav, aside, script, style, noscript, form.search, .skip-link"

# Ordered most- to least-specific. The last resort is <body>, which is
# always right and never good.
CONTENT_SELECTORS = [
    ("main", {}),
    ("article", {}),
    ("div", {"id": re.compile(r"content|main", re.I)}),
    ("div", {"class": re.compile(r"content|main", re.I)}),
]


def make_converter() -> html2text.HTML2Text:
    h = html2text.HTML2Text()
    h.ignore_links = False   # links are the migration's most valuable output
    h.ignore_tables = False  # municipal sites keep fee schedules in tables
    h.ignore_images = False
    h.body_width = 0         # no hard wraps; keeps diffs and greps sane
    h.protect_links = True
    return h


def find_content(soup: BeautifulSoup):
    for name, attrs in CONTENT_SELECTORS:
        found = soup.find(name, attrs=attrs) if attrs else soup.find(name)
        if found:
            return found, f"{name}{attrs or ''}"
    return soup.body, "body (fallback)"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", type=Path, default=Path("./migration"))
    args = ap.parse_args()

    manifest = json.loads((args.out / "manifest.json").read_text())
    pages_dir = args.out / "pages"
    pages_dir.mkdir(parents=True, exist_ok=True)
    converter = make_converter()

    written, fallbacks, empty = 0, [], []

    for row in manifest:
        if row.get("status") != 200:
            continue
        raw_path = args.out / "raw" / f"{row['slug']}.html"
        if not raw_path.exists():
            continue

        soup = BeautifulSoup(raw_path.read_text(encoding="utf-8", errors="replace"), "html.parser")
        title = soup.title.string.strip() if soup.title and soup.title.string else row["slug"]

        for element in soup.select(CHROME):
            element.decompose()

        content, how = find_content(soup)
        markdown = converter.handle(str(content)) if content else ""

        # A page that extracted to almost nothing usually means the selectors
        # missed, not that the page was empty. Surfacing it beats shipping a
        # blank section and finding out later.
        if len(markdown.strip()) < 120:
            empty.append((row["url"], len(markdown.strip())))
        if how.startswith("body"):
            fallbacks.append(row["url"])

        (pages_dir / f"{row['slug']}.md").write_text(
            f"# {title}\n\n"
            f"**Source:** {row['url']}  \n"
            f"**Extracted from:** {how}\n\n---\n\n{markdown}",
            encoding="utf-8",
        )
        written += 1

    print(f"  pages written        : {written}")
    print(f"  fell back to <body>  : {len(fallbacks)}")
    for url in fallbacks[:10]:
        print(f"    {url}")
    print(f"  suspiciously empty   : {len(empty)}")
    for url, size in empty[:10]:
        print(f"    {size:>5} chars  {url}")
    # Empty extractions are a gate, not a note: they mean content was lost.
    return 1 if empty else 0


if __name__ == "__main__":
    raise SystemExit(main())
