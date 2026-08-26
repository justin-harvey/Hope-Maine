import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { Panel } from "@/components/ui/panel";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { schoolsIntro, schoolDistricts } from "@/data/schools";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "School Union 69 and the Five Town Community School District serving the Town of Hope, Maine.",
};

export default function SchoolsPage() {
  return (
    <>
      <PageHero eyebrow="Community" title="Schools" description={schoolsIntro} />

      <Section>
        <div className="grid gap-12">
          {schoolDistricts.map((district) => (
            <section key={district.district} aria-label={district.district}>
              <h2 className="border-b-2 border-line-strong pb-2 heading-lg text-ink">
                {district.district}
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {district.entries.map((entry) => (
                  <Panel key={entry.name}>
                    <h3 className="heading-md text-ink">{entry.name}</h3>
                    <p className="mt-1 body-sm font-semibold text-ink">{entry.person}</p>

                    <address className="mt-3 grid gap-0.5 body-sm not-italic text-ink">
                      {entry.address.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </address>

                    <ul className="mt-3 grid">
                      <li>
                        <a
                          href={`tel:${entry.phone}`}
                          className="flex min-h-[var(--tap-min)] items-center gap-2 body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                        >
                          <Icon name="phone" size="xs" />
                          {entry.phone}
                        </a>
                      </li>
                      {entry.fax && (
                        <li className="flex min-h-[var(--tap-min)] items-center gap-2 body-sm text-ink">
                          <Icon name="document" size="xs" />
                          Fax: {entry.fax}
                        </li>
                      )}
                      <li>
                        <a
                          href={entry.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                        >
                          Visit website
                          <Icon name="external-link" size="xs" label="Opens on another website" />
                        </a>
                      </li>
                    </ul>
                  </Panel>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
