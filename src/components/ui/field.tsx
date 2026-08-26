import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-6", className)} {...props} />;
}

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn("body-sm font-bold text-ink", className)} {...props} />
));
FieldLabel.displayName = LabelPrimitive.Root.displayName;

// Hint text sits above the control, per GOV.UK — read before you answer,
// not after you've already got it wrong.
function FieldHint({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("body-xs text-ink-muted", className)} {...props} />;
}

export { Field, FieldGroup, FieldHint, FieldLabel };
