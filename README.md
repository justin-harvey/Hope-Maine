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

**Where it lives**

- `src/app/styles/tokens.css` — palette, metrics, focus, contrast notes
- `src/app/styles/primitives.css` — reset, type scale, focus, measure
- `src/app/styles/patterns.css` — panel, notice, task list, data row, bands
- `src/components/ui/` — Button, Panel, Notice, Tag, Input, Field, Icon, LinkButton

Icons are a small inline-SVG set in `src/components/ui/icon.tsx` — add a
path there rather than pulling in an icon font.

### One answer, one page

Every "How Do I…?" answer has its own route, `/how-do-i/<slug>`, generated
from `src/data/faqs.ts` by `generateStaticParams`. `/how-do-i` is a plain
index of links to them.

Link to one with `faqHref(question)` from `src/lib/utils.ts` rather than
writing the path by hand, so a link can never point at a slug that drifted
from its question's wording.

**This shape was arrived at the hard way, and it is worth not undoing.**
The answers originally lived in a single accordion that task links pointed
into, with the right row opened on arrival — first by JavaScript reading
the hash, then, when that failed with scripts blocked, by a `?q=` parameter
read on the server. The second version worked. It was still the wrong
shape: arriving meant landing eighteen hundred pixels down a page of
twenty-five collapsed rows and working out which one had opened.

A page with one answer on it has no open state to get wrong, nothing to
scroll past, a heading that states the question, and a URL worth sharing.
It also made `/how-do-i` static again, since there is no longer a parameter
to read — the no-JS guarantee now costs nothing per request.

If a future change puts these answers back behind a disclosure control, it
will reintroduce a class of bug that took three attempts to leave behind.

### The online services carousel

`/`'s online services are a carousel, in the pattern of the Town of Warren
site — previous, next, and an explicit pause/play.

It is worth being honest that a carousel is a worse directory than a grid;
GOV.UK dropped theirs because people rarely reach past the first panel, and
this is the list of things residents actually came to do. What keeps that
from being a real loss is that **nothing is hidden**: the element underneath
is a native scroll container with CSS snap points, so all twelve services
stay in the page, in order, reachable by touch, trackpad, keyboard, and
screen reader whether or not the script runs. The buttons only automate what
the container already does, and they render after hydration so nobody is
shown a control with nothing behind it.

- **WCAG 2.2.2 (Pause, Stop, Hide).** Anything moving on its own for more
  than five seconds needs a pause control. Auto-advance also stops on hover,
  on focus anywhere inside, and when the tab is hidden.
- **`prefers-reduced-motion`** disables auto-advance and switches button
  scrolling from smooth to instant. It is read as a subscription, so
  changing the OS setting stops a running carousel immediately. An explicit
  press of play still wins — asking for less motion should not take the
  control away from someone who then wants it.
- **Real `<button>` elements.** The reference markup uses
  `<span role="button" tabindex="0">`, which needs hand-written Enter and
  Space handling to work at all; the hand-written version is usually missing
  one of them.
- The live region is `off` while rotating and `polite` once stopped.
- The list is the flex track. Laying the slides out with `display: contents`
  on the `<ul>` would be shorter and would cost the list its semantics in
  several screen readers.

### Online forms

`/report/road` is a multi-step service flow built on the GOV.UK form
pattern: one question per screen, an error summary that takes focus on a
failed submit, per-field errors wired with `aria-describedby` and
`aria-invalid`, a check-your-answers step with Change links, and a
confirmation with a reference number.

The primitives live in `src/components/forms/` and are reusable for the
other paper forms the town still hands out (complaints, committee
service, General Assistance).

**Submission depends on Netlify Forms.** The page carries a hidden static
form so Netlify's build-time parser can discover the fields; the React
component POSTs urlencoded data to `/`. Two things are required for this
to actually deliver:

1. Enable **Forms** for the site in the Netlify dashboard.
2. Add a notification address under **Forms → Form notifications**, or
   nobody at the Town Office will see submissions.

Until Forms is enabled the POST fails and the form says so plainly rather
than showing a false confirmation. The free tier allows 100 submissions a
month, which is ample for a town of 1,698.

### Accessibility audit

`npm run build`, then with the dev server running, the Playwright script in
the scratchpad checks every page for contrast failures, sub-44px touch
targets, and focus visibility. The current state is **0 AA failures and 0
under-AAA pairs**. Re-run it after any change to tokens or components.

## Editing the site (Payload CMS)

Town staff sign in at **`/admin`** with an email address and a password.
No GitHub account, and nothing to install.

That is the whole reason this runs [Payload](https://payloadcms.com)
(MIT-licensed, `payloadcms/payload`) rather than a Git-backed CMS like
Keystatic or Sveltia. Those are lighter to operate, but they commit as a
GitHub user — and "you need a GitHub account to post the agenda" is not a
workable instruction for a town office of five people.

### What is editable, and what is not

Deliberately, only the content that actually changes:

| Collection | What it holds | Changes |
| --- | --- | --- |
| **News and notices** | Hearings, warrants, announcements | Monthly |
| **Meetings** | Dated meetings, with agendas and minutes | Weekly |
| **Boards & committees** | Standing schedule, location, and note per board | Rarely |
| **Documents** | Ordinances, reports, forms, maps, agendas, minutes | Weekly |
| **Media** | Photographs | Rarely |
| **Users** | Staff accounts | Rarely |

Everything else — department contacts, the Select Board roster, the 25
"How Do I…?" answers, meeting schedules — stays in `src/data/`. Those change
once or twice a year, and a pull request is a better record of *who changed
the Code Enforcement Officer's hours and when* than a database row is.

### Roles

- **Editor** — writes content and uploads files. Nothing else.
- **Administrator** — the above, plus managing accounts.

An editor may open and update their own record, so they can change their own
name or password; the `role` field has its own field-level access control so
they cannot promote themselves while doing it (`src/payload/access.ts`).

### Meetings

Two collections, deliberately separate. **Boards & committees** is the
standing entity — how often it sits, where, and how to get on its agenda.
**Meetings** is the dated occurrence.

Four boards shipped with `PLACEHOLDER` schedules because the exports never
carried one; nobody outside the Town Office knows when the Board of Appeals
sits. They seed with the field empty, so `/meetings` says "Not published
yet" — which is true — and the first person to log in can fill it in.

A meeting's agenda and minutes are relationships to **Documents** rather
than uploads on the meeting itself, so every PDF the town publishes lands in
one library under one set of accessibility checks. The relationship field
can create and upload a document inline, so posting Friday's agenda is still
one pass through the admin.

**Cancelling.** Set the status; the meeting stays on the page struck through
and labelled rather than disappearing. Residents who already planned around
it need to be told, and a meeting that silently vanishes reads as a website
fault. The status is carried by a written word, never by colour alone.

**The nine agendas the site shipped with** are files on hopemaine.org, not
uploads. They seed as real meetings carrying the old URL in
`legacyAgendaUrl`, so the record exists now and the link keeps working;
attaching an uploaded agenda supersedes it, the same way an upload
supersedes a legacy link on `/documents`.

**`/meetings` is the one page that revalidates on a timer** (hourly). It
splits meetings on "now", so unlike the rest of the site it goes stale on
its own — a meeting prerendered as upcoming would stay upcoming until
somebody happened to edit something. The `afterChange` hooks still rebuild
it immediately on an edit; the timer only covers the passage of time.

**Times are stored as instants and rendered in `America/New_York`.** Seeding
them with a hard-coded `-0400` was wrong and shipped once: Maine is UTC-4 in
August and UTC-5 in January, so every winter meeting published an hour
early — the Planning Board's 6:30 PM January agenda read 5:30 PM. See
`zonedTime()` in `scripts/seed.ts`.

### File storage

Uploads go to `public/uploads` until the S3 variables are set — fine
locally, fatal on a deployed site, because that filesystem is rebuilt on
every deploy. `src/payload/storage.ts` switches on the environment alone
and warns loudly in a production build when it is not configured.

Supabase Storage speaks S3, so the same adapter covers it, Cloudflare R2,
and AWS. Take the values from **Project Settings → Storage → S3
connection**, create the bucket first under **Storage**, and set
`S3_ENDPOINT`, `S3_REGION`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, and
`S3_SECRET_ACCESS_KEY`. `forcePathStyle` is on because Supabase addresses
buckets by path.

Verify the wiring without a reachable bucket:

```bash
npm run check:storage                       # local disk
S3_BUCKET=… S3_ENDPOINT=… npm run check:storage   # S3
```

The field lists it prints must be identical in both modes. That is not
free: `alwaysInsertFields` does not deliver it on its own in
plugin-cloud-storage 3.88.0, whose *enabled* branch calls `getFields`
without the flag — so the option only takes effect while the plugin is
off, the exact inverse of its purpose. Each collection therefore sets an
explicit `prefix`, which satisfies the other half of that condition and
namespaces objects in the bucket as well.

**Documents redirect rather than stream.** `/api/documents/file/<name>`
stays the public URL, so links survive a change of storage provider and the
front end never labels the town's own ordinance "Opens on another website" —
but the route 302s to a signed URL and the bytes come straight from
Supabase. Some tax maps are tens of megabytes, and streaming those through
a serverless function finds the timeout and the egress bill together.
Images keep the stable streamed path, since they want long-lived cacheable
URLs.

**Adding any plugin means regenerating the admin import map.** Forgetting
produces a blank admin panel that still returns HTTP 200 with no
client-side error, which is a genuinely hard thing to diagnose from the
symptom. `npm run build` now does it, so it cannot drift.

### Accessibility guardrails

A rich-text editor is a machine for undoing accessibility work, and the site
currently passes at **0 AA failures and 0 pairs below AAA**. With ADA Title
II putting Hope under WCAG 2.1 AA by **26 April 2027**, the guardrails are
enforced by the schema rather than by a style guide nobody reads:

- **Alt text is required** on every image (`Media.alt`). Not encouraged —
  required, at the schema level.
- **The editor offers only** paragraphs, h2/h3, bold, italic, lists, and
  links. No colour, no font size, no raw HTML paste. Heading levels stop at
  h2 because the post title is the page's h1.
- **Every PDF upload must declare its text quality.** A scanned PDF is a
  picture of a document and a screen reader finds nothing in it. "Not checked
  yet" is an option so nobody has to guess.

Adding a feature to the Lexical editor in `src/payload/collections/News.ts`
means adding a matching rule to `.rich-text` in `patterns.css` — otherwise it
renders unstyled on the public page.

### How the site stays static

Reading content from a database would normally make every page render per
request. It does not here: pages are prerendered at build time, and each
collection's `afterChange` hook calls `revalidatePath` for the pages that
display it, so pressing **Publish** rebuilds exactly those pages.

`npm run build` confirms this — `/`, `/news`, and `/documents` are marked
`○ (Static)` despite reading Payload.

The path list in each collection's hook is the part that goes wrong silently:
if a page reads a collection and is missing from that list, the edit saves,
the admin reports success, and the public page keeps serving the previous
build. Add the path when you add the read.

### Migrating the PDFs incrementally

All 155 document links still point at the files on hopemaine.org via
`LEGACY_DOC_BASE`. Uploading a document to the CMS under the same title
**supersedes** the legacy link rather than appearing beside it
(`src/lib/town-documents.ts`), and the notice at the top of `/documents`
counts down how many are left.

So the migration is one ordinance at a time, and the page is correct at every
point in between — rather than a flag day where all 114 files are copied,
`LEGACY_DOC_BASE` is flipped, and everyone hopes nothing was missed.

### Running it locally

```bash
npm install
npm run seed     # first admin account + the 12 existing news posts
npm run dev      # site at /, admin at /admin
```

The seed is idempotent — it matches on title, so running it twice creates
nothing new and never overwrites a post someone has since edited. It prints
the first account's credentials; change that password immediately.

**Seed before you build.** The build reads the database to prerender
`/news` and `/documents`; against an empty database those pages fall back to
the static content in `src/data/` and stay that way until the next build.

After changing a collection, regenerate the types the front end reads:

```bash
npm run generate:types
```

### Before this goes live

Four things are required, and the site is not launchable without them:

1. **Postgres.** Local development uses a SQLite file. Netlify and Vercel
   rebuild the filesystem on every deploy, so a SQLite file on those hosts
   would quietly discard everything the town had written. Set `DATABASE_URI`
   to a Postgres connection string — Neon and Supabase both have free tiers
   that fit this site — and `src/payload/db.ts` switches adapter on the URI
   alone.
2. **File storage.** Set the five `S3_*` variables — see *File storage*
   above. **Until this is done, an uploaded PDF disappears on the next
   deploy.**
3. **An email adapter.** Payload logs a warning at startup because there
   isn't one. Without it, "I forgot my password" has no answer but an
   administrator resetting it by hand — install `@payloadcms/email-nodemailer`
   or `@payloadcms/email-resend`.
4. **`PAYLOAD_SECRET`.** Generate a fresh one per environment
   (`openssl rand -hex 32`). It signs the login cookies; the committed
   development default must not reach production.

See `.env.example` for the full list.

## Project structure

- `src/app/(frontend)/` — one route per public page (`/`, `/government`,
  `/departments`, `/meetings`, `/news`, `/documents`, `/contact`). This is a
  route group with its own root layout; the town-facing site had to move
  into it so the CMS admin could have a second root layout of its own.
- `src/app/(payload)/` — the CMS admin at `/admin` and its REST/GraphQL
  routes. Mostly generated; `layout.tsx` and `custom.scss` are hand-edited.
- `src/payload/` — collections, access rules, and hooks. `payload-types.ts`
  is generated by `npm run generate:types`, so do not edit it.
- `src/components/` — site header/footer, page hero, section wrapper, contact form.
- `src/components/ui/` — design system primitives (see above).
- `src/data/` — the page content that is *not* CMS-managed, as plain data
  objects kept separate from layout/JSX. Also the fallback the front end
  serves when the database is unreachable.
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

- **Document hosting.** All 155 document links resolve, but they point at
  the files on hopemaine.org via `LEGACY_DOC_BASE` in
  `src/lib/documents.ts`. Staff can now replace them one at a time by
  uploading to the CMS — see *Migrating the PDFs incrementally* above — but
  that needs object storage configured first. These URLs were derived from
  the page exports and could not be verified from the build environment,
  which has no outbound access to hopemaine.org — spot-check before launch.
- **Four committees.** Board of Appeals, Budget, School, and Cemetery
  Committee have no roster yet. Their meeting schedules are now editable at
  `/admin` under Boards & committees — the town can publish them without a
  code change.
- **Some department contacts.** Animal Control and the Sheriff's
  Department still have no phone/email/hours. The nine
  `town_services/*` detail pages and `town_office/index.php` have not
  been exported — that is where the rest of those values live.
- **Hero photograph.** A stock photo is in place and credited on the page
  as not being a picture of Hope. Replacing it with a real photograph of
  the town is a drop-in: put the file in `public/hero/` (see the README
  there) and update `HERO_ALT` in `src/components/HomeHero.tsx`.
- **Not yet migrated:** Hope History, Town Office Location, and the
  events calendar (a Revize widget).

The contact form (`src/components/ContactForm.tsx`) is UI-only and does not
send email yet; it needs to be wired to an email service or backend before
launch. The map on the Contact page is a placeholder box pending a real
address to embed.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run seed` — create the first admin account and import the news posts,
  boards, and known meetings
- `npm run generate:types` — regenerate `src/payload/payload-types.ts`
- `npm run generate:importmap` — regenerate the admin's component import map
  (`npm run build` already does this)
- `npm run check:storage` — show whether uploads go to disk or S3, and
  confirm the schema matches in both
