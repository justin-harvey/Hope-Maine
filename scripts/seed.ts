/**
 * Seeds the CMS from the static content the site shipped with.
 *
 * Idempotent: it matches existing records by title, so running it twice does
 * not duplicate anything, and a post someone has since edited in the admin
 * is left alone rather than being overwritten by the original text.
 *
 *   npm run seed
 */
import "dotenv/config";

import configPromise from "../payload.config";
import { getPayload } from "payload";
import { newsPosts } from "../src/data/news";

const FIRST_ADMIN = {
  email: process.env.SEED_ADMIN_EMAIL ?? "admin@hopemaine.org",
  password: process.env.SEED_ADMIN_PASSWORD ?? "ChangeMeBeforeLaunch1!",
  name: "Town Administrator",
  role: "admin" as const,
};

/** "Sep 22, 2026" — the format the exported content uses. */
function parseDate(value: string): string {
  const parsed = new Date(`${value} UTC`);
  if (Number.isNaN(parsed.valueOf())) {
    throw new Error(`Could not parse the date "${value}"`);
  }
  return parsed.toISOString();
}

/** Plain paragraphs into the Lexical shape the editor round-trips. */
function toLexical(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "" as const,
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        textFormat: 0,
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            version: 1,
          },
        ],
      })),
    },
  };
}

async function seed() {
  const payload = await getPayload({ config: configPromise });

  // ── First account ───────────────────────────────────────────
  const existingUsers = await payload.count({ collection: "users" });
  if (existingUsers.totalDocs === 0) {
    await payload.create({ collection: "users", data: FIRST_ADMIN });
    console.log(`Created the first administrator: ${FIRST_ADMIN.email}`);
    console.log("Sign in at /admin and change this password immediately.");
  } else {
    console.log(`${existingUsers.totalDocs} account(s) already exist — skipping.`);
  }

  // ── News ────────────────────────────────────────────────────
  //
  // Attachments are NOT seeded. They are links to PDFs still hosted on
  // hopemaine.org, and the Documents collection stores uploaded files, not
  // URLs — creating a record with no file would be a lie about what the town
  // holds. The static list in src/data/news.ts keeps serving those links
  // until the files are uploaded, at which point they attach here properly.
  let created = 0;
  let skipped = 0;

  for (const post of newsPosts) {
    const existing = await payload.find({
      collection: "news",
      where: { title: { equals: post.title } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      skipped += 1;
      continue;
    }

    await payload.create({
      collection: "news",
      data: {
        title: post.title,
        publishedOn: parseDate(post.date),
        summary: post.summary,
        body: post.body?.length ? toLexical(post.body) : undefined,
        _status: "published",
      },
    });
    created += 1;
  }

  console.log(`News: ${created} created, ${skipped} already present.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
