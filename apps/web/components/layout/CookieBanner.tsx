"use client";

import Link from "next/link";
import { cn } from "@/lib/format";
import { store, useHydrated, useStore } from "@/lib/store";

export function CookieBanner() {
  const hydrated = useHydrated();
  const { cookieConsent } = useStore();
  if (!hydrated || cookieConsent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie settings"
      className={cn(
        // Consent paints above the chrome. Phone: a box at the bottom, over
        // whatever is there until answered. Desktop: bottom-left, above the
        // listing's VIEW switch and the home deck's titles, away from the wordmark.
        "fixed inset-x-4 bottom-4 z-[65] max-w-md animate-fade-up border border-ink bg-paper p-5",
        "md:inset-x-auto md:bottom-(--chrome-top) md:left-(--chrome-x) md:p-6",
      )}
    >
      <h2 className="text-2xs uppercase">Cookie settings</h2>
      <p className="mt-3 text-xs leading-relaxed">
        We use our own and third-party cookies to improve your experience, analyse traffic and
        show you personalised content. You can accept all cookies, reject them or configure your
        preferences. Read our{" "}
        <Link href="/legal/cookies-policy" className="u-link">
          cookies policy
        </Link>
        .
      </p>
      <div className="mt-5 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => store.setCookieConsent("accepted")}
          className="btn-primary"
        >
          Accept all cookies
        </button>
        <button
          type="button"
          onClick={() => store.setCookieConsent("rejected")}
          className="btn-secondary"
        >
          Reject all cookies
        </button>
        <Link href="/legal/cookies-policy" className="mt-2 self-start text-2xs uppercase u-link">
          Configure
        </Link>
      </div>
    </div>
  );
}
