import type { Metadata } from "next";
import { Page } from "@/components/ui/Page";
import { BagView } from "@/components/bag/BagView";

export const metadata: Metadata = { title: "Shopping bag" };

export default function BagPage() {
  return (
    <Page className="pb-10">
      <BagView />
    </Page>
  );
}
