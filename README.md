# Town of Hope, Maine — Website

A rebuild of the Town of Hope, Maine municipal website, built with Next.js
(App Router), TypeScript, and Tailwind CSS.

## Design system

The site follows **Radical Functionalism**, the modern government design
idiom established by [GOV.UK](https://design-system.service.gov.uk/), the
[U.S. Web Design System](https://designsystem.digital.gov/), and France's
Système de Design de l'État. It trades visual flair for clarity,
accessibility, and institutional trust.

**Principles enforced in code**

- **Task-first routing.** The home page opens with "What do you need to do?"
  — a ruled list of real services — not a marketing hero.
- **Stark geometry.** Zero border radius, 1–2px solid rules, and no
  shadows, gradients, or translucency anywhere. Structure is *drawn*.
- **One typeface.** Public Sans at an 18px base with 1.5+ leading and a
  66-character measure on prose.
- **Contrast to AAA.** Every text/background pair on the site is verified
  at ≥7:1 (≥4.5:1 for large text). Token comments record the ratios.
- **Never color alone.** Status is carried by a thick left bar, an icon,
  *and* a written label. Links are underlined in body copy.
- **44px targets.** Every interactive element clears a 44×44px hit area.
- **Unmissable focus.** The GOV.UK ring: high-vis yellow block with a solid
  black underline, visible on light and dark surfaces alike.
- **Verification chrome.** A top-anchored banner certifies the official
  domain, mitigating phishing.

**Where it lives**

- `src/app/styles/tokens.css` — palette, metrics, focus, contrast notes
- `src/app/styles/primitives.css` — reset, type scale, focus, measure
- `src/app/styles/patterns.css` — panel, notice, task list, data row, bands
- `src/components/ui/` — Button, Panel, Notice, Tag, Input, Field, Icon, LinkButton

Icons are a small inline-SVG set in `src/components/ui/icon.tsx` — add a
path there rather than pulling in an icon font.

### Accessibility audit

`npm run build`, then with the dev server running, the Playwright script in
the scratchpad checks every page for contrast failures, sub-44px touch
targets, and focus visibility. The current state is **0 AA failures and 0
under-AAA pairs**. Re-run it after any change to tokens or components.

## Project structure

- `src/app/` — one route per page (`/`, `/government`, `/departments`,
  `/meetings`, `/news`, `/documents`, `/contact`).
- `src/components/` — site header/footer, page hero, section wrapper, contact form.
- `src/components/ui/` — design system primitives (see above).
- `src/data/` — all page content lives here as plain data objects, kept
  separate from layout/JSX.
- `src/lib/nav.ts` — site navigation and town contact info used in the
  header/footer.

## Content status

Search the repo for `PLACEHOLDER` to find content that still needs real
town data:

```bash
grep -rn "PLACEHOLDER" src/
```

What's real vs. placeholder, as of the last content pass:

**Real** (from hopemaine.org screenshots, a full site crawl, and page
content exports):

- Select Board roster with emails and term dates, and Planning Board roster
- Town Office staff, the Code Enforcement Officer, and all contact emails
- Town address, phone, fax, and office hours
- Select Board and Planning Board meeting schedules
- All 25 "How Do I…?" answers, with real fees and deadlines
- All 12 news posts with dates, body text, and attachment lists
- Town profile statistics, school districts, department list
- Online service links, which point at the real State of Maine systems
- Document *names* for town reports, ordinances, policies, audits, and maps

**Still placeholder:**

- **Document links.** Every PDF href is `#`. The exports give relative
  Revize paths, not resolvable URLs — these need real links or the files.
- **Four committees.** Board of Appeals, Budget, School, and Cemetery
  Committee have no roster or meeting schedule yet.
- **Not yet migrated:** Hope History, Town Office Location, the events
  calendar (a Revize widget), and per-department contacts for most Town
  Services pages.

The contact form (`src/components/ContactForm.tsx`) is UI-only and does not
send email yet; it needs to be wired to an email service or backend before
launch. The map on the Contact page is a placeholder box pending a real
address to embed.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
