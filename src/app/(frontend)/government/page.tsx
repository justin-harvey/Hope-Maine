import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { Panel } from "@/components/ui/panel";
import { Tag } from "@/components/ui/tag";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { selectBoard, townOfficials, boardsAndCommittees } from "@/data/government";
import { town, townDisplayName } from "@/town.config";

export const metadata: Metadata = {
  title: "Town Government",
  description: `Select Board members, town officials, and boards and committees for the ${townDisplayName}.`,
};

export default function GovernmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Town Government"
        title="Town Government"
        description={`${town.name} is governed by an elected Select Board, supported by town officials and volunteer boards and committees.`}
      />

      <Section title="Select Board" headingId="select-board">
        <Notice variant="info" title="Meeting schedule">
          {selectBoard.meets} {selectBoard.agendaNote}
        </Notice>

        <ul className="mt-6 border-t border-line">
          {selectBoard.members.map((member) => (
            <li
              key={`${member.name}-${member.termExpires}`}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4"
            >
              <div>
                <p className="heading-sm text-ink">
                  {member.name}{" "}
                  {member.role !== "Member" && (
                    <Tag tone={member.name === "Vacant" ? "neutral" : "navy"}>{member.role}</Tag>
                  )}
                </p>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-1 inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                  >
                    <Icon name="mail" size="xs" />
                    {member.email}
                  </a>
                )}
              </div>
              <p className="body-sm text-ink-muted">Term expires {member.termExpires}</p>
            </li>
          ))}
        </ul>

        {selectBoard.boardEmail && (
          <p className="mt-5 body-sm text-ink">
            Contact the whole board at{" "}
            <a
              href={`mailto:${selectBoard.boardEmail}`}
              className="prose-link font-semibold"
            >
              {selectBoard.boardEmail}
            </a>
            .
          </p>
        )}
      </Section>

      <div className="band">
        <Section title="Town Office staff" headingId="staff">
          <div className="grid gap-4 md:grid-cols-2">
            {townOfficials.map((official) => (
              <Panel key={official.role}>
                <h3 className="heading-sm text-ink">{official.name}</h3>
                <p className="mt-1 body-sm font-semibold text-ink">{official.role}</p>
                {official.otherRoles.length > 0 && (
                  <p className="mt-1 body-sm text-ink-muted">{official.otherRoles.join(" · ")}</p>
                )}
                <a
                  href={`mailto:${official.email}`}
                  className="mt-2 inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                >
                  <Icon name="mail" size="xs" />
                  {official.email}
                </a>
              </Panel>
            ))}
          </div>
        </Section>
      </div>

      <Section
        title="Boards and committees"
        headingId="boards"
        description="Volunteer bodies that advise the Select Board and administer specific town functions."
      >
        <div className="grid gap-6">
          {boardsAndCommittees.map((board) => (
            <Panel key={board.name}>
              <h3 className="heading-md text-ink">{board.name}</h3>
              <p className="mt-2 measure body-sm text-ink">{board.description}</p>
              <p className="mt-2 body-sm text-ink">
                <span className="font-bold">Meets:</span>{" "}
                {board.meets.startsWith("PLACEHOLDER") ? (
                  <span className="text-ink-muted">Schedule not published yet</span>
                ) : (
                  board.meets
                )}
              </p>

              {board.members.length > 0 && (
                <div className="mt-4 border-t border-line pt-4">
                  <h4 className="overline text-ink-muted">Current members</h4>
                  <dl className="mt-2">
                    {board.members.map((member) => (
                      <div key={member.name} className="data-row body-sm">
                        <dt className="text-ink">{member.name}</dt>
                        <dd className="text-ink-muted">Term expires {member.termExpires}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </Panel>
          ))}
        </div>
      </Section>
    </>
  );
}
