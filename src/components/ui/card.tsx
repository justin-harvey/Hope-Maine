import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-2xl border border-blue-900/10 bg-cream-50 text-blue-900", className)}
      {...props}
    />
  );
}

export { Card };
