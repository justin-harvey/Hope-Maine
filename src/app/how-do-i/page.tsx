import type { Metadata } from "next";

import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { faqs, faqCategories } from "@/data/faqs";

export const metadata: Metadata = {
  title: "How Do I...?",
  description:
    "Answers to common questions for Town of Hope, Maine residents — vehicle registration, licenses, vital records, permits, taxes, voting, and town services.",
};

export default function HowDoIPage() {
  return (
    <>
      <PageHero
        eyebrow="Resident Help"
        title="How Do I...?"
        description="Answers to the questions the Town Office is asked most often — registrations, licenses, vital records, permits, taxes, and town services."
      />

      {faqCategories.map((category, index) => {
        const items = faqs.filter((faq) => faq.category === category);
        if (items.length === 0) return null;

        return (
          <div key={category} className={index % 2 === 1 ? "bg-cream-200" : undefined}>
            <Section title={category}>
              <FaqAccordion items={items} />
            </Section>
          </div>
        );
      })}
    </>
  );
}
