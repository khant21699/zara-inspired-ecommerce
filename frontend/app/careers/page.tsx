import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <ComingSoon
      title="Work with us"
      description="Job listings and applications are served by the careers platform, which is not connected yet."
    />
  );
}
