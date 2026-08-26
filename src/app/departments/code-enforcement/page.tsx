import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import {
  codeEnforcementOfficer,
  codeEnforcementDocuments,
  issuedBuildingPermits,
} from "@/data/code-enforcement";

export const metadata: Metadata = {
  title: "Code Enforcement Officer & Plumbing Inspector",
  description:
    "Contact information, office hours, and permit forms for the Town of Hope Code Enforcement Officer & Local Plumbing Inspector.",
};

export default function CodeEnforcementPage() {
  const officer = codeEnforcementOfficer;

  return (
    <>
      <PageHero
        eyebrow="Departments & Services"
        title="Code Enforcement Officer & Plumbing Inspector"
        description="Building permits, plumbing permits, land use ordinance questions, and code compliance."
      />

      <Section>
        <Link
          href="/departments"
          className="inline-flex items-center gap-1 body-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          <Icon name="chevron-right" size="xs" className="rotate-180" />
          Back to Departments & Services
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <SurfaceCard density="standard" className="lg:col-span-1">
            <Image
              src={officer.photo}
              alt={officer.name}
              width={365}
              height={478}
              className="w-full rounded-xl object-cover"
            />
            <h2 className="mt-4 font-display text-xl text-blue-900">{officer.name}</h2>
            <p className="mt-1 body-sm font-medium text-blue-700">{officer.credentials}</p>
            <address className="mt-4 space-y-1 body-sm not-italic text-blue-900/80">
              <p>{officer.address.line1}</p>
              <p>{officer.address.line2}</p>
            </address>
            <dl className="mt-4 space-y-2 body-sm text-blue-900/80">
              <div className="flex items-center gap-2">
                <Icon name="phone" size="xs" />
                <dd>
                  <a href={`tel:${officer.phone}`} className="hover:text-blue-700">
                    {officer.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="mail" size="xs" />
                <dd>
                  <a href={`mailto:${officer.email}`} className="hover:text-blue-700">
                    {officer.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="clock" size="xs" />
                <dd>In office {officer.officeDay}</dd>
              </div>
            </dl>
          </SurfaceCard>

          <div className="lg:col-span-2">
            <SurfaceCard density="standard">
              <h3 className="font-display text-lg text-blue-900">{officer.title}</h3>
              <p className="mt-3 body text-blue-900/80">
                The Code Enforcement Officer and Local Plumbing Inspector is {officer.name}.
              </p>
              <p className="mt-3 body-sm text-slate-500">{officer.bio}</p>
            </SurfaceCard>

            <SurfaceCard density="standard" className="mt-6">
              <h3 className="font-display text-lg text-blue-900">Permit Forms & Fees</h3>
              <ul className="mt-4 space-y-2 body-sm">
                {codeEnforcementDocuments.map((doc) => (
                  <li key={doc.label} className="flex items-center gap-2">
                    <Icon name="document" size="xs" className="shrink-0 text-blue-700" />
                    <a href={doc.href} className="text-blue-900 hover:text-blue-700">
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </SurfaceCard>

            <SurfaceCard density="standard" className="mt-6" tone="sky">
              <h3 className="font-display text-lg text-blue-900">Issued Building Permits</h3>
              <p className="mt-2 body-sm text-blue-900/80">{issuedBuildingPermits.note}</p>
              <a
                href={issuedBuildingPermits.href}
                className="mt-3 inline-flex items-center gap-1 body-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                View issued permits ({issuedBuildingPermits.count}) <Icon name="external-link" size="xs" />
              </a>
            </SurfaceCard>
          </div>
        </div>
      </Section>
    </>
  );
}
