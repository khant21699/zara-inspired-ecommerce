import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { PinIcon } from "@/components/ui/Icons";

export const metadata: Metadata = { title: "Store locator" };

export default function StoresPage() {
  return (
    <ComingSoon
      title="Store locator"
      description="Finding stores near you and checking in-store stock require the store and inventory services."
      preview={
        <div aria-hidden>
          <input disabled placeholder="City, postcode or store" className="input-line" />
          <div className="mt-6 flex aspect-[4/3] items-center justify-center bg-canvas">
            <PinIcon className="h-8 w-8" />
          </div>
        </div>
      }
    />
  );
}
