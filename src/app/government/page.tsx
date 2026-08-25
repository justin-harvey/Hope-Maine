import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { selectBoard, townOfficials, boardsAndCommittees } from "@/data/government";

export const metadata: Metadata = {
  title: "Town Government",
  description: "Select Board, town officials, and boards & committees for the Town of Hope, Maine.",
};

export default function GovernmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Town Government"
        title="Town Government"
        description="Hope is governed by an elected Select Board, town officials, and a number of volunteer boards and committees."
      />

      <Section title="Select Board">
        <div className="grid gap-4 sm:grid-cols-3">
          {selectBoard.map((member) => (
            <Card key={member.role}>
              <p className="font-serif text-lg font-semibold text-navy-950">{member.name}</p>
              <p className="mt-1 text-sm font-medium text-forest-700">{member.role}</p>
              <p className="mt-2 text-sm text-navy-900/60">Term ends {member.termEnds}</p>
            </Card>
          ))}
        </div>
      </Section>

      <div className="bg-navy-950/[0.03]">
        <Section title="Town Officials">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {townOfficials.map((official) => (
              <Card key={official.role}>
                <p className="text-sm font-medium text-forest-700">{official.role}</p>
                <p className="mt-1 font-serif text-base font-semibold text-navy-950">
                  {official.name}
                </p>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      <Section
        title="Boards & Committees"
        description="Volunteer bodies that advise the Select Board and administer specific town functions."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {boardsAndCommittees.map((board) => (
            <Card key={board.name}>
              <h3 className="font-serif text-lg font-semibold text-navy-950">{board.name}</h3>
              <p className="mt-2 text-sm text-navy-900/70">{board.description}</p>
              <p className="mt-3 text-sm font-medium text-forest-700">{board.meets}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
