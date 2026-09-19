import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <ComingSoon
      title="Log in to your account"
      description="Accounts need an authentication service. Log in, registration and password recovery will be enabled once the backend is connected."
      preview={
        <form className="space-y-8 text-left" aria-hidden>
          <div>
            <label className="text-2xs uppercase text-muted">E-mail</label>
            <input disabled className="input-line" />
          </div>
          <div>
            <label className="text-2xs uppercase text-muted">Password</label>
            <input disabled type="password" className="input-line" />
          </div>
          <button type="button" disabled className="btn-primary w-full">
            Log in
          </button>
          <button type="button" disabled className="btn-secondary w-full">
            Register
          </button>
        </form>
      }
    />
  );
}
