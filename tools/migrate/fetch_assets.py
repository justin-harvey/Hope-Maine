#!/usr/bin/env python3
"""
Phase 3 — Assets.

Downloads every document the crawl found, from `inventory.json`.

    python3 tools/migrate/fetch_assets.py --out ./migration

Outputs, under --out:
    assets/<mirrored remote path>   the files
    assets.json                     per-asset status, size, content type
"""
from __future__ import annotations

import argparse
import json
import time
from pathlib import Path
from urllib.parse import unquote, urlparse

import requests

# What the server must actually send back. A municipal CMS answering a bad
# document URL with a 200 and an HTML "not found" page is common, and saving
# that as a .pdf produces a library of files that all open to nothing.
EXPECTED = {
    ".pdf": ("application/pdf", "application/octet-stream"),
    ".doc": ("application/msword", "application/octet-stream"),
    ".docx": ("application/vnd.openxmlformats-officedocument", "application/octet-stream"),
    ".xls": ("application/vnd.ms-excel", "application/octet-stream"),
    ".xlsx": ("application/vnd.openxmlformats-officedocument", "application/octet-stream"),
}


def local_path(root: Path, url: str) -> Path:
    """Mirror the remote directory structure rather than flattening.

    Flattening to the basename collides: Agendas/2026/minutes.pdf and
    Minutes/2026/minutes.pdf become one file, and which one survives depends
    on iteration order.
    """
    parsed = urlparse(url)
    relative = unquote(parsed.path).lstrip("/")
    safe = Path(*[part.replace("..", "_") for part in Path(relative).parts])
    return root / safe


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", type=Path, default=Path("./migration"))
    ap.add_argument("--delay", type=float, default=0.5)
    ap.add_argument("--user-agent", default="HopeMigrationBot/1.0")
    ap.add_argument("--limit", type=int, default=0,
                    help="stop after N downloads; use for a dry run before "
                         "committing to a few hundred requests")
    ap.add_argument("--include-external", action="store_true",
                    help="also download documents hosted on other domains "
                         "(document servers, CDN subdomains)")
    args = ap.parse_args()

    inventory = json.loads((args.out / "inventory.json").read_text())
    assets_root = args.out / "assets"
    state_path = args.out / "assets.json"
    state = json.loads(state_path.read_text()) if state_path.exists() else {}

    wanted = {"asset", "external_asset"} if args.include_external else {"asset"}
    urls = sorted({row["url"] for row in inventory if row["kind"] in wanted})
    session = requests.Session()
    session.headers["User-Agent"] = args.user_agent

    downloaded = skipped = attempted = 0
    suspect: list[tuple[str, str]] = []

    for url in urls:
        # Counts attempts, not successes. Counting successes means a run
        # where everything fails ignores the limit entirely and hammers the
        # server for the full list.
        if args.limit and attempted >= args.limit:
            break
        target = local_path(assets_root, url)
        if state.get(url, {}).get("ok") and target.exists():
            skipped += 1
            continue

        attempted += 1
        try:
            res = session.get(url, timeout=30)
        except requests.RequestException as exc:
            state[url] = {"ok": False, "error": f"{type(exc).__name__}: {exc}"}
            time.sleep(args.delay)
            continue

        content_type = res.headers.get("Content-Type", "").split(";")[0].strip().lower()
        suffix = Path(urlparse(url).path).suffix.lower()
        expected = EXPECTED.get(suffix)

        if res.status_code != 200:
            state[url] = {"ok": False, "error": f"HTTP {res.status_code}"}
        elif expected and not any(content_type.startswith(e) for e in expected):
            # Saved anyway, under .suspect, so it can be inspected rather
            # than silently trusted or silently lost.
            state[url] = {"ok": False, "error": f"content-type {content_type!r} for {suffix}"}
            suspect.append((url, content_type))
            target = target.with_suffix(target.suffix + ".suspect")
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(res.content)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(res.content)
            state[url] = {"ok": True, "bytes": len(res.content), "content_type": content_type}
            downloaded += 1

        time.sleep(args.delay)

    state_path.write_text(json.dumps(state, indent=2))
    failed = [(u, s.get("error")) for u, s in state.items() if not s.get("ok")]

    # "This run" and "outstanding" are reported separately on purpose. The
    # state file persists across runs, so a single number conflates work just
    # done with work still owed — and a loop reading one number cannot tell
    # whether it is making progress.
    print(f"  assets known         : {len(urls)}")
    print(f"  attempted this run   : {attempted}")
    print(f"  downloaded this run  : {downloaded}")
    print(f"  already present      : {skipped}")
    print(f"  outstanding failures : {len(failed)}")
    for url, err in failed[:15]:
        print(f"    {err}  {url}")
    if suspect:
        print(f"\n  WRONG CONTENT TYPE: {len(suspect)} — saved as .suspect, inspect before trusting")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
