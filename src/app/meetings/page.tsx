import type { Metadata } from "next";

import { SurfaceCard } from "@/components/ui/surface-card";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
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
        <div className="overflow-x-auto rounded-2xl border border-blue-900/10">
          <table className="w-full text-left body-sm">
            <thead className="bg-blue-900 text-cream-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Board</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Agenda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/10 bg-cream-50">
              {upcomingMeetings.map((meeting) => (
                <tr key={`${meeting.board}-${meeting.date}`}>
                  <td className="px-4 py-3 font-medium text-blue-900">{meeting.board}</td>
                  <td className="px-4 py-3 text-slate-500">{meeting.date}</td>
                  <td className="px-4 py-3 text-slate-500">{meeting.time}</td>
                  <td className="px-4 py-3 text-slate-500">{meeting.location}</td>
                  <td className="px-4 py-3">
                    <a href={meeting.agendaHref} className="font-semibold text-blue-700 hover:text-blue-900">
                      View Agenda
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="bg-cream-200">
        <Section
          title="Meeting Archive"
          description="Recent minutes by board. Full archives available on request from the Town Office."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {meetingArchive.map((entry) => (
              <SurfaceCard key={entry.board} density="standard">
                <h3 className="font-display text-lg text-blue-900">{entry.board}</h3>
                <p className="mt-1 body-sm font-medium text-blue-700">{entry.schedule}</p>
                <ul className="mt-4 space-y-2 body-sm">
                  {entry.recentMinutes.map((minute) => (
                    <li key={minute.label}>
                      <a href={minute.href} className="text-blue-900 hover:text-blue-700">
                        {minute.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </SurfaceCard>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
