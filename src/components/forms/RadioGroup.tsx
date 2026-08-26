"use client";

export type RadioOption = { value: string; label: string; hint?: string };

// Big, square, full-width radio rows. The whole row is the target, so it
// clears 44px comfortably and is easy to hit on a phone in a truck.
export function RadioGroup({
  name,
  options,
  value,
  onChange,
  describedBy,
  firstId,
}: {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  describedBy?: string;
  /** Id for the first input, so the error summary can focus the group. */
  firstId: string;
}) {
  return (
    <div className="grid gap-2" role="radiogroup" aria-describedby={describedBy}>
      {options.map((option, index) => {
        const id = index === 0 ? firstId : `${name}-${option.value}`;
        const selected = value === option.value;
        return (
          <label
            key={option.value}
            htmlFor={id}
            className={`flex min-h-[var(--tap-min)] cursor-pointer items-start gap-3 border-2 p-3 ${
              selected ? "border-ink bg-surface-2" : "border-line bg-canvas hover:bg-surface-1"
            }`}
          >
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="mt-1 h-6 w-6 shrink-0 accent-[color:var(--navy)]"
            />
            <span>
              <span className="block body font-semibold text-ink">{option.label}</span>
              {option.hint && <span className="block body-sm text-ink-muted">{option.hint}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}
