import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { Panel } from "@/components/ui/panel";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { meetingSchedules, selectBoardRecords } from "@/data/meetings";

export const metadata: Metadata = {
  title: "Meetings & Agendas",
  description:
    "Meeting schedules, agendas, and minutes for Town of Hope boards and committees. All meetings are open to the public.",
};

export default function MeetingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Meetings & Agendas"
        title="Meetings & Agendas"
        description="Schedules, agendas, and minutes for the Select Board and town committees. All meetings are open to the public."
      />

      <Section>
        <Notice variant="info" title="Agendas open on the current town website">
          Recent agendas are listed below and will open on hopemaine.org. Older agendas, minutes,
          and warrants are held in the town&apos;s document centre — call the Town Office at
          (207) 763-4199 for any record not listed here.
        </Notice>

        <div className="mt-8 grid gap-6">
          {meetingSchedules.map((board) => {
            const scheduleKnown = !board.schedule.startsWith("PLACEHOLDER");
            return (
              <Panel key={board.board}>
                <h2 className="heading-md text-ink">{board.board}</h2>

                <dl className="mt-3">
                  <div className="data-row body-sm">
                    <dt className="font-bold text-ink">Schedule</dt>
                    <dd className={scheduleKnown ? "text-ink" : "text-ink-muted"}>
                      {scheduleKnown ? board.schedule : "Not published yet"}
                    </dd>
                  </div>
                  <div className="data-row body-sm">
                    <dt className="font-bold text-ink">Location</dt>
                    <dd className="text-ink">
                      {board.location.startsWith("PLACEHOLDER") ? "Not published yet" : board.location}
                    </dd>
                  </div>
                </dl>

                {board.note && <p className="mt-3 measure body-sm text-ink">{board.note}</p>}

                {board.recentAgendas.length > 0 && (
                  <div className="mt-4 border-t border-line pt-4">
                    <h3 className="overline text-ink-muted">Recent agendas</h3>
                    <ul className="mt-2 grid">
                      {board.recentAgendas.map((agenda) => (
                        <li key={agenda.label}>
                          <a
                            href={agenda.href}
                            className="flex min-h-[var(--tap-min)] items-center gap-2 body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                          >
                            <Icon name="document" size="xs" className="shrink-0" />
                            {agenda.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Panel>
            );
          })}
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
