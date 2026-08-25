import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
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
            <Card key={post.title} className="sm:flex sm:items-start sm:justify-between sm:gap-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-forest-700 uppercase">
                  {post.date}
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold text-navy-950">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-navy-900/70">{post.summary}</p>
              </div>
              <a
                href={post.href}
                className="mt-4 inline-block shrink-0 text-sm font-semibold text-forest-700 hover:text-forest-600 sm:mt-0"
              >
                Read more →
              </a>
            </Card>
          ))}
        </div>
      </Section>

      <div className="bg-navy-950/[0.03]">
        <Section title="Upcoming Community Events">
          <ul className="grid gap-4 sm:grid-cols-3">
            {upcomingEvents.map((event) => (
              <li key={event.title} className="rounded-xl border border-navy-950/10 bg-white p-5">
                <p className="text-xs font-semibold tracking-wide text-gold-600 uppercase">
                  {event.date}
                </p>
                <p className="mt-1 font-serif text-base font-semibold text-navy-950">
                  {event.title}
                </p>
                <p className="mt-1 text-sm text-navy-900/70">{event.location}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}
