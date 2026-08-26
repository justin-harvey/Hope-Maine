import type { Metadata } from "next";

import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { faqs, faqCategories } from "@/data/faqs";

export const metadata: Metadata = {
  title: "How Do I...?",
  description:
    "Answers to common questions for Town of Hope, Maine residents — vehicle registration, licenses, vital records, permits, property taxes, voting, and town services.",
};

// Stable anchors so other pages can link straight to a topic.
const categoryAnchors: Record<string, string> = {
  "Vehicles & Registration": "vehicles",
  "Licenses & Vital Records": "licenses",
  "Property & Permits": "property-taxes",
  "Town Government": "town-government",
  "Community Services": "community-services",
};

export default function HowDoIPage() {
  return (
    <>
      <PageHero
        eyebrow="Resident help"
        title="How Do I...?"
        description="Answers to the questions the Town Office is asked most often."
      />

      <Section>
        <nav aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="overline text-ink-muted">
            Jump to a topic
          </h2>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {faqCategories.map((category) => (
              <li key={category}>
                <a
                  href={`#${categoryAnchors[category]}`}
                  className="flex min-h-[var(--tap-min)] items-center body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 grid gap-12">
          {faqCategories.map((category) => {
            const items = faqs.filter((faq) => faq.category === category);
            if (items.length === 0) return null;

            return (
              <section key={category} aria-labelledby={categoryAnchors[category]}>
                <h2
                  id={categoryAnchors[category]}
                  className="scroll-mt-6 border-b-2 border-line-strong pb-2 heading-lg text-ink"
                >
                  {category}
                </h2>
                <div className="mt-4">
                  <FaqAccordion items={items} />
                </div>
              </section>
            );
          })}
        </div>
      </Section>
    </>
  );
}
