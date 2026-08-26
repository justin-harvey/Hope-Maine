"use client";

import { useEffect, useRef } from "react";

export type FieldError = { field: string; message: string };

// The GOV.UK error summary. On a failed submit, focus moves here so screen
// reader and keyboard users hear what went wrong before anything else, and
// each entry jumps to the field that caused it.
export function ErrorSummary({ errors }: { errors: FieldError[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length > 0) ref.current?.focus();
  }, [errors]);

  if (errors.length === 0) return null;

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      aria-labelledby="error-summary-title"
      className="notice notice-danger p-4 sm:p-5"
    >
      <h2 id="error-summary-title" className="heading-sm text-ink">
        There is a problem
      </h2>
      <ul className="mt-2 grid gap-1">
        {errors.map((error) => (
          <li key={error.field}>
            <a
              href={`#${error.field}`}
              onClick={(event) => {
                // Focus the control itself, not just the anchor target, so
                // the next keystroke goes where the user expects.
                event.preventDefault();
                const el = document.getElementById(error.field);
                el?.scrollIntoView({ block: "center" });
                el?.focus();
              }}
              className="body-sm font-bold text-red underline underline-offset-2 hover:decoration-[3px]"
            >
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
