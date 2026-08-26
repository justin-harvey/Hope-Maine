"use client";

import { useEffect } from "react";

import { Icon } from "@/components/ui/icon";
import type { Faq } from "@/data/faqs";
import { faqSlug } from "@/lib/utils";

// Opens and scrolls to whichever question the URL hash names — a link like
// /how-do-i#pay-my-property-taxes should land on that answer already open,
// not just on the collapsed accordion for its category.
function openHashTarget() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  const summary = document.getElementById(hash);
  const details = summary?.closest("details");
  if (!details) return;

  details.open = true;
  details.scrollIntoView({ block: "start" });
  // A native <summary> is already a focusable disclosure control, so this
  // both announces the destination to a screen reader and gives keyboard
  // users a sensible place to start (Space/Enter re-closes it).
  summary?.focus();
}

// Native <details>: keyboard-operable, screen-reader-announced, and
// functional with JavaScript disabled — no custom widget to get wrong.
//
// `openSlug` comes from the ?q= parameter and is applied during rendering,
// so the linked answer arrives already open in the HTML. That is what makes
// this work with scripts blocked. The hash effect below only covers links
// that carry a bare #fragment with no ?q=.
export function FaqAccordion({ items, openSlug }: { items: Faq[]; openSlug?: string }) {
  useEffect(() => {
    openHashTarget();
    window.addEventListener("hashchange", openHashTarget);
    return () => window.removeEventListener("hashchange", openHashTarget);
  }, []);

  return (
    <div className="border-t border-line">
      {items.map((faq) => {
        const slug = faqSlug(faq.question);
        return (
        <details key={faq.question} open={slug === openSlug} className="group border-b border-line">
          <summary
            id={slug}
            className="flex min-h-[var(--tap-min)] scroll-mt-6 cursor-pointer list-none items-center justify-between gap-4 py-3 body font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px] [&::-webkit-details-marker]:hidden"
          >
            {faq.question}
            <Icon
              name="chevron-down"
              size="sm"
              className="shrink-0 transition-transform group-open:rotate-180"
            />
          </summary>

          <div className="pb-5">
            <div className="grid gap-3 border-l-4 border-line pl-4">
              {faq.answer.map((para, i) => (
                <p key={i} className="measure body-sm text-ink">
                  {para}
                </p>
              ))}

              {faq.links && faq.links.length > 0 && (
                <ul className="mt-1 grid">
                  {faq.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[var(--tap-min)] items-center gap-2 body-sm font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px]"
                      >
                        {link.label}
                        <Icon name="external-link" size="xs" label="Opens on another website" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </details>
        );
      })}
    </div>
  );
}
