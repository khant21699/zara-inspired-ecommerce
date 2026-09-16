import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Newsletter" };

export default function NewsletterPage() {
  return (
    <ComingSoon
      title="Join our newsletter"
      description="Subscriptions and social channels need a messaging service that is not connected yet."
      preview={
        <form className="space-y-6 text-left" aria-hidden>
          <input disabled placeholder="E-mail" className="input-line" />
          <div className="flex gap-6 text-2xs uppercase">
            {["Woman", "Man", "Kids"].map((s) => (
              <span key={s} className="flex items-center gap-2">
                <span className="h-4 w-4 border border-ink" /> {s}
              </span>
            ))}
          </div>
          <button type="button" disabled className="btn-primary w-full">
            Subscribe
          </button>
        </form>
      }
    />
  );
}
