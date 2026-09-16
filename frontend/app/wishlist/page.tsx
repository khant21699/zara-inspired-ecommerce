import type { Metadata } from "next";
import { Page } from "@/components/ui/Page";
import { WishlistView } from "@/components/bag/WishlistView";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <Page bleed>
      <WishlistView />
    </Page>
  );
}
