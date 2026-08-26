import * as React from "react";

import { cn } from "@/lib/utils";

type TagTone = "neutral" | "navy" | "blue" | "red" | "green";

// A flat, square label chip. Border plus fill, uppercase text — legible
// without relying on hue to carry meaning.
const toneClass: Record<TagTone, string> = {
  neutral: "border-line-strong bg-surface-1 text-ink",
  navy: "border-navy bg-navy text-ink-inverse",
  blue: "border-blue bg-blue-wash text-blue-link",
  red: "border-red bg-red-wash text-red",
  green: "border-green bg-green-wash text-green",
};

function Tag({
  tone = "neutral",
  className,
  ...props
}: React.ComponentProps<"span"> & { tone?: TagTone }) {
  return (
    <span
      className={cn("inline-flex items-center border px-2 py-0.5 overline", toneClass[tone], className)}
      {...props}
    />
  );
}

export { Tag };
