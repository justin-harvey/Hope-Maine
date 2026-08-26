"use client";

// Live remaining-character count. Updates are announced politely rather
// than on every keystroke, so a screen reader is not flooded while typing.
export function CharacterCount({ value, max, id }: { value: string; max: number; id: string }) {
  const remaining = max - value.length;
  const over = remaining < 0;

  return (
    <p
      id={id}
      aria-live="polite"
      className={`mt-2 body-sm ${over ? "font-bold text-red" : "text-ink-muted"}`}
    >
      {over
        ? `You have ${Math.abs(remaining)} characters too many`
        : `You have ${remaining} characters remaining`}
    </p>
  );
}
