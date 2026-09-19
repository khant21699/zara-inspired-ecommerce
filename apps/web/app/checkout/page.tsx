import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <ComingSoon
      title="Checkout"
      description="Order creation, delivery options and payment need the checkout service. Your bag is saved on this device in the meantime."
      preview={
        <ol className="space-y-6 text-left text-2xs uppercase" aria-hidden>
          {["1. Delivery address", "2. Delivery method", "3. Payment", "4. Confirm order"].map((s) => (
            <li key={s} className="border-b border-line pb-4">
              {s}
            </li>
          ))}
        </ol>
      }
    />
  );
}
