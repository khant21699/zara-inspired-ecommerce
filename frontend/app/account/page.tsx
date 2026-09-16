import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "My account" };

export default function AccountPage() {
  return (
    <ComingSoon
      title="My account"
      description="Purchases, returns, addresses, payment methods and personal details require an account service that is not connected yet."
      preview={
        <ul className="divide-y divide-line border-y border-line text-left text-2xs uppercase" aria-hidden>
          {["Purchases", "Returns", "Addresses", "Payment methods", "Personal details", "Newsletter"].map((i) => (
            <li key={i} className="py-4">
              {i}
            </li>
          ))}
        </ul>
      }
    />
  );
}
