import Image from "next/image";

import { townInfo } from "@/lib/nav";

// To enable the photograph: drop the file at public/hero/hope-pond.jpg and
// set HERO_IMAGE to its path. Until then the hero renders the seal and
// wordmark alone, so nothing 404s.
const HERO_IMAGE: string | null = null;
const HERO_ALT = "A rowboat moored on a quiet pond in Hope, Maine, ringed by spruce woods.";

export function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-line">
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
          the wordmark keeps its AAA contrast regardless of the image. */}
      <div className="bg-surface-2">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-10 sm:flex-row sm:items-center sm:gap-10 sm:px-6 sm:py-12">
          <Image
            src="/brand/town-seal.png"
            alt=""
            width={480}
            height={480}
            priority
            className="h-40 w-40 shrink-0 sm:h-56 sm:w-56 lg:h-60 lg:w-60"
          />
          <div>
            <h1 id="hero-heading" className="heading-xl text-ink">
              {townInfo.name}
            </h1>
            <p className="mt-3 measure body-lg text-ink">
              Hope is a thriving community of 1,698, located seven miles from the shores of
              Penobscot Bay in Midcoast Maine.
            </p>
            <p className="mt-2 body-sm text-ink-muted">Incorporated 1804</p>
          </div>
        </div>
      </div>
    </section>
  );
}
