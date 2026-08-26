import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { Panel } from "@/components/ui/panel";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { townInfo } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact information, hours, and location for the Town of Hope, Maine town office.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact the Town Office"
        description="Call, email, or stop by during office hours."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[24rem_1fr]">
          <div className="grid gap-6">
            <Panel strong>
              <h2 className="heading-md text-ink">Hope Town Office</h2>
              <address className="mt-3 grid gap-0.5 body not-italic text-ink">
                <span>{townInfo.addressLine1}</span>
                <span>{townInfo.addressLine2}</span>
                <span>{townInfo.cityStateZip}</span>
              </address>

              <ul className="mt-4 grid border-t border-line pt-2">
                <li>
                  <a
                    href={`tel:${townInfo.phone}`}
                    className="flex min-h-[var(--tap-min)] items-center gap-3 body text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                  >
                    <Icon name="phone" size="sm" className="shrink-0" />
                    {townInfo.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${townInfo.email}`}
                    className="flex min-h-[var(--tap-min)] items-center gap-3 body text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                  >
                    <Icon name="mail" size="sm" className="shrink-0" />
                    {townInfo.email}
                  </a>
                </li>
                <li className="flex min-h-[var(--tap-min)] items-center gap-3 body text-ink">
                  <Icon name="document" size="sm" className="shrink-0" />
                  Fax: {townInfo.fax}
                </li>
              </ul>
            </Panel>

            <Panel>
              <h2 className="heading-md text-ink">Office hours</h2>
              <dl className="mt-3">
                {townInfo.officeHours.map((entry) => (
                  <div key={entry.days} className="data-row body">
                    <dt className="text-ink">{entry.days}</dt>
                    <dd className="font-semibold text-ink">{entry.hours}</dd>
                  </div>
                ))}
              </dl>
            </Panel>

            <Notice variant="danger" title="Emergencies">
              For any emergency, dial <span className="font-bold">911</span>. If you need General
              Assistance outside office hours, contact the Knox County Regional Communications
              Center at (207) 594-0429.
            </Notice>
          </div>

          <div>
            <h2 className="heading-lg text-ink">Send a message</h2>
            <p className="mt-2 measure body text-ink-muted">
              For urgent matters, please call the Town Office directly.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
