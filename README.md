# Town of Hope, Maine — Website

A rebuild of the Town of Hope, Maine municipal website, built with Next.js
(App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/` — one route per page (`/`, `/government`, `/departments`,
  `/meetings`, `/news`, `/documents`, `/contact`).
- `src/components/` — shared UI: header/nav, footer, page hero, cards,
  buttons, alert banner, contact form.
- `src/data/` — all page content lives here as plain data objects, kept
  separate from the JSX/layout. **Every value in this folder is currently
  placeholder text** (names, phone numbers, hours, document links, etc.)
  and is marked `PLACEHOLDER —` so it's easy to find and replace.
- `src/lib/nav.ts` — site navigation and town contact info used in the
  header/footer.

## Replacing placeholder content

Search the repo for `PLACEHOLDER` to find every spot that needs real town
data:

```bash
grep -rn "PLACEHOLDER" src/
```

Most content edits only require updating `src/data/*.ts` and
`src/lib/nav.ts` — no JSX changes needed.

The contact form (`src/components/ContactForm.tsx`) is UI-only and does not
send email yet; it needs to be wired to an email service or backend before
launch. The map on the Contact page is a placeholder box pending a real
address to embed.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
