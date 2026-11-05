import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { RoadReportForm } from "@/components/forms/road-report-form";
import { town } from "@/town.config";

export const metadata: Metadata = {
  title: "Report a problem with a road",
  description: `Tell the ${town.legalName} about a pothole, washout, fallen tree, drainage problem, or other issue on a town road.`,
};

export default function ReportRoadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <p>
        <Link
          href="/how-do-i"
          className="inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
        >
          <Icon name="chevron-right" size="xs" className="rotate-180" />
          Back to How Do I…?
        </Link>
      </p>

      <div className="mt-2">
        <Notice variant="warning" title="For emergencies, call instead">
          If a road is blocked or unsafe right now, call the Town Office on {town.contact.phone} during
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

    </div>
  );
}
