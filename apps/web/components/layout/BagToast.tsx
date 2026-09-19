"use client";

import Link from "next/link";
import { useEffect } from "react";
import { store, useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";
import { CloseIcon } from "@/components/ui/Icons";

/** Small confirmation panel shown after an item is added to the bag. */
export function BagToast() {
  const { lastAdded } = useStore();

  useEffect(() => {
    if (!lastAdded) return;
    const timer = window.setTimeout(() => store.clearLastAdded(), 3500);
    return () => window.clearTimeout(timer);
  }, [lastAdded]);

  if (!lastAdded) return null;
  const { product } = lastAdded;

  return (
    <div
      role="status"
      className="fixed bottom-4 right-4 z-40 w-[calc(100%-2rem)] max-w-sm animate-fade-up border border-ink bg-paper p-4 md:bottom-6 md:right-6"
    >
      <div className="flex items-start justify-between">
        <p className="text-2xs uppercase">Added to your shopping bag</p>
        <button type="button" onClick={() => store.clearLastAdded()} aria-label="Dismiss">
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex gap-4">
        <div className="relative h-24 w-16 shrink-0 overflow-hidden bg-canvas">
          <ProductArt product={product} sizes="64px" />
        </div>
        <div className="min-w-0 text-2xs uppercase">
          <p className="truncate">{product.name}</p>
          <p className="mt-1 text-muted">Size {lastAdded.size}</p>
          <p className="mt-1">{formatPrice(product.price)}</p>
        </div>
      </div>
      <Link href="/bag" onClick={() => store.clearLastAdded()} className="btn-primary mt-4 w-full">
        View shopping bag
      </Link>
    </div>
  );
}
