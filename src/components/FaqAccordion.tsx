"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { Faq } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="grid gap-3">
      {items.map((faq) => {
        const open = openQuestion === faq.question;
        return (
          <SurfaceCard key={faq.question} className="overflow-hidden">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenQuestion(open ? null : faq.question)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left body font-medium text-blue-900 hover:bg-blue-900/5"
              >
                {faq.question}
                <Icon
                  name="chevron-down"
                  size="sm"
                  className={cn("shrink-0 text-blue-700 transition-transform", open && "rotate-180")}
                />
              </button>
            </h3>
            {open && (
              <div className="border-t border-blue-900/10 px-5 py-4">
                <div className="grid gap-3">
                  {faq.answer.map((para, i) => (
                    <p key={i} className="body-sm text-blue-900/80">
                      {para}
                    </p>
                  ))}
                </div>
                {faq.links && faq.links.length > 0 && (
                  <ul className="mt-4 grid gap-2 border-t border-blue-900/10 pt-4">
                    {faq.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 body-sm font-semibold text-blue-700 hover:text-blue-900"
                        >
                          {link.label}
                          <Icon name="external-link" size="xs" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </SurfaceCard>
        );
      })}
    </div>
  );
}
