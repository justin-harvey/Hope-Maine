// Page header, not a marketing hero: title, one line of orientation, and
// nothing else competing for attention.
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {eyebrow && <p className="overline text-ink-muted">{eyebrow}</p>}
        <h1 className="mt-2 heading-xl text-ink">{title}</h1>
        {description && <p className="mt-4 measure body-lg text-ink">{description}</p>}
      </div>
    </div>
  );
}
