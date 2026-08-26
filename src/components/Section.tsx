import { cn } from "@/lib/utils";

export function Section({
  title,
  description,
  headingId,
  /** Use 1 for the page's primary heading; every other section stays at 2. */
  level = 2,
  children,
  className,
}: {
  title?: string;
  description?: string;
  headingId?: string;
  level?: 1 | 2;
  children: React.ReactNode;
  className?: string;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <section
      aria-labelledby={title ? (headingId ?? undefined) : undefined}
      className={cn("mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12", className)}
    >
      {title && (
        <Heading id={headingId} className={level === 1 ? "heading-xl text-ink" : "heading-lg text-ink"}>
          {title}
        </Heading>
      )}
      {description && <p className="mt-2 measure body text-ink-muted">{description}</p>}
      <div className={title || description ? "mt-6" : undefined}>{children}</div>
    </section>
  );
}
