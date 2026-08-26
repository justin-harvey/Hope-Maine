import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// A labelled control with hint and error text wired to it by id. The red
// left bar and the "Error:" prefix mean the failure is carried by position
// and words as well as color.
export function FormField({
  id,
  label,
  hint,
  error,
  children,
  legend = false,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => React.ReactNode;
  /** Render the label as a fieldset legend, for radio and checkbox groups. */
  legend?: boolean;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const body = (
    <>
      {legend ? (
        <legend className="heading-sm text-ink">{label}</legend>
      ) : (
        <label htmlFor={id} className="block heading-sm text-ink">
          {label}
        </label>
      )}

      {hint && (
        <p id={hintId} className="mt-1 body-sm text-ink-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-2 body-sm font-bold text-red">
          <Icon name="warning" size="sm" className="mt-0.5 shrink-0" />
          <span>
            <span className="sr-only">Error: </span>
            {error}
          </span>
        </p>
      )}

      <div className="mt-3">{children({ id, describedBy, invalid: Boolean(error) })}</div>
    </>
  );

  const className = cn("border-l-4 pl-4", error ? "border-red" : "border-transparent pl-0");

  return legend ? (
    <fieldset className={className}>{body}</fieldset>
  ) : (
    <div className={className}>{body}</div>
  );
}
