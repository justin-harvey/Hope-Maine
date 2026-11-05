import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { Panel } from "@/components/ui/panel";
import { MeetingCard } from "@/components/MeetingCard";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { selectBoardRecords } from "@/data/meetings";
import { getMeetingsView } from "@/lib/meetings";
import { town, legacySiteHost } from "@/town.config";

export const metadata: Metadata = {
  title: "Meetings & Agendas",
  description: `Meeting schedules, agendas, and minutes for ${town.legalName} boards and committees. All meetings are open to the public.`,
};

/**
 * Rebuilt hourly.
 *
 * The page splits meetings on "now", so unlike the rest of the site it goes
 * wrong on its own: without this a meeting prerendered as upcoming would
 * stay upcoming until somebody happened to edit something. The collections'
 * afterChange hooks still rebuild it immediately on an edit — this only
 * covers the passage of time.
 */
export const revalidate = 3600;

export default async function MeetingsPage() {
  const { upcoming, boards } = await getMeetingsView();
  const anyLegacyAgenda = boards.some((board) =>
    board.records.some((record) => record.agenda?.href.startsWith("http")),
  );

  return (
    <>
      <PageHero
        eyebrow="Meetings & Agendas"
        title="Meetings & Agendas"
        description="Schedules, agendas, and minutes for the Select Board and town committees. All meetings are open to the public."
      />

      <Section>
        {upcoming.length > 0 ? (
          <div>
            <h2 id="upcoming" className="overline text-ink-muted">
              Next meetings
            </h2>
            <ul className="mt-2 border-t border-line">
              {upcoming.slice(0, 8).map((meeting) => (
                <MeetingCard key={meeting.key} meeting={meeting} />
              ))}
            </ul>
          </div>
        ) : (
          <Notice variant="info" title="No meetings are currently scheduled here">
            Meeting dates are posted as they are set. The usual schedule for each board is listed
            below, and the Town Office can confirm the next date on {town.contact.phone}.
          </Notice>
        )}

        {anyLegacyAgenda && (
          <Notice variant="info" title="Some agendas open on the current town website" className="mt-8">
            Agendas marked as opening on another website are still hosted on {legacySiteHost}. Older
            agendas, minutes, and warrants are held in the town&apos;s document centre — call the
            Town Office at {town.contact.phone} for any record not listed here.
          </Notice>
        )}

        <div className="mt-8 grid gap-6">
          {boards.map((board) => (
            <Panel key={board.key}>
              <h2 className="heading-md text-ink">{board.name}</h2>

              <dl className="mt-3">
                <div className="data-row body-sm">
                  <dt className="font-bold text-ink">Schedule</dt>
                  <dd className={board.schedule ? "text-ink" : "text-ink-muted"}>
                    {board.schedule ?? "Not published yet"}
                  </dd>
                </div>
                <div className="data-row body-sm">
                  <dt className="font-bold text-ink">Location</dt>
                  <dd className={board.location ? "text-ink" : "text-ink-muted"}>
                    {board.location ?? "Not published yet"}
                  </dd>
                </div>
              </dl>

              {board.note && <p className="mt-3 measure body-sm text-ink">{board.note}</p>}

              {board.records.length > 0 && (
                <div className="mt-4 border-t border-line pt-4">
                  <h3 className="overline text-ink-muted">Recent agendas and minutes</h3>
                  <ul className="mt-2 grid gap-1">
                    {board.records.map((record) => (
                      <li key={record.key} className="body-sm text-ink">
                        <span className="font-semibold">{record.when}</span>
                        <span className="ml-3 inline-flex flex-wrap gap-x-4">
                          {[record.agenda, record.minutes].map((doc, i) =>
                            doc ? (
                              <a
                                key={doc.href}
                                href={doc.href}
                                target={doc.href.startsWith("http") ? "_blank" : undefined}
                                rel={doc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="inline-flex min-h-[var(--tap-min)] items-center gap-2 text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                              >
                                <Icon
                                  name={doc.href.startsWith("http") ? "external-link" : "document"}
                                  size="xs"
                                  className="shrink-0"
                                  label={
                                    doc.href.startsWith("http")
                                      ? "Opens on another website"
                                      : undefined
                                  }
                                />
                                {i === 0 ? "Agenda" : "Minutes"}
                              </a>
                            ) : null,
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Panel>
          ))}
        </div>
      </Section>

      <div className="band">
        <Section
          title="Other Select Board records"
          description="Also held in the town's document center."
        >
          <dl className="border-t border-line">
            {selectBoardRecords.map((record) => (
              <div key={record.label} className="data-row body">
                <dt className="text-ink">{record.label}</dt>
                <dd className="font-semibold text-ink">{record.count} documents</dd>
              </div>
            ))}
          </dl>
        </Section>
      </div>
    </>
  );
}
