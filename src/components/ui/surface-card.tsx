import type { ComponentProps } from "react";

import { Card } from "@/components/ui/card";
import type { SurfaceTone } from "@/lib/design-system-types";
import { cn } from "@/lib/utils";

// No shadow — depth comes from a hairline border one ramp step darker than
// the surface's own fill.
const surfaceToneClasses: Record<SurfaceTone, string> = {
  cream: "border border-cream-300 bg-cream-50 text-blue-900",
  sky: "border border-blue-300 bg-blue-200 text-blue-700",
  gold: "border border-gold-500 bg-gold-300 text-gold-800",
  slate: "border border-slate-700 bg-slate-500 text-cream-50",
  sage: "border border-green-500 bg-green-300 text-green-900",
  ink: "border border-blue-900 bg-blue-700 text-cream-50",
};

const surfaceDensityClasses = {
  none: "",
  standard: "p-5 lg:p-6",
  roomy: "p-7 lg:p-10",
} as const;

type SurfaceDensity = keyof typeof surfaceDensityClasses;

type SurfaceCardProps = ComponentProps<typeof Card> & {
  tone?: SurfaceTone;
  density?: SurfaceDensity;
  interactive?: boolean;
};

export function SurfaceCard({
  tone = "cream",
  density = "none",
  interactive = false,
  className,
  ...props
}: SurfaceCardProps) {
  return (
    <Card
      className={cn(
        "surface-card",
        interactive &&
          "cursor-pointer transition-transform duration-[400ms] ease-out hover:-translate-y-1 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        surfaceToneClasses[tone],
        // Publish the control color contract so nested filled controls
        // inherit this surface's tone unless they override it.
        `ctl-tone-${tone}`,
        surfaceDensityClasses[density],
        className,
      )}
      {...props}
    />
  );
}
