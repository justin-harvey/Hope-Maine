# Setting up a new town site

This is the start-to-finish path for standing up a town website from this
template: provision a few external services, run one setup command, optionally
migrate the old site, check it, and deploy. Plan on an afternoon.

Two kinds of work are deliberately separated. Creating accounts (database,
file storage, email, hosting) needs judgment and billing details, so it is a
checklist a technically-comfortable helper follows once. Everything inside the
repository — the town's name, contact details, first login, starter content —
is done for you by `npm run setup`. Day-to-day editing after launch needs none
of this; that is [EDITOR-GUIDE.md](./EDITOR-GUIDE.md).

No em dashes, plain language, in the order you actually do it.

---

## 0. Before you start

- **Node 22.** Check with `node --version`. If you use `nvm`, run `nvm use 22`.
- Install dependencies once: `npm install`.
- You can do steps 1 and 2 (run it locally, see it work) before creating any
  external accounts. The accounts in step 3 are only needed to go live.

## 1. Run it locally first

```bash
npm run setup     # answer the prompts (town name, contact, timezone, old-site URL)
npm run dev       # starts on http://localhost:3000, admin at /admin
```

`npm run setup` writes `src/town.config.ts` and `.env`, generates a
`PAYLOAD_SECRET`, and seeds the first administrator. It prints the admin email
and a note to change the password. Sign in at `/admin` and look around. At this
point you are on a local SQLite file with uploads written to disk, which is
fine for trying it out and wrong for a live site. Steps 3 onward fix that.

## 2. Add a photo and check the identity (optional, local)

- Drop a hero photo into `public/hero/` (any `.jpg/.png/.webp`). It appears on
  the home page on the next build. Update `hero.alt` in `src/town.config.ts`.
- Replace `public/brand/town-seal.png` with the town seal (square, ~192px).
- Re-read `src/town.config.ts` and fix anything the prompts left generic
  (office hours beyond one line, the tagline, the hero intro).

## 3. Provision the external services (needed to go live)

Do these in order. Each ends with the environment variables it produces; you
will paste all of them into Netlify in step 5, and into your local `.env` if
you want to test against them first.

### 3a. Database (Postgres) — required

A local SQLite file is lost every time the host rebuilds, so a deployed site
must use Postgres. Neon and Supabase both have a free tier that fits this site.

1. Create a project at [neon.tech](https://neon.tech) or
   [supabase.com](https://supabase.com).
2. Copy the connection string (Supabase: *Project Settings → Database → URI*).
3. Set it:

   ```
   DATABASE_URI=postgresql://user:password@host/dbname
   ```

The code switches to Postgres automatically whenever `DATABASE_URI` starts with
`postgres`. Leave it empty and it stays on local SQLite.

### 3b. File storage (S3-compatible) — required

Uploaded PDFs and images must live off the host's disk, or every deploy wipes
them. Supabase Storage, Cloudflare R2, Backblaze B2, and AWS S3 all work; only
the endpoint differs.

1. Create a bucket (Supabase: *Storage → New bucket*, then *Project Settings →
   Storage → S3 connection* for the endpoint and keys).
2. Set all five:

   ```
   S3_ENDPOINT=https://<project-ref>.storage.supabase.co/storage/v1/s3
   S3_REGION=us-east-1
   S3_BUCKET=<your-bucket>
   S3_ACCESS_KEY_ID=...
   S3_SECRET_ACCESS_KEY=...
   ```

### 3c. Email (password reset) — required

Without this, an editor who forgets their password cannot get back in; Payload
only logs the email to the server console. Use the town's existing mailbox, or
a transactional service (Resend, SendGrid, Mailgun) through its SMTP endpoint.

```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587            # 587 for STARTTLS, 465 for implicit TLS
SMTP_USER=...
SMTP_PASS=...
EMAIL_FROM=noreply@yourtown.gov
EMAIL_FROM_NAME=Town of Yourtown
```

## 4. Migrate the old site (optional)

If the town has an existing website, bring its documents and pages across. This
needs Python 3 and three packages:

```bash
pip3 install requests beautifulsoup4 html2text

python3 tools/migrate/crawl.py https://oldsite.example --out ./migration
python3 tools/migrate/extract.py --out ./migration
python3 tools/migrate/fetch_assets.py --out ./migration --include-external
```

Each phase stops on a non-zero exit so nothing is silently half-migrated.
Phases 1 to 3 only fetch and save; turning that into content is a judgment
step. See [tools/README.md](./tools/README.md) for the full method and the
modelling notes. Setting `legacySiteBaseUrl` in `src/town.config.ts` (the
setup wizard does this from your answer) keeps old document links working in
the meantime, with a visible "still on the old site" note that disappears as
files are re-uploaded.

## 5. Deploy to Netlify

1. Push the repository to GitHub and connect it as a new Netlify site. The
   build command and publish settings come from `netlify.toml`; leave them.
2. In *Site settings → Environment variables*, add everything from step 3 plus:

   ```
   PAYLOAD_SECRET=<the value npm run setup generated, or run: openssl rand -hex 32>
   NEXT_PUBLIC_SITE_URL=https://<your-netlify-or-custom-domain>
   ```

3. **Seed the production database once.** Against the Postgres `DATABASE_URI`,
   run `npm run seed` (locally, with that `DATABASE_URI` in your `.env`) so the
   first admin and any starter content exist. Seed before the first real build:
   the build reads the database to prerender `/news` and `/documents`.
4. Trigger a deploy. The build regenerates the admin import map automatically.
5. The contact form posts to Netlify Forms; keep `public/__forms.html` in step
   with the form fields (see the README's Netlify Forms note).

## 6. Check it

Against the running site:

```bash
npm run build     # must be green; note the page list
npm run audit     # 0 contrast failures, 0 dead links, no-JS journey PASS
```

Use a clean build (`rm -rf .next` first) when verifying, not an incremental
one, so a stale cached chunk cannot mask a problem.

## 7. DNS

Point the town's domain at Netlify (Netlify's *Domain management* gives the
exact records), set `NEXT_PUBLIC_SITE_URL` to the final domain, and redeploy so
absolute URLs are correct.

---

## Readiness at a glance

`npm run setup` prints this at the end, but to re-check: a site is launch-ready
when `DATABASE_URI` points at Postgres, all five `S3_*` are set, `SMTP_HOST`
(with user/pass) is set, `PAYLOAD_SECRET` is set, and `npm run audit` passes.
Until then it still runs — just on throwaway local storage with email going to
the console.

## Known gotchas (do not relearn these)

- **Clean build when verifying.** An incremental Turbopack build can serve a
  stale JS chunk that 404/500s; `rm -rf .next` before `npm run build`.
- **Seed before the first build.** Otherwise `/news` and `/documents` fall back
  to the empty starter data until the next build.
- **Regenerate the import map after adding a plugin.** `npm run build` does it;
  forgetting gives a blank admin panel that still returns HTTP 200.
- **Timezones come from `town.config.ts`.** Never hard-code an offset; it ships
  winter meetings an hour early.
