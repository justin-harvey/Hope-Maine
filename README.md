# Town of Hope, Maine — Website

A rebuild of the Town of Hope, Maine municipal website, built with Next.js
(App Router), TypeScript, and Tailwind CSS.

## Design system

The visual design (color tokens, typography, and UI primitives — Button,
SurfaceCard, Badge, Input, Alert, Icon) is ported from the
[G00DTECH/Civic-Chain](https://github.com/G00DTECH/civic-chain) design
system: a warm civic palette (cream/blue/gold/green/slate) with DM Serif
Text headings and DM Sans body text. See:

- `src/app/styles/tokens.css` — color ramps and structural tokens
- `src/app/styles/primitives.css` — semantic typography utilities (`.body`, `.captions`, `.h1`–`.h4`, etc.)
- `src/app/styles/patterns.css` — control-tone contract and button surface treatments
- `src/components/ui/` — Card, SurfaceCard, Button, Badge, Input, Alert, Field, Icon, LinkButton

The icon set is a small hand-drawn SVG substitute for CivicChain's Material
Symbols font (that font is a 5MB variable glyph set — too heavy for the
dozen icons a small town site needs). Add new icons in
`src/components/ui/icon.tsx`.

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

- **Real, from a hopemaine.org screenshot**: Town Office staff names/titles/
  emails (`src/data/government.ts`), the Town Services department list and
  the Online Services list (`src/data/departments.ts`,
  `src/data/online-services.ts`).
- **Real, from public search listings (worth confirming against the live
  site)**: town address, phone, and general email (`src/lib/nav.ts`).
- **Still placeholder**: Select Board roster, boards & committees, meeting
  schedule, news posts, document links, office hours, and most department
  phone numbers/hours — hopemaine.org pages for these weren't captured yet.

The contact form (`src/components/ContactForm.tsx`) is UI-only and does not
send email yet; it needs to be wired to an email service or backend before
launch. The map on the Contact page is a placeholder box pending a real
address to embed.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
