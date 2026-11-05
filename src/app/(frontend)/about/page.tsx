import type { Metadata } from "next";

import { Notice } from "@/components/ui/notice";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { aboutStillToCome, hopeIntro, hopeProfile } from "@/data/about";
import { townInfo } from "@/lib/nav";
import { town, townDisplayName } from "@/town.config";

export const metadata: Metadata = {
  title: `About ${town.name}`,
  description: `Population, area, roads, valuation, and tax rate for the ${townDisplayName}${
    town.incorporatedYear ? `, incorporated in ${town.incorporatedYear}` : ""
  }.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title={`About ${town.name}`} description={hopeIntro} />

      <Section title="Town profile" headingId="profile">
        <dl className="border-t border-line">
          {hopeProfile.map((row) => (
            <div key={row.label} className="data-row body">
              <dt className="text-ink">{row.label}</dt>
              <dd className="font-bold text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <div className="band">
        <Section title="Town Office" headingId="town-office">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="overline text-ink-muted">Address</h3>
              <address className="mt-2 grid gap-0.5 body not-italic text-ink">
                <span>{townInfo.addressLine1}</span>
                <span>{townInfo.addressLine2}</span>
                <span>{townInfo.cityStateZip}</span>
              </address>
            </div>
            <div>
              <h3 className="overline text-ink-muted">Office hours</h3>
              <dl className="mt-2">
                {townInfo.officeHours.map((entry) => (
                  <div key={entry.days} className="data-row body">
                    <dt className="text-ink">{entry.days}</dt>
                    <dd className="font-semibold text-ink">{entry.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {aboutStillToCome && (
            <div className="mt-8">
              <Notice title="Still to come">{aboutStillToCome}</Notice>
            </div>
          )}
        </Section>
      </div>
    </>
  );
}
