"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";

// Verification chrome, after the USWDS official-site banner. Certifies
// domain ownership at the top of every page so residents can tell the real
// town site from a lookalike.
export function OfficialBanner() {
  const [open, setOpen] = useState(false);

  return (
    <section aria-label="Official website notice" className="border-b border-line bg-surface-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 py-1.5 body-xs text-ink">
          <Icon name="location" size="xs" className="shrink-0 text-ink-muted" />
          An official website of the Town of Hope, Maine
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-[var(--tap-min)] items-center gap-1 text-blue-link underline underline-offset-2 hover:decoration-[3px]"
          >
            Here&apos;s how you know
            <Icon
              name="chevron-down"
              size="xs"
              className={open ? "rotate-180" : undefined}
              aria-hidden
            />
          </button>
        </p>

        {open && (
          <div className="grid gap-4 border-t border-line py-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <Icon name="shield" size="sm" className="mt-0.5 shrink-0 text-green" />
              <p className="body-xs text-ink">
                <span className="font-bold">Official websites use hopemaine.org.</span> A web
                address ending in <span className="font-bold">hopemaine.org</span> belongs to the
                Town of Hope.
              </p>
            </div>
            <div className="flex gap-3">
              <Icon name="check-circle" size="sm" className="mt-0.5 shrink-0 text-green" />
              <p className="body-xs text-ink">
                <span className="font-bold">Secure sites use HTTPS.</span> Look for a lock icon in
                your browser before sharing any personal information.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
