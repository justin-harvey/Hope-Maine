import * as React from "react";

import { cn } from "@/lib/utils";

// The one container. A ruled box on the canvas — no shadow, no radius,
// no translucency. `strong` promotes the 1px grey rule to a 2px black one
// for the single most important box on a page.
function Panel({
  strong = false,
  padded = true,
  className,
  ...props
}: React.ComponentProps<"div"> & { strong?: boolean; padded?: boolean }) {
  return (
    <div
      className={cn(
        strong ? "panel-strong" : "panel",
        padded && "p-5 sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

export { Panel };
