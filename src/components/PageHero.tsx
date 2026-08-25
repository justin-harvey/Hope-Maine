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
    <div className="bg-navy-900">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {eyebrow && (
          <p className="text-sm font-semibold tracking-wide text-gold-500 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-white/80">{description}</p>
        )}
      </div>
    </div>
  );
}
