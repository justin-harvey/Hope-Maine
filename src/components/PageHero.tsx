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
    <div className="bg-blue-900">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {eyebrow && <p className="captions text-gold-300">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-3xl text-cream-50 sm:text-4xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl body text-cream-50/80">{description}</p>}
      </div>
    </div>
  );
}
