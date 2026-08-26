import Image from "next/image";

// To enable the photograph: drop the file at public/hero/hope-pond.jpg and
// set HERO_IMAGE to its path. Until then the hero renders the summary
// alone, so nothing 404s.
const HERO_IMAGE: string | null = null;
const HERO_ALT = "A rowboat moored on a quiet pond in Hope, Maine, ringed by spruce woods.";

// Deliberately carries no seal, town name, or founding date — the masthead
// above already states all three, and repeating them pushed the first real
// content below the fold.
export function HomeHero() {
  return (
    <section aria-label="About Hope" className="border-b border-line">
      {HERO_IMAGE && (
        <div className="relative h-56 w-full sm:h-72 lg:h-96">
          <Image
            src={HERO_IMAGE}
            alt={HERO_ALT}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Text sits on a solid surface rather than over the photograph, so
          it keeps its AAA contrast regardless of the image behind it. */}
      <div className="bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <p className="measure body-lg text-ink">
            Hope is a thriving community of 1,698, located seven miles from the shores of
            Penobscot Bay in Midcoast Maine.
          </p>
        </div>
      </div>
    </section>
  );
}
