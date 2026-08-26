import type { Metadata } from "next";

import { SurfaceCard } from "@/components/ui/surface-card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { newsPosts, upcomingEvents } from "@/data/news";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Town announcements, notices, and community events for the Town of Hope, Maine.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="News & Events"
        description="Announcements, public notices, and community events from the Town of Hope."
      />

      <Section title="News & Announcements">
        <div className="space-y-4">
          {newsPosts.map((post) => (
            <SurfaceCard key={post.title} density="standard" className="sm:flex sm:items-start sm:justify-between sm:gap-6">
              <div>
                <p className="captions text-blue-700">{post.date}</p>
                <h3 className="mt-2 font-display text-lg text-blue-900">{post.title}</h3>
                <p className="mt-2 body-sm text-slate-500">{post.summary}</p>
              </div>
              <a
                href={post.href}
                className="mt-4 inline-block shrink-0 body-sm font-semibold text-blue-700 hover:text-blue-900 sm:mt-0"
              >
                Read more →
              </a>
            </SurfaceCard>
          ))}
        </div>
      </Section>

      <div className="bg-cream-200">
        <Section title="Upcoming Community Events">
          <ul className="grid gap-4 sm:grid-cols-3">
            {upcomingEvents.map((event) => (
              <li key={event.title} className="rounded-2xl border border-blue-900/10 bg-cream-50 p-5">
                <p className="captions text-gold-600">{event.date}</p>
                <p className="mt-1 font-display text-base text-blue-900">{event.title}</p>
                <p className="mt-1 body-sm text-slate-500">{event.location}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}
