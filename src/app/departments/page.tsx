import type { Metadata } from "next";

import { Icon } from "@/components/ui/icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { departments } from "@/data/departments";
import { onlineServices } from "@/data/online-services";

export const metadata: Metadata = {
  title: "Departments & Services",
  description: "Town departments, contacts, and services for the Town of Hope, Maine.",
};

export default function DepartmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Departments & Services"
        title="Departments & Services"
        description="Contact information and hours for town departments and municipal services."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {departments.map((dept) => (
            <SurfaceCard key={dept.name} density="standard">
              <h3 className="font-display text-lg text-blue-900">{dept.name}</h3>
              <p className="mt-2 body-sm text-slate-500">{dept.description}</p>
              <dl className="mt-4 space-y-1 body-sm text-blue-900/80">
                <div className="flex gap-2">
                  <dt className="font-medium text-blue-900">Phone:</dt>
                  <dd>{dept.phone}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-blue-900">Email:</dt>
                  <dd>{dept.email}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-blue-900">Hours:</dt>
                  <dd>{dept.hours}</dd>
                </div>
              </dl>
            </SurfaceCard>
          ))}
        </div>
      </Section>

      <div className="bg-cream-200">
        <Section title="Online Services" description="Common tasks residents can complete online.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {onlineServices.map((service) => (
              <a
                key={service.label}
                href={service.href}
                className="flex items-center gap-2 rounded-2xl border border-blue-900/10 bg-cream-50 px-4 py-3 body-sm font-medium text-blue-900 shadow-sm transition-colors hover:border-blue-700 hover:text-blue-700"
              >
                <Icon name="chevron-right" size="xs" className="shrink-0 text-blue-700" />
                {service.label}
              </a>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
