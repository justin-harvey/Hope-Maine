import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
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
            <Card key={dept.name}>
              <h3 className="font-serif text-lg font-semibold text-navy-950">{dept.name}</h3>
              <p className="mt-2 text-sm text-navy-900/70">{dept.description}</p>
              <dl className="mt-4 space-y-1 text-sm text-navy-900/80">
                <div className="flex gap-2">
                  <dt className="font-medium text-navy-950">Phone:</dt>
                  <dd>{dept.phone}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-navy-950">Email:</dt>
                  <dd>{dept.email}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-navy-950">Hours:</dt>
                  <dd>{dept.hours}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
