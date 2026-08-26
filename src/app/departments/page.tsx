import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import { OnlineServicesGrid } from "@/components/OnlineServicesGrid";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { departments } from "@/data/departments";

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
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                {dept.slug && (
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="inline-flex items-center gap-1 body-sm font-semibold text-blue-700 hover:text-blue-900"
                  >
                    Learn more <Icon name="chevron-right" size="xs" />
                  </Link>
                )}
                {dept.website && (
                  <a
                    href={dept.website.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 body-sm font-semibold text-blue-700 hover:text-blue-900"
                  >
                    {dept.website.label} <Icon name="external-link" size="xs" />
                  </a>
                )}
              </div>
            </SurfaceCard>
          ))}
        </div>
      </Section>

      <div className="bg-cream-200">
        <Section
          title="Online Services"
          description="Common tasks residents can complete online — most link directly to the relevant State of Maine system."
        >
          <OnlineServicesGrid />
        </Section>
      </div>
    </>
  );
}
