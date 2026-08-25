import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { upcomingMeetings, meetingArchive } from "@/data/meetings";

export const metadata: Metadata = {
  title: "Meetings & Agendas",
  description: "Meeting schedules, agendas, and minutes for Town of Hope boards and committees.",
};

export default function MeetingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Meetings & Agendas"
        title="Meetings & Agendas"
        description="Meeting schedules, agendas, and minutes for the Select Board and town committees. All meetings are open to the public."
      />

      <Section title="Upcoming Meetings">
        <div className="overflow-hidden rounded-xl border border-navy-950/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-950 text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Board</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Agenda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-950/10 bg-white">
              {upcomingMeetings.map((meeting) => (
                <tr key={`${meeting.board}-${meeting.date}`}>
                  <td className="px-4 py-3 font-medium text-navy-950">{meeting.board}</td>
                  <td className="px-4 py-3 text-navy-900/80">{meeting.date}</td>
                  <td className="px-4 py-3 text-navy-900/80">{meeting.time}</td>
                  <td className="px-4 py-3 text-navy-900/80">{meeting.location}</td>
                  <td className="px-4 py-3">
                    <a href={meeting.agendaHref} className="font-semibold text-forest-700 hover:text-forest-600">
                      View Agenda
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="bg-navy-950/[0.03]">
        <Section
          title="Meeting Archive"
          description="Recent minutes by board. Full archives available on request from the Town Office."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {meetingArchive.map((entry) => (
              <Card key={entry.board}>
                <h3 className="font-serif text-lg font-semibold text-navy-950">{entry.board}</h3>
                <p className="mt-1 text-sm font-medium text-forest-700">{entry.schedule}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {entry.recentMinutes.map((minute) => (
                    <li key={minute.label}>
                      <a href={minute.href} className="text-navy-900 hover:text-forest-700">
                        {minute.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
