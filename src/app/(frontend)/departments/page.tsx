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

// A missing value is stated plainly rather than left blank, so residents
// can tell "we haven't published this" from "there is nothing here".
function Value({ children }: { children: string | null }) {
  if (!children) return <span className="text-ink-muted">Not published yet</span>;
  return <span className="text-ink">{children}</span>;
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
            <Panel key={dept.name} className="flex flex-col">
              <h2 className="heading-md text-ink">{dept.name}</h2>
              <p className="mt-2 measure body-sm text-ink">{dept.description}</p>

              {dept.contact && (
                <p className="mt-3 body-sm text-ink">
                  <span className="font-bold">{dept.contact.name}</span>
                  {" — "}
                  {dept.contact.role}
                  {dept.contact.address && (
                    <span className="block text-ink-muted">{dept.contact.address}</span>
                  )}
                </p>
              )}

              <dl className="mt-4">
                <div className="data-row body-sm">
                  <dt className="font-bold text-ink">Phone</dt>
                  <dd>
                    {dept.phone && dept.phone.startsWith("(") ? (
                      <a
                        href={`tel:${dept.phone}`}
                        className="inline-flex min-h-[var(--tap-min)] items-center text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                      >
                        {dept.phone}
                      </a>
                    ) : (
                      <Value>{dept.phone}</Value>
                    )}
                  </dd>
                </div>
                <div className="data-row body-sm">
                  <dt className="font-bold text-ink">Email</dt>
                  <dd>
                    {dept.email ? (
                      <a
                        href={`mailto:${dept.email}`}
                        className="inline-flex min-h-[var(--tap-min)] items-center text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                      >
                        {dept.email}
                      </a>
                    ) : (
                      <Value>{null}</Value>
                    )}
                  </dd>
                </div>
                <div className="data-row body-sm">
                  <dt className="font-bold text-ink">Hours</dt>
                  <dd className="text-right">
                    <Value>{dept.hours}</Value>
                  </dd>
                </div>
              </dl>

              {dept.notes && dept.notes.length > 0 && (
                <ul className="mt-4 grid gap-2 border-l-4 border-line pl-4">
                  {dept.notes.map((note) => (
                    <li key={note} className="body-sm text-ink">
                      {note}
                    </li>
                  ))}
                </ul>
              )}

              {(dept.slug || dept.links) && (
                <div className="mt-4 flex flex-col border-t border-line pt-2">
                  {dept.slug && (
                    <Link
                      href={`/departments/${dept.slug}`}
                      className="flex min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                    >
                      More about {dept.name}
                      <Icon name="chevron-right" size="xs" />
                    </Link>
                  )}
                  {dept.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                    >
                      {link.label}
                      <Icon name="external-link" size="xs" label="Opens on another website" />
                    </a>
                  ))}
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
