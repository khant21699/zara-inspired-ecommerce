import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  /** Shown under the field and announced; the input is marked invalid. */
  error?: string;
}

/** One line of the account forms: an 11px label over a hairline input. */
export function Field({ label, name, error, ...input }: Props) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="text-2xs uppercase text-muted">
        {label}
      </label>
      <input
        {...input}
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="input-line mt-1 text-xs"
      />
      {error && (
        <p id={errorId} className="mt-2 text-2xs uppercase">
          {error}
        </p>
      )}
    </div>
  );
}
