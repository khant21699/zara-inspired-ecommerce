"use client";

import Link from "next/link";
import { useHydrated, useStore } from "@/lib/store";
import { ProductGrid } from "@/components/product/ProductGrid";

export function WishlistView() {
  const hydrated = useHydrated();
  const { wishlist } = useStore();
  const products = wishlist;

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between px-4 md:px-6">
        <h1 className="text-2xs uppercase">Wishlist ({products.length})</h1>
        <Link href="/bag" className="text-2xs uppercase u-link">
          Shopping bag
        </Link>
      </div>
      {!hydrated ? null : products.length === 0 ? (
        <div className="flex min-h-[50svh] flex-col items-center justify-center px-4 text-center">
          <p className="text-2xs uppercase">Your wishlist is empty</p>
          <p className="mt-3 max-w-xs text-xs text-muted">
            Tap the heart on any product to save it here.
          </p>
          <Link href="/woman/new-in" className="btn-primary mt-8 min-w-[220px]">
            Discover new in
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <ProductGrid products={products} showControls={false} />
        </div>
      )}
    </div>
  );
}
