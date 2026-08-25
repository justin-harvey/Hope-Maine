import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { ContactForm } from "@/components/ContactForm";
import { townInfo } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information, hours, and location for the Town of Hope, Maine town office.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact the Town Office"
        description="Reach out with questions, or stop by during office hours."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <h3 className="font-serif text-lg font-semibold text-navy-950">
                Hope Town Office
              </h3>
              <address className="mt-3 space-y-1 text-sm not-italic text-navy-900/80">
                <p>{townInfo.addressLine1}</p>
                <p>{townInfo.addressLine2}</p>
                <p>{townInfo.cityStateZip}</p>
              </address>
              <dl className="mt-4 space-y-1 text-sm text-navy-900/80">
                <div className="flex gap-2">
                  <dt className="font-medium text-navy-950">Phone:</dt>
                  <dd>
                    <a href={`tel:${townInfo.phone}`} className="hover:text-forest-700">
                      {townInfo.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-navy-950">Fax:</dt>
                  <dd>{townInfo.fax}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-navy-950">Email:</dt>
                  <dd>
                    <a href={`mailto:${townInfo.email}`} className="hover:text-forest-700">
                      {townInfo.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Card>

            <Card>
              <h3 className="font-serif text-lg font-semibold text-navy-950">Office Hours</h3>
              <ul className="mt-3 space-y-1 text-sm text-navy-900/80">
                {townInfo.officeHours.map((entry) => (
                  <li key={entry.days} className="flex justify-between gap-4">
                    <span>{entry.days}</span>
                    <span>{entry.hours}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-navy-950/20 bg-navy-950/[0.03] text-sm text-navy-900/60">
              Map embed placeholder — add a Google Maps embed once the address is confirmed.
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <h3 className="font-serif text-lg font-semibold text-navy-950">Send a Message</h3>
              <p className="mt-1 text-sm text-navy-900/70">
                For urgent matters, please call the Town Office directly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
