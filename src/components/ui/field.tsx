import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-4", className)} {...props} />;
}

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-2 data-[invalid=true]:text-gold-800", className)} {...props} />;
}

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("body-sm font-medium text-foreground data-[disabled=true]:opacity-60", className)}
    {...props}
  />
));
FieldLabel.displayName = LabelPrimitive.Root.displayName;

export { Field, FieldGroup, FieldLabel };
