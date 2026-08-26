import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { Panel } from "@/components/ui/panel";
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
    "Contact information, office hours, and permit forms for the Town of Hope Code Enforcement Officer and Local Plumbing Inspector.",
};

export default function CodeEnforcementPage() {
  const officer = codeEnforcementOfficer;

  return (
    <>
      <PageHero
        eyebrow="Departments & Services"
        title="Code Enforcement & Plumbing Inspection"
        description="Building permits, plumbing permits, land use ordinance questions, and code compliance."
      />

      <Section>
        <Link
          href="/departments"
          className="inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
        >
          <Icon name="chevron-right" size="xs" className="rotate-180" />
          Back to Departments &amp; Services
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[20rem_1fr]">
          <Panel strong>
            <Image
              src={officer.photo}
              alt={`${officer.name}, ${officer.title}`}
              width={365}
              height={478}
              className="w-full border border-line object-cover"
            />
            <h2 className="mt-4 heading-md text-ink">{officer.name}</h2>
            <p className="mt-1 body-sm font-semibold text-ink">{officer.credentials}</p>

            <address className="mt-4 grid gap-0.5 body-sm not-italic text-ink">
              <span>{officer.address.line1}</span>
              <span>{officer.address.line2}</span>
            </address>

            <ul className="mt-3 grid">
              <li>
                <a
                  href={`tel:${officer.phone}`}
                  className="flex min-h-[var(--tap-min)] items-center gap-2 body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                >
                  <Icon name="phone" size="xs" />
                  {officer.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${officer.email}`}
                  className="flex min-h-[var(--tap-min)] items-center gap-2 body-sm text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                >
                  <Icon name="mail" size="xs" />
                  {officer.email}
                </a>
              </li>
            </ul>
          </Panel>

          <div className="grid gap-6">
            <Notice variant="info" title="In the office on Tuesdays">
              The Code Enforcement Officer and Plumbing Inspector works part time and is in the
              office on {officer.officeDay}. To schedule an appointment, call the Town Office at{" "}
              {officer.phone} or email {officer.email}.
            </Notice>

            <div>
              <h2 className="heading-lg text-ink">Permit forms and fees</h2>
              <ul className="mt-4 border-t border-line">
                {codeEnforcementDocuments.map((doc) => (
                  <li key={doc.label} className="border-b border-line">
                    <a
                      href={doc.href}
                      className="flex min-h-[var(--tap-min)] items-center gap-3 py-3 body text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                    >
                      <Icon name="document" size="sm" className="shrink-0" />
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Panel>
              <h2 className="heading-md text-ink">Issued building permits</h2>
              <p className="mt-2 measure body-sm text-ink">{issuedBuildingPermits.note}</p>
              <a
                href={issuedBuildingPermits.href}
                className="mt-3 inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
              >
                View issued permits ({issuedBuildingPermits.count})
                <Icon name="chevron-right" size="xs" />
              </a>
            </Panel>
          </div>
        </div>
      </Section>
    </>
  );
}
