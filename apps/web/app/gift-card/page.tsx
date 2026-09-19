import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Gift card" };

export default function GiftCardPage() {
  return (
    <ComingSoon
      title="Gift card"
      description="Buying, activating and checking the balance of gift cards requires the payment service."
      preview={
        <div aria-hidden>
          <div className="flex aspect-[1.6] items-end bg-ink p-5 text-left text-paper">
            <span className="font-logo text-3xl uppercase">Zara</span>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-2 text-2xs">
            {["$ 25", "$ 50", "$ 100", "$ 200"].map((v) => (
              <span key={v} className="border border-line py-3 text-center">
                {v}
              </span>
            ))}
          </div>
        </div>
      }
    />
  );
}
