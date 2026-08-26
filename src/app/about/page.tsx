import type { Metadata } from "next";

import { SurfaceCard } from "@/components/ui/surface-card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { hopeIntro, hopeProfile } from "@/data/about";
import { townInfo } from "@/lib/nav";

export const metadata: Metadata = {
  title: "About Hope",
  description:
    "Population, area, roads, valuation, and tax rate for the Town of Hope, Maine — a Midcoast community incorporated in 1804.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="About Hope" description={hopeIntro} />

      <Section title="Hope Profile">
        <SurfaceCard>
          <dl className="divide-y divide-blue-900/10">
            {hopeProfile.map((row) => (
              <div key={row.label} className="flex flex-wrap justify-between gap-x-6 gap-y-1 px-5 py-3">
                <dt className="body-sm text-slate-500">{row.label}</dt>
                <dd className="body-sm font-semibold text-blue-900">{row.value}</dd>
              </div>
            ))}
          </dl>
        </SurfaceCard>
      </Section>

      <div className="bg-cream-200">
        <Section title="Town Office">
          <SurfaceCard density="standard">
            <address className="grid gap-1 body-sm not-italic text-blue-900/80">
              <p>{townInfo.addressLine1}</p>
              <p>{townInfo.addressLine2}</p>
              <p>{townInfo.cityStateZip}</p>
            </address>
            <ul className="mt-4 grid gap-1 body-sm text-blue-900/80">
              {townInfo.officeHours.map((entry) => (
                <li key={entry.days} className="flex flex-wrap justify-between gap-x-6">
                  <span>{entry.days}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 body-sm text-slate-500">
              Hope History and Town Maps pages from the current town site haven&apos;t been
              brought over yet.
            </p>
          </SurfaceCard>
        </Section>
      </div>
    </>
  );
}
