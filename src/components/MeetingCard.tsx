import { Icon } from "@/components/ui/icon";
import { Tag } from "@/components/ui/tag";
import type { MeetingItem } from "@/lib/meetings";

const statusLabel: Record<MeetingItem["status"], string> = {
  scheduled: "Scheduled",
  cancelled: "Cancelled",
  rescheduled: "Rescheduled",
};

/**
 * One meeting in the upcoming list.
 *
 * A cancelled meeting stays on the page, struck through and labelled, rather
 * than disappearing: residents who already planned around it need to be told
 * it is off, and a meeting that silently vanishes reads as a website fault.
 * The status is carried by a written word, not by colour — the strikethrough
 * and the tag both say it.
 */
export function MeetingCard({ meeting }: { meeting: MeetingItem }) {
  const isOff = meeting.status !== "scheduled";

  return (
    <li className="border-b border-line py-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="heading-sm text-ink">{meeting.boardName}</h3>
        {isOff && (
          <Tag tone={meeting.status === "cancelled" ? "red" : "neutral"}>
            {statusLabel[meeting.status]}
          </Tag>
        )}
      </div>

      <p className="mt-1 body-sm text-ink">
        <time dateTime={meeting.isoDate} className={isOff ? "line-through" : undefined}>
          {meeting.when}
        </time>
        {meeting.location && <> · {meeting.location}</>}
      </p>

      {meeting.note && <p className="mt-2 measure body-sm text-ink">{meeting.note}</p>}

      {(meeting.agenda || meeting.minutes) && (
        <ul className="mt-2 grid">
          {[meeting.agenda, meeting.minutes].map((doc, i) =>
            doc ? (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  target={doc.href.startsWith("http") ? "_blank" : undefined}
                  rel={doc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                >
                  <Icon
                    name={doc.href.startsWith("http") ? "external-link" : "document"}
                    size="xs"
                    className="shrink-0"
                    label={doc.href.startsWith("http") ? "Opens on another website" : undefined}
                  />
                  {i === 0 ? "Agenda" : "Minutes"}
                </a>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </li>
  );
}
