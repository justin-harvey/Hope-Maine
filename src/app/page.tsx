import Link from "next/link";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Icon } from "@/components/ui/icon";
import { LinkButton } from "@/components/ui/link-button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { OnlineServicesGrid } from "@/components/OnlineServicesGrid";
import { Section } from "@/components/Section";
import { townInfo } from "@/lib/nav";
import { upcomingMeetings } from "@/data/meetings";
import { newsPosts, upcomingEvents } from "@/data/news";

const quickLinks = [
  { label: "Pay Property Taxes", href: "/departments" },
  { label: "Meeting Agendas", href: "/meetings" },
  { label: "Permits & Forms", href: "/documents" },
  { label: "Town Reports", href: "/documents" },
  { label: "Boards & Committees", href: "/government" },
  { label: "Contact the Town Office", href: "/contact" },
];

export default function HomePage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <Alert variant="warning">
          <Icon name="warning" size="sm" />
          <AlertDescription>
            Site under construction — some information here is still placeholder text
            while real town content is added.
          </AlertDescription>
        </Alert>
      </div>

      <div className="bg-blue-900">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="captions text-gold-300">{townInfo.tagline}</p>
            <h1 className="mt-3 font-display text-4xl text-cream-50 sm:text-5xl">
              Welcome to the Town of Hope
            </h1>
            <p className="mt-5 max-w-xl body-lg text-cream-50/80">
              Find town services, meeting schedules, news, and resources for residents
              and visitors of Hope, Maine.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/departments" tone="gold">
                Town Services
              </LinkButton>
              <LinkButton href="/meetings" variant="outline" tone="slate">
                Meetings &amp; Agendas
              </LinkButton>
            </div>
          </div>
          <SurfaceCard tone="ink" density="standard">
            <h2 className="font-display text-lg text-cream-50">Town Office Hours</h2>
            <ul className="mt-3 space-y-2 body-sm text-cream-50/80">
              {townInfo.officeHours.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-4">
                  <span>{entry.days}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-cream-50/10 pt-4 body-sm text-cream-50/80">
              <p>{townInfo.addressLine1}</p>
              <p>{townInfo.addressLine2}</p>
              <p>{townInfo.cityStateZip}</p>
              <p className="mt-2">
                <a href={`tel:${townInfo.phone}`} className="hover:text-gold-300">
                  {townInfo.phone}
                </a>
              </p>
            </div>
          </SurfaceCard>
        </div>
      </div>

      <Section title="Quick Links">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between rounded-2xl border border-blue-900/10 bg-cream-50 px-5 py-4 body font-medium text-blue-900 shadow-sm transition-colors hover:border-blue-700 hover:text-blue-700"
            >
              {link.label}
              <Icon name="chevron-right" size="sm" />
            </Link>
          ))}
        </div>
      </Section>

      <div className="bg-cream-200">
        <Section title="Online Services" description="Common tasks residents can complete online.">
          <OnlineServicesGrid />
        </Section>
      </div>

      <Section title="Latest News" description="Announcements from the Town of Hope.">
        <div className="grid gap-6 md:grid-cols-3">
          {newsPosts.map((post) => (
            <SurfaceCard key={post.title} density="standard">
              <p className="captions text-blue-700">{post.date}</p>
              <h3 className="mt-2 font-display text-lg text-blue-900">{post.title}</h3>
              <p className="mt-2 body-sm text-slate-500">{post.summary}</p>
              <Link href="/news" className="mt-4 inline-block body-sm font-semibold text-blue-700 hover:text-blue-900">
                Read more →
              </Link>
            </SurfaceCard>
          ))}
        </div>
        <div className="mt-6">
          <LinkButton href="/news" variant="outline">
            View All News &amp; Events
          </LinkButton>
        </div>
      </Section>

      <div className="bg-cream-200">
        <Section title="Upcoming Meetings" description="Select Board, Planning Board, and committee meetings.">
          <div className="overflow-x-auto rounded-2xl border border-blue-900/10">
            <table className="w-full text-left body-sm">
              <thead className="bg-blue-900 text-cream-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">Board</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/10 bg-cream-50">
                {upcomingMeetings.map((meeting) => (
                  <tr key={`${meeting.board}-${meeting.date}`}>
                    <td className="px-4 py-3 font-medium text-blue-900">{meeting.board}</td>
                    <td className="px-4 py-3 text-slate-500">{meeting.date}</td>
                    <td className="px-4 py-3 text-slate-500">{meeting.time}</td>
                    <td className="px-4 py-3 text-slate-500">{meeting.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <LinkButton href="/meetings" variant="outline">
              Full Meeting Calendar
            </LinkButton>
          </div>
        </Section>
      </div>

      <Section title="Community Events">
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
    </>
  );
}
