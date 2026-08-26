import { meetingSchedules } from "@/data/meetings";
import { siteRelative } from "@/lib/documents";
import { getPayloadClient } from "@/lib/payload";
import type { Board, Document as PayloadDocument, Meeting } from "@/payload/payload-types";

export type MeetingStatus = "scheduled" | "cancelled" | "rescheduled";

export type MeetingItem = {
  key: string;
  boardName: string;
  /** "Tue 25 Aug 2026, 5:30 PM" */
  when: string;
  /** ISO, for <time datetime>. */
  isoDate: string;
  status: MeetingStatus;
  location: string | null;
  note: string | null;
  agenda: { label: string; href: string } | null;
  minutes: { label: string; href: string } | null;
};

export type BoardItem = {
  key: string;
  name: string;
  schedule: string | null;
  location: string | null;
  note: string | null;
  /** Past meetings for this board that have an agenda or minutes attached. */
  records: MeetingItem[];
};

// The town is in one timezone and the meetings are physical, so times are
// formatted in it explicitly. Without this the server's UTC clock would
// print a 5:30 PM meeting as 9:30 PM.
const TOWN_TZ = "America/New_York";

const whenFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: TOWN_TZ,
});

function related(value: unknown): PayloadDocument | null {
  // With depth >= 1 a relationship arrives as the full document; a bare id
  // means the related file was deleted, and linking to it would 404.
  return typeof value === "object" && value !== null && "url" in value
    ? (value as PayloadDocument)
    : null;
}

function docLink(value: unknown, fallbackLabel: string) {
  const doc = related(value);
  if (!doc?.url) return null;
  return { label: doc.title || fallbackLabel, href: siteRelative(doc.url) };
}

function toItem(meeting: Meeting): MeetingItem {
  const board = typeof meeting.board === "object" ? (meeting.board as Board) : null;
  const boardName = board?.name ?? "Meeting";

  const agenda =
    docLink(meeting.agenda, `${boardName} agenda`) ??
    // Not yet re-hosted: the agenda is still a file on the old site.
    (meeting.legacyAgendaUrl
      ? { label: `${boardName} agenda`, href: meeting.legacyAgendaUrl }
      : null);

  return {
    key: String(meeting.id),
    boardName,
    when: whenFormat.format(new Date(meeting.startsAt)),
    isoDate: meeting.startsAt,
    status: meeting.status,
    location: meeting.locationOverride || board?.location || null,
    note: meeting.note ?? null,
    agenda,
    minutes: docLink(meeting.minutes, `${boardName} minutes`),
  };
}

/** The content the site shipped with, for when the CMS has nothing to say. */
function staticBoards(): BoardItem[] {
  return meetingSchedules.map((board) => ({
    key: board.board,
    name: board.board,
    schedule: board.schedule.startsWith("PLACEHOLDER") ? null : board.schedule,
    location: board.location.startsWith("PLACEHOLDER") ? null : board.location,
    note: board.note || null,
    records: board.recentAgendas.map((agenda) => ({
      key: agenda.href,
      boardName: board.board,
      when: agenda.label.split("—")[1]?.trim() ?? agenda.label,
      isoDate: "",
      status: "scheduled" as const,
      location: null,
      note: null,
      agenda: { label: "Agenda", href: agenda.href },
      minutes: null,
    })),
  }));
}

export type MeetingsView = { upcoming: MeetingItem[]; boards: BoardItem[] };

/**
 * Everything the Meetings page shows.
 *
 * `now` is passed in rather than read here so the caller controls the
 * upcoming/past cut, and so the boundary is testable.
 */
export async function getMeetingsView(now: Date = new Date()): Promise<MeetingsView> {
  try {
    const payload = await getPayloadClient();

    const [boardsResult, meetingsResult] = await Promise.all([
      payload.find({ collection: "boards", limit: 100, sort: "order", depth: 0 }),
      payload.find({ collection: "meetings", limit: 500, sort: "-startsAt", depth: 1 }),
    ]);

    if (boardsResult.docs.length === 0) return { upcoming: [], boards: staticBoards() };

    const items = meetingsResult.docs.map(toItem);
    const cutoff = now.getTime();

    const upcoming = items
      .filter((m) => new Date(m.isoDate).getTime() >= cutoff)
      .sort((a, b) => a.isoDate.localeCompare(b.isoDate));

    const past = items.filter((m) => new Date(m.isoDate).getTime() < cutoff);

    const boards: BoardItem[] = boardsResult.docs.map((board) => ({
      key: String(board.id),
      name: board.name,
      schedule: board.schedule ?? null,
      location: board.location ?? null,
      note: board.note ?? null,
      // Past meetings are only worth listing if they left a record behind.
      records: past
        .filter((m) => m.boardName === board.name && (m.agenda || m.minutes))
        .slice(0, 6),
    }));

    return { upcoming, boards };
  } catch (error) {
    console.warn(
      "[meetings] Payload unavailable, serving the static schedules instead:",
      error instanceof Error ? error.message : error,
    );
    return { upcoming: [], boards: staticBoards() };
  }
}
