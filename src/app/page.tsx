import Link from "next/link";

import { Notice } from "@/components/ui/notice";
import { OnlineServicesGrid } from "@/components/OnlineServicesGrid";
import { Section } from "@/components/Section";
import { TaskGrid, TaskList, type Task } from "@/components/TaskList";
import { hopeIntro } from "@/data/about";
import { newsPosts } from "@/data/news";
import { meetingSchedules } from "@/data/meetings";
import { townInfo } from "@/lib/nav";

// Task-first routing: the page opens with what residents actually come
// here to do, not with a welcome message.
const popularTasks: Task[] = [
  {
    label: "Pay your property taxes",
    href: "/how-do-i#property-taxes",
    detail: "Due dates, payment methods, and online payment",
  },
  {
    label: "Register a vehicle",
    href: "/how-do-i#vehicles",
    detail: "What to bring for new registrations and renewals",
  },
  {
    label: "Get a building or plumbing permit",
    href: "/departments/code-enforcement",
    detail: "Forms, fees, and the Code Enforcement Officer's hours",
  },
  {
    label: "Read Select Board agendas and minutes",
    href: "/meetings",
    detail: "Meeting schedules for every board and committee",
  },
  {
    label: "License your dog",
    href: "/how-do-i#licenses",
    detail: "Fees, rabies certificate, and the renewal deadline",
  },
  {
    label: "Apply for General Assistance",
    href: "/how-do-i#community-services",
    detail: "Emergency help with housing, fuel, and basic needs",
  },
];

export default function HomePage() {
  const latestNews = newsPosts.slice(0, 4);
  const scheduledBoards = meetingSchedules.filter(
    (board) => !board.schedule.startsWith("PLACEHOLDER"),
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <Notice variant="info" title="Site in progress">
          This is a rebuild of the Town of Hope website. Most content is live, but some
          documents and committee pages are still being migrated from hopemaine.org.
        </Notice>
      </div>

      <Section
        title="What do you need to do?"
        headingId="popular-tasks"
        description="The services residents ask about most often."
      >
        <TaskList tasks={popularTasks} />
      </Section>

      <div className="band">
        <Section
          title="Online services"
          headingId="online-services"
          description="Most of these are handled by the State of Maine and open on a maine.gov site."
        >
          <OnlineServicesGrid />
        </Section>
      </div>

      <Section title="News and notices" headingId="news">
        <ul className="border-t border-line">
          {latestNews.map((post) => (
            <li key={post.title} className="border-b border-line py-4">
              <p className="overline text-ink-muted">{post.date}</p>
              <h3 className="mt-1 heading-sm">
                <Link
                  href="/news"
                  className="inline-flex min-h-[var(--tap-min)] items-center text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-1 measure body-sm text-ink">{post.summary}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5">
          <Link
            href="/news"
            className="inline-flex min-h-[var(--tap-min)] items-center body font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
          >
            All news and notices
          </Link>
        </p>
      </Section>

      <div className="band-cool">
        <Section title="Meeting schedule" headingId="meetings">
          <dl className="border-t border-line">
            {scheduledBoards.map((board) => (
              <div key={board.board} className="border-b border-line py-4">
                <dt className="heading-sm text-ink">{board.board}</dt>
                <dd className="mt-1 body-sm text-ink">
                  {board.schedule} · {board.location}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5">
            <Link
              href="/meetings"
              className="inline-flex min-h-[var(--tap-min)] items-center body font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
            >
              Agendas, minutes, and all boards
            </Link>
          </p>
        </Section>
      </div>

      <Section title="About the town" headingId="about-town">
        <p className="measure body text-ink">{hopeIntro}</p>
        <div className="mt-5">
          <TaskGrid
            columns={2}
            tasks={[
              {
                label: "About Hope",
                href: "/about",
                detail: "Population, area, valuation, and tax rate",
              },
              {
                label: "Schools",
                href: "/schools",
                detail: "School Union 69 and the Five Town CSD",
              },
            ]}
          />
        </div>
      </Section>

      <Section title="Visit or call the Town Office" headingId="town-office">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="overline text-ink-muted">Address</h3>
            <address className="mt-2 grid gap-0.5 body not-italic text-ink">
              <span>{townInfo.addressLine1}</span>
              <span>{townInfo.addressLine2}</span>
              <span>{townInfo.cityStateZip}</span>
            </address>
            <p className="mt-3">
              <a
                href={`tel:${townInfo.phone}`}
                className="inline-flex min-h-[var(--tap-min)] items-center body font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
              >
                {townInfo.phone}
              </a>
            </p>
          </div>
          <div>
            <h3 className="overline text-ink-muted">Office hours</h3>
            <dl className="mt-2">
              {townInfo.officeHours.map((entry) => (
                <div key={entry.days} className="data-row body">
                  <dt className="text-ink">{entry.days}</dt>
                  <dd className="font-semibold text-ink">{entry.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
}
