import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
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
            <SurfaceCard density="standard">
              <h3 className="font-display text-lg text-blue-900">Hope Town Office</h3>
              <address className="mt-3 space-y-1 body-sm not-italic text-blue-900/80">
                <p>{townInfo.addressLine1}</p>
                <p>{townInfo.addressLine2}</p>
                <p>{townInfo.cityStateZip}</p>
              </address>
              <dl className="mt-4 space-y-2 body-sm text-blue-900/80">
                <div className="flex items-center gap-2">
                  <Icon name="phone" size="xs" />
                  <dd>
                    <a href={`tel:${townInfo.phone}`} className="hover:text-blue-700">
                      {townInfo.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="mail" size="xs" />
                  <dd>
                    <a href={`mailto:${townInfo.email}`} className="hover:text-blue-700">
                      {townInfo.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </SurfaceCard>

            <SurfaceCard density="standard">
              <h3 className="font-display text-lg text-blue-900">Office Hours</h3>
              <ul className="mt-3 space-y-1 body-sm text-blue-900/80">
                {townInfo.officeHours.map((entry) => (
                  <li key={entry.days} className="flex justify-between gap-4">
                    <span>{entry.days}</span>
                    <span>{entry.hours}</span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>

            <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-blue-900/20 bg-cream-200 body-sm text-slate-500">
              Map embed placeholder — add a Google Maps embed once the address is confirmed.
            </div>
          </div>

          <div className="lg:col-span-2">
            <SurfaceCard density="standard">
              <h3 className="font-display text-lg text-blue-900">Send a Message</h3>
              <p className="mt-1 body-sm text-slate-500">
                For urgent matters, please call the Town Office directly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </SurfaceCard>
          </div>
        </div>
      </Section>
    </>
  );
}
