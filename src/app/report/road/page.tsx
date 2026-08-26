import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { RoadReportForm } from "@/components/forms/road-report-form";

export const metadata: Metadata = {
  title: "Report a problem with a road",
  description:
    "Tell the Town of Hope about a pothole, washout, fallen tree, drainage problem, or other issue on a town road.",
};

export default function ReportRoadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <p>
        <Link
          href="/how-do-i#community-services"
          className="inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
        >
          <Icon name="chevron-right" size="xs" className="rotate-180" />
          Back to How Do I…?
        </Link>
      </p>

      <div className="mt-2">
        <Notice variant="warning" title="For emergencies, call instead">
          If a road is blocked or unsafe right now, call the Town Office on (207) 763-4199 during
          office hours, or dial 911 in an emergency. This form is not monitored outside office
          hours.
        </Notice>
      </div>

      <div className="mt-6">
        <p className="measure body text-ink">
          Use this form for problems on <span className="font-bold">town roads</span>. Problems on
          state highways go to the{" "}
          <a
            href="http://www.maine.gov/mdot/contact/"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link font-semibold"
          >
            Maine Department of Transportation
          </a>
          .
        </p>
      </div>

      <div className="mt-8">
        <RoadReportForm />
      </div>

      {/*
        Netlify discovers forms by parsing the deployed HTML at build time.
        The interactive form above is React state, so it is invisible to that
        parser — this static copy declares the field names. It is hidden from
        users and from assistive tech; the real submission is a urlencoded
        POST from the component.
      */}
      <form
        name="road-report"
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
        aria-hidden="true"
      >
        <input type="hidden" name="form-name" value="road-report" />
        <input type="text" name="bot-field" />
        <input type="text" name="location" />
        <input type="text" name="landmark" />
        <input type="text" name="problem" />
        <input type="text" name="severity" />
        <textarea name="description" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
      </form>
    </div>
  );
}
