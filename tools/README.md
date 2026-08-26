# Migration toolkit

How the content on this site was taken off the old one, in a form that can be
re-run. Each phase is a command with a gate: a non-zero exit means stop and
look, not carry on.

```bash
pip3 install requests beautifulsoup4 html2text
```

## The phases

| # | Command | Produces | Gate |
|---|---|---|---|
| 1 | `python3 tools/migrate/crawl.py <url> --out ./migration` | `raw/*.html`, `manifest.json`, `inventory.json` | any page failed to fetch |
| 2 | `python3 tools/migrate/extract.py --out ./migration` | `pages/*.md` | any page extracted to near-nothing |
| 3 | `python3 tools/migrate/fetch_assets.py --out ./migration --include-external` | `assets/**`, `assets.json` | any document failed or came back the wrong type |
| 4 | *(judgement)* | `src/data/*.ts` | see **Modelling** below |
| 5 | `npm run build && npm run audit` | — | contrast, dead links, no-JS |

Phases 1–3 are idempotent. Re-running fetches only what is missing or failed,
and phase 1 reports which pages have **changed** since the last run — which is
the useful thing to run on a schedule while the old site is still live.

## Why fetch and extract are separate

The scripts this grew out of did both in one pass. That means every change to
an extraction rule costs another full crawl of somebody else's server, and
you cannot tune selectors without being a nuisance. Here the HTML is saved
once and `extract.py` runs against it offline, as many times as needed.

## What the crawler gets right that a naive one does not

- **Politeness.** Reads `robots.txt`, sends a real User-Agent with contact
  details, and sleeps between requests. Default delay is 1s. This is a town's
  server, usually shared hosting.
- **Failures are recorded, never swallowed.** A bare `except: pass` in a
  crawler means a page silently missing from the migration, which nobody
  notices until a resident does. Every failure lands in `manifest.json` with
  its cause, so the next run retries exactly those.
- **`urljoin`, not string concatenation.** Page-relative and root-relative
  links resolve differently — `about/index.php` linking to `about/contact.php`
  means `/about/contact.php`, not `/about/about/contact.php`. Getting this
  backwards produces a whole tree of plausible-looking 404s. This bit the
  original migration: the page exports had dropped leading slashes, and the
  paths had to be *proved* root-relative before 155 document links could be
  trusted.
- **Off-domain documents still count as documents.** Municipal sites routinely
  keep PDFs on a separate document host. Classifying those as merely
  "external" is how a migration leaves the entire ordinance library behind.
  They are `external_asset`, and `--include-external` fetches them.
- **Filenames mirror the remote path.** `Agendas/2026/minutes.pdf` and
  `Minutes/2026/minutes.pdf` both basename to `minutes.pdf`; flattening loses
  one, and which one depends on iteration order.
- **Downloads are content-type checked.** A CMS answering a bad document URL
  with a 200 and an HTML error page is common. Saved as `.pdf`, that is a
  library of files that all open to nothing. Mismatches are saved as
  `.suspect` and reported.

## Modelling (phase 4) — where the real risk is

Scraping is maybe a fifth of the work. Turning Markdown into typed content is
the rest, and it is where a language model will quietly do damage, because
filling a gap with something plausible is easier than reporting it.

Two things were invented during this migration and caught later: a
"Conservation Commission" that does not exist, and a "Proposed Equipment List"
attachment that was not in any export. Both read perfectly.

Rules that prevent it:

- **Every field traces to a source file.** If it is not in `pages/*.md` or a
  screenshot, it does not go in.
- **Absent is a value.** Model unknown fields as `null` and render "Not
  published yet". Never a placeholder that reads like fact, and never a
  guess. Four committee schedules on this site are empty for exactly this
  reason — nobody outside the Town Office knows them.
- **Names, dates, fees, and phone numbers are copied, never normalised.**
  Reproduce a path verbatim even when it looks wrong: one Select Board agenda
  here genuinely lives under a "School Committee" folder.
- **Grep the exports for what you think you finished.** The department contact
  details on this site were sitting in already-loaded content for a full pass
  before anyone noticed they had not been carried across.

## Verification (phase 5)

`npm run audit` runs three gates against a running site. Point it elsewhere
with `AUDIT_BASE_URL`, and at a preinstalled browser with
`PLAYWRIGHT_CHROMIUM_PATH`.

- `audit:a11y` — every text/background pair, touch target sizes, focus
  visibility, console errors. Gate: **0 AA failures**.
- `audit:links` — dead `href="#"`, broken internal links, missing anchor
  targets, and an external host inventory. Gate: **0 dead, 0 broken**.
- `audit:nojs` — follows a task link from the home page with scripts blocked
  and checks the answer is the first thing readable. Gate: **PASS both with
  and without JavaScript**.

The a11y gate is not decorative. It caught a contrast failure at 1.62:1 —
navigation links that looked fine to me in a screenshot, because an unlayered
CSS reset was outranking Tailwind's colour utilities. Nothing but a
measurement finds that.

## Running it as a loop

```bash
python3 tools/migrate/crawl.py https://old-site.gov --out ./migration || exit 1
python3 tools/migrate/extract.py --out ./migration || exit 1
python3 tools/migrate/fetch_assets.py --out ./migration --include-external || exit 1
# phase 4 is not automatable; it is the part that needs judgement
npm run build && npm run audit || exit 1
```

On a schedule against a still-live source, phase 1's **CHANGED** list is the
output that matters: it tells you what the old site published while you were
rebuilding it.
