import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <ComingSoon
      title="Personal details"
      description="Creating an account needs an authentication service. Registration will be enabled once the backend is connected."
      preview={
        <form className="space-y-8 text-left" aria-hidden>
          {["E-mail", "Password", "Name", "Surname", "Phone"].map((f) => (
            <div key={f}>
              <label className="text-2xs uppercase text-muted">{f}</label>
              <input disabled className="input-line" />
            </div>
          ))}
          <button type="button" disabled className="btn-primary w-full">
            Create account
          </button>
        </form>
      }
    />
  );
}
