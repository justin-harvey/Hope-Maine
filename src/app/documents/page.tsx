import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { documentCategories } from "@/data/documents";

export const metadata: Metadata = {
  title: "Documents & Forms",
  description: "Town reports, ordinances, permits, and forms for the Town of Hope, Maine.",
};

export default function DocumentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documents & Forms"
        title="Documents & Forms"
        description="Town reports, ordinances, permit applications, and other public documents."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {documentCategories.map((category) => (
            <SurfaceCard key={category.category} density="standard">
              <h3 className="font-display text-lg text-blue-900">{category.category}</h3>
              <ul className="mt-4 space-y-2 body-sm">
                {category.documents.map((doc) => (
                  <li key={doc.label} className="flex items-center gap-2">
                    <Icon name="document" size="xs" className="shrink-0 text-blue-700" />
                    <a href={doc.href} className="text-blue-900 hover:text-blue-700">
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          ))}
        </div>
      </Section>
    </>
  );
}
