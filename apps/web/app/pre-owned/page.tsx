import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Pre-owned" };

export default function PreOwnedPage() {
  return (
    <ComingSoon
      title="Pre-owned"
      description="Repair, resale and donation services need the pre-owned platform, which is not connected yet."
    />
  );
}
