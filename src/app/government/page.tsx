import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
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
            <SurfaceCard key={member.role} density="standard">
              <p className="font-display text-lg text-blue-900">{member.name}</p>
              <p className="mt-1 body-sm font-medium text-blue-700">{member.role}</p>
              <p className="mt-2 body-sm text-slate-500">Term ends {member.termEnds}</p>
            </SurfaceCard>
          ))}
        </div>
      </Section>

      <div className="bg-cream-200">
        <Section title="Town Office Staff">
          <div className="grid gap-4 sm:grid-cols-2">
            {townOfficials.map((official) => (
              <SurfaceCard key={official.role} density="standard">
                <p className="font-display text-lg text-blue-900">{official.name}</p>
                <p className="mt-1 body-sm font-medium text-blue-700">{official.role}</p>
                {official.otherRoles.length > 0 && (
                  <p className="mt-1 body-sm text-slate-500">{official.otherRoles.join(", ")}</p>
                )}
                <p className="mt-3 flex items-center gap-1.5 body-sm text-blue-900">
                  <Icon name="mail" size="xs" />
                  {official.email}
                </p>
              </SurfaceCard>
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
            <SurfaceCard key={board.name} density="standard">
              <h3 className="font-display text-lg text-blue-900">{board.name}</h3>
              <p className="mt-2 body-sm text-slate-500">{board.description}</p>
              <p className="mt-3 body-sm font-medium text-blue-700">{board.meets}</p>
            </SurfaceCard>
          ))}
        </div>
      </Section>
    </>
  );
}
