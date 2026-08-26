import { Icon } from "@/components/ui/icon";
import type { Faq } from "@/data/faqs";

// Native <details>: keyboard-operable, screen-reader-announced, and
// functional with JavaScript disabled — no custom widget to get wrong.
export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-line">
      {items.map((faq) => (
        <details key={faq.question} className="group border-b border-line">
          <summary className="flex min-h-[var(--tap-min)] cursor-pointer list-none items-center justify-between gap-4 py-3 body font-semibold text-blue-link underline underline-offset-2 hover:decoration-[3px] [&::-webkit-details-marker]:hidden">
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
      ))}
    </div>
  );
}
