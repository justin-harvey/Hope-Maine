import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
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
            <Card key={category.category}>
              <h3 className="font-serif text-lg font-semibold text-navy-950">
                {category.category}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {category.documents.map((doc) => (
                  <li key={doc.label} className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-forest-700"
                    >
                      <path
                        d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <a href={doc.href} className="text-navy-900 hover:text-forest-700">
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
