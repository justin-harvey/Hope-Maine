import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { documentCategories } from "@/data/documents";

export const metadata: Metadata = {
  title: "Documents & Forms",
  description:
    "Town reports, ordinances, policies, audits, tax maps, permits, and forms for the Town of Hope, Maine.",
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function DocumentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documents & Forms"
        title="Documents & Forms"
        description="Town reports, ordinances, policies, audited finances, maps, permit applications, and other public records."
      />

      <Section>
        <Notice variant="info" title="Documents open on the current town website">
          These files are still hosted on hopemaine.org and will open there. They move to this
          site as part of the changeover. If a document does not open, call the Town Office at
          (207) 763-4199 for a copy.
        </Notice>

        {/* On-page contents — a long list of records needs a way in. */}
        <nav aria-labelledby="contents-heading" className="mt-8">
          <h2 id="contents-heading" className="overline text-ink-muted">
            On this page
          </h2>
          <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {documentCategories.map((category) => (
              <li key={category.category}>
                <a
                  href={`#${slugify(category.category)}`}
                  className="flex min-h-[var(--tap-min)] items-center body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                >
                  {category.category} ({category.documents.length})
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 grid gap-12">
          {documentCategories.map((category) => (
            <section key={category.category} aria-labelledby={slugify(category.category)}>
              <h2
                id={slugify(category.category)}
                className="scroll-mt-6 border-b-2 border-line-strong pb-2 heading-lg text-ink"
              >
                {category.category}
              </h2>
              {category.description && (
                <p className="mt-2 measure body-sm text-ink-muted">{category.description}</p>
              )}
              <ul className="mt-4 border-t border-line">
                {category.documents.map((doc) => (
                  <li key={doc.label} className="border-b border-line">
                    <a
                      href={doc.href}
                      className="flex min-h-[var(--tap-min)] items-center gap-3 py-3 body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                    >
                      <Icon name="document" size="sm" className="shrink-0" />
                      {doc.label}
                    </a>
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
