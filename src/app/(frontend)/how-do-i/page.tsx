import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { categoryAnchors, faqsByCategory } from "@/lib/faqs";
import { townDisplayName } from "@/town.config";

export const metadata: Metadata = {
  title: "How Do I...?",
  description: `Answers to common questions for ${townDisplayName} residents — vehicle registration, licenses, vital records, permits, property taxes, voting, and town services.`,
};

/**
 * An index, not an accordion.
 *
 * This page used to hold all twenty-five answers in collapsed rows, with
 * the right one opened by a `?q=` parameter when arriving from a task link.
 * It was static, then dynamic, then correct — and still left people looking
 * at a stack of closed rows trying to work out which had opened.
 *
 * Now every question is a link to its own page, so it is a directory:
 * scannable in full, nothing hidden behind a control, and no state to be
 * wrong about. It is also static again, since there is no parameter to read.
 */
export default function HowDoIPage() {
  const groups = faqsByCategory();

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
            {groups.map((group) => (
              <li key={group.category}>
                <a
                  href={`#${categoryAnchors[group.category]}`}
                  className="flex min-h-[var(--tap-min)] items-center body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                >
                  {group.category} ({group.entries.length})
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 grid gap-12">
          {groups.map((group) => (
            <section key={group.category} aria-labelledby={categoryAnchors[group.category]}>
              <h2
                id={categoryAnchors[group.category]}
                className="scroll-mt-6 border-b-2 border-line-strong pb-2 heading-lg text-ink"
              >
                {group.category}
              </h2>
              <ul className="mt-4 task-list">
                {group.entries.map((entry) => (
                  <li key={entry.slug}>
                    <Link href={`/how-do-i/${entry.slug}`} className="task-row body">
                      <span className="min-w-0">
                        <span className="block font-semibold">{entry.question}</span>
                      </span>
                      <Icon name="chevron-right" size="sm" className="shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
