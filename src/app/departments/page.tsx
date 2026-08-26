import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Panel } from "@/components/ui/panel";
import { OnlineServicesGrid } from "@/components/OnlineServicesGrid";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { departments } from "@/data/departments";

export const metadata: Metadata = {
  title: "Departments & Services",
  description: "Town departments, contacts, and services for the Town of Hope, Maine.",
};

function Value({ children }: { children: string }) {
  const missing = children.startsWith("PLACEHOLDER");
  return (
    <span className={missing ? "text-ink-muted" : "text-ink"}>
      {missing ? "Not published yet" : children}
    </span>
  );
}

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
            <Panel key={dept.name}>
              <h2 className="heading-md text-ink">{dept.name}</h2>
              <p className="mt-2 measure body-sm text-ink">{dept.description}</p>

              <dl className="mt-4">
                <div className="data-row body-sm">
                  <dt className="font-bold text-ink">Phone</dt>
                  <dd>
                    <Value>{dept.phone}</Value>
                  </dd>
                </div>
                <div className="data-row body-sm">
                  <dt className="font-bold text-ink">Email</dt>
                  <dd>
                    <Value>{dept.email}</Value>
                  </dd>
                </div>
                <div className="data-row body-sm">
                  <dt className="font-bold text-ink">Hours</dt>
                  <dd>
                    <Value>{dept.hours}</Value>
                  </dd>
                </div>
              </dl>

              {(dept.slug || dept.website) && (
                <div className="mt-3 flex flex-wrap items-center gap-x-6">
                  {dept.slug && (
                    <Link
                      href={`/departments/${dept.slug}`}
                      className="inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                    >
                      More about {dept.name}
                      <Icon name="chevron-right" size="xs" />
                    </Link>
                  )}
                  {dept.website && (
                    <a
                      href={dept.website.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                    >
                      {dept.website.label}
                      <Icon name="external-link" size="xs" label="Opens on another website" />
                    </a>
                  )}
                </div>
              )}
            </Panel>
          ))}
        </div>
      </Section>

      <div className="band">
        <Section
          title="Online services"
          description="Most of these are handled by the State of Maine and open on a maine.gov site."
        >
          <OnlineServicesGrid />
        </Section>
      </div>
    </>
  );
}
