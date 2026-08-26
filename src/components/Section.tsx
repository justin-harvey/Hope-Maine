import { cn } from "@/lib/utils";

export function Section({
  title,
  description,
  headingId,
  children,
  className,
}: {
  title?: string;
  description?: string;
  headingId?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={title ? (headingId ?? undefined) : undefined}
      className={cn("mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12", className)}
    >
      {title && (
        <h2 id={headingId} className="heading-lg text-ink">
          {title}
        </h2>
      )}
      {description && <p className="mt-2 measure body text-ink-muted">{description}</p>}
      <div className={title || description ? "mt-6" : undefined}>{children}</div>
    </section>
  );
}
