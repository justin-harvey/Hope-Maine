import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import Image from "next/image";

// The hero photograph is opt-in by file, not by code: drop any image into
// public/hero/ and it is picked up on the next build. Nothing to edit, and
// no broken <img> while the folder is empty.
const HERO_DIR = path.join(process.cwd(), "public", "hero");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

function findHeroImage(): string | null {
  if (!existsSync(HERO_DIR)) return null;
  const file = readdirSync(HERO_DIR).sort().find((name) => IMAGE_EXT.test(name));
  return file ? `/hero/${file}` : null;
}

const HERO_ALT =
  "A rowboat moored in the shallows of a pond in Hope, Maine, ringed by spruce woods under a summer sky.";

// Deliberately carries no seal, town name, or founding date — the masthead
// above already states all three, and repeating them pushed the first real
// content below the fold.
export function HomeHero() {
  const heroImage = findHeroImage();

  return (
    <section aria-label="About Hope" className="border-b border-line">
      {heroImage && (
        <div className="relative h-56 w-full sm:h-72 lg:h-96">
          <Image
            src={heroImage}
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
