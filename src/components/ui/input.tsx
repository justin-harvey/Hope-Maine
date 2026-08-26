import * as React from "react";

import { cn } from "@/lib/utils";

// Square, 2px-stroked fields. Tall enough to clear the 44px target and
// large enough that the value stays readable while typing.
const fieldBase =
  "w-full min-h-[var(--tap-min)] border-2 border-line-strong bg-canvas px-3 py-2 body-sm text-ink placeholder:text-ink-muted disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input type={type} className={cn(fieldBase, className)} ref={ref} {...props} />
  ),
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea className={cn(fieldBase, className)} ref={ref} {...props} />
  ),
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
