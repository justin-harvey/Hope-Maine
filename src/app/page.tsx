import Link from "next/link";
import { AlertBanner } from "@/components/AlertBanner";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
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
      <AlertBanner>
        PLACEHOLDER — Site under construction. Replace this banner with a real, current
        town notice or remove it if there is none.
      </AlertBanner>

      <div className="bg-gradient-to-b from-navy-900 to-navy-950">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-sm font-semibold tracking-wide text-gold-500 uppercase">
              {townInfo.tagline}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-white sm:text-5xl">
              Welcome to the Town of Hope
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Find town services, meeting schedules, news, and resources for residents
              and visitors of Hope, Maine.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/departments" variant="secondary">
                Town Services
              </Button>
              <Button href="/meetings" variant="ghost">
                Meetings &amp; Agendas
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-serif text-lg font-semibold text-white">
              Town Office Hours
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {townInfo.officeHours.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-4">
                  <span>{entry.days}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-white/10 pt-4 text-sm text-white/80">
              <p>{townInfo.addressLine1}</p>
              <p>{townInfo.addressLine2}</p>
              <p>{townInfo.cityStateZip}</p>
              <p className="mt-2">
                <a href={`tel:${townInfo.phone}`} className="hover:text-gold-500">
                  {townInfo.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Section title="Quick Links">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between rounded-xl border border-navy-950/10 bg-white px-5 py-4 font-medium text-navy-950 shadow-sm transition-colors hover:border-forest-600 hover:text-forest-700"
            >
              {link.label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </Section>

      <div className="bg-navy-950/[0.03]">
        <Section title="Latest News" description="Announcements from the Town of Hope.">
          <div className="grid gap-6 md:grid-cols-3">
            {newsPosts.map((post) => (
              <Card key={post.title}>
                <p className="text-xs font-semibold tracking-wide text-forest-700 uppercase">
                  {post.date}
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold text-navy-950">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-navy-900/70">{post.summary}</p>
                <Link
                  href="/news"
                  className="mt-4 inline-block text-sm font-semibold text-forest-700 hover:text-forest-600"
                >
                  Read more →
                </Link>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Button href="/news" variant="ghost">
              View All News &amp; Events
            </Button>
          </div>
        </Section>
      </div>

      <Section
        title="Upcoming Meetings"
        description="Select Board, Planning Board, and committee meetings."
      >
        <div className="overflow-hidden rounded-xl border border-navy-950/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-950 text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Board</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-950/10 bg-white">
              {upcomingMeetings.map((meeting) => (
                <tr key={`${meeting.board}-${meeting.date}`}>
                  <td className="px-4 py-3 font-medium text-navy-950">{meeting.board}</td>
                  <td className="px-4 py-3 text-navy-900/80">{meeting.date}</td>
                  <td className="px-4 py-3 text-navy-900/80">{meeting.time}</td>
                  <td className="px-4 py-3 text-navy-900/80">{meeting.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Button href="/meetings" variant="ghost">
            Full Meeting Calendar
          </Button>
        </div>
      </Section>

      <div className="bg-navy-950/[0.03]">
        <Section title="Community Events">
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
