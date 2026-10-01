"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthFormState } from "@/lib/auth/actions";
import { Field } from "./Field";

type Action = (
  state: AuthFormState | undefined,
  form: FormData,
) => Promise<AuthFormState>;

interface Props {
  action: Action;
  /** Where to go once the session exists. */
  next: string;
  submit: string;
  /** Label while the request is in flight. */
  submitting: string;
  /** Sign-up asks for a name as well. */
  withName?: boolean;
  /** The link under the button to the other form. */
  alternative: { lead: string; label: string; href: string };
}

/**
 * The log-in and registration form. Both post to a server action, which puts
 * the session in an HttpOnly cookie and redirects; nothing about the session
 * is ever held in the browser's JavaScript.
 */
export function AuthForm({
  action,
  next,
  submit,
  submitting,
  withName = false,
  alternative,
}: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="mt-10 space-y-8">
      <input type="hidden" name="next" value={next} />

      {withName && (
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          required
          defaultValue={state?.values?.name}
          error={state?.fields?.name}
        />
      )}

      <Field
        label="E-mail"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        spellCheck={false}
        required
        defaultValue={state?.values?.email}
        error={state?.fields?.email}
      />

      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete={withName ? "new-password" : "current-password"}
        required
        minLength={withName ? 8 : undefined}
        error={state?.fields?.password}
      />

      {state?.message && (
        <p role="alert" className="border-t border-ink pt-3 text-2xs uppercase">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="btn-primary w-full"
      >
        {pending ? submitting : submit}
      </button>

      <p className="text-2xs uppercase text-muted">
        {alternative.lead}{" "}
        <Link href={alternative.href} className="u-link text-ink">
          {alternative.label}
        </Link>
      </p>
    </form>
  );
}
