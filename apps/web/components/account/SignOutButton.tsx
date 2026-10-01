"use client";

import { useFormStatus } from "react-dom";
import { signOutAction } from "@/lib/auth/actions";
import { cn } from "@/lib/format";

interface Props {
  /** `button` on the account page, `link` inside the menu's secondary list. */
  variant?: "button" | "link";
}

/**
 * Ends the session: clears it at the API and drops this app's cookie, then
 * the action redirects home. The server function is the form's action so its
 * redirect reaches the router; `useFormStatus` reads the pending state from
 * inside the form.
 */
export function SignOutButton({ variant = "button" }: Props) {
  return (
    <form action={signOutAction}>
      <Submit variant={variant} />
    </form>
  );
}

function Submit({ variant }: Required<Props>) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(
        variant === "button"
          ? "btn-secondary w-full sm:w-auto sm:min-w-[220px]"
          : "uppercase hover:text-ink",
        pending && variant === "link" && "text-ink",
      )}
    >
      {pending ? "Logging out…" : "Log out"}
    </button>
  );
}
