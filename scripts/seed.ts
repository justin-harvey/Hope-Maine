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
import { meetingSchedules } from "../src/data/meetings";
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


/**
 * Boards, in the order they appear on /meetings.
 *
 * The four with no schedule are not an oversight: the exports never carried
 * one, and nobody outside the Town Office knows when the Board of Appeals
 * sits. They seed with the field empty so the page says "Not published yet"
 * — which is true — and the first person to log in can fill it in.
 */
const BOARD_ORDER: Record<string, number> = {
  "Select Board": 10,
  "Planning Board": 20,
  "Board of Appeals": 30,
  "Budget Committee": 40,
  "School Committee": 50,
  "Cemetery Committee": 60,
};

const TOWN_TZ = "America/New_York";

/** How far the given instant's local time in `tz` sits from UTC, in ms. */
function tzOffsetMs(instant: Date, tz: string): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(instant)
      .map((part) => [part.type, part.value]),
  );

  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second),
  );
  return asUtc - instant.getTime();
}

/**
 * A wall-clock time in the town's timezone, as a UTC instant.
 *
 * Hard-coding an offset here is the obvious shortcut and it is wrong: Maine
 * is UTC-4 in August and UTC-5 in January, so a fixed -0400 silently moved
 * every winter meeting an hour earlier — the Planning Board's 6:30 PM
 * January agenda published as 5:30 PM.
 *
 * Two passes, because the offset depends on the instant we are still
 * deriving: the first gets us close enough to read the right offset, the
 * second applies it.
 */
function zonedTime(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  const naive = Date.UTC(year, month - 1, day, hour, minute);
  const firstPass = naive - tzOffsetMs(new Date(naive), TOWN_TZ);
  return new Date(naive - tzOffsetMs(new Date(firstPass), TOWN_TZ));
}

/** "Select Board Agenda — Aug 25, 2026" -> that date at the board's usual hour. */
function agendaDate(label: string, hour: number, minute: number): string | null {
  const datePart = label.split("\u2014")[1]?.trim();
  if (!datePart) return null;

  // Parsed as a bare calendar date first, so the day is read without any
  // timezone assumption, then placed at the meeting's hour in the town's.
  const calendar = new Date(`${datePart} 12:00:00Z`);
  if (Number.isNaN(calendar.valueOf())) return null;

  return zonedTime(
    calendar.getUTCFullYear(),
    calendar.getUTCMonth() + 1,
    calendar.getUTCDate(),
    hour,
    minute,
  ).toISOString();
}

async function seedMeetings(payload: Awaited<ReturnType<typeof getPayload>>) {
  const boardIds = new Map<string, number>();

  for (const board of meetingSchedules) {
    const known = (value: string) => (value.startsWith("PLACEHOLDER") ? undefined : value);

    const existing = await payload.find({
      collection: "boards",
      where: { name: { equals: board.board } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      boardIds.set(board.board, existing.docs[0].id);
      continue;
    }

    const created = await payload.create({
      collection: "boards",
      data: {
        name: board.board,
        schedule: known(board.schedule),
        location: known(board.location),
        note: board.note || undefined,
        order: BOARD_ORDER[board.board] ?? 100,
      },
    });
    boardIds.set(board.board, created.id);
  }
  console.log(`Boards: ${boardIds.size} present.`);

  // The nine agendas the site shipped with are files on hopemaine.org, not
  // uploads. They seed as real meetings carrying the old URL, so the record
  // exists now and the link keeps working; attaching an uploaded agenda in
  // the admin supersedes it.
  let created = 0;
  let skipped = 0;

  for (const board of meetingSchedules) {
    const boardId = boardIds.get(board.board);
    if (!boardId) continue;

    // Select Board sits at 5:30 PM, Planning Board at 6:30 PM.
    const [hour, minute] = board.board === "Planning Board" ? [18, 30] : [17, 30];

    for (const agenda of board.recentAgendas) {
      const startsAt = agendaDate(agenda.label, hour, minute);
      if (!startsAt) {
        console.warn(`  skipped, no date in label: ${agenda.label}`);
        continue;
      }

      const existing = await payload.find({
        collection: "meetings",
        where: { and: [{ board: { equals: boardId } }, { startsAt: { equals: startsAt } }] },
        limit: 1,
      });
      if (existing.docs.length > 0) {
        skipped += 1;
        continue;
      }

      await payload.create({
        collection: "meetings",
        data: {
          board: boardId,
          startsAt,
          status: "scheduled",
          legacyAgendaUrl: agenda.href,
        },
      });
      created += 1;
    }
  }

  console.log(`Meetings: ${created} created, ${skipped} already present.`);
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

  await seedMeetings(payload);

  /**
   * Close the database and let the process end on its own.
   *
   * `process.exit()` here was a real bug, and a quiet one: it truncates
   * pending writes to a pipe, so running `npm run seed | tail` lost the
   * output *and* cut the run short — leaving a zero-byte database that only
   * failed later, when the admin panel could not find its own users table.
   * Anything that ends the process before its I/O has drained will do this.
   */
  await payload.destroy();
}

seed().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
