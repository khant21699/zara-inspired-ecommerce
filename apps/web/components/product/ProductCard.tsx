"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { store } from "@/lib/store";
import { cn } from "@/lib/format";
import { ProductArt } from "./ProductArt";
import { Price } from "./Price";
import { CloseIcon, PlusIcon } from "@/components/ui/Icons";

interface Props {
  product: Product;
  sizes?: string;
  priority?: boolean;
  /** Compact cards hide the quick-add control (used in rails). */
  compact?: boolean;
  /** Six-up density: centred price and quick add, no name or colours. */
  dense?: boolean;
}

export function ProductCard({ product, sizes, priority, compact = false, dense = false }: Props) {
  const [sizesOpen, setSizesOpen] = useState(false);
  const href = `/product/${product.slug}`;

  return (
    <article className="group relative" onMouseLeave={() => setSizesOpen(false)}>
      <div className="relative aspect-[2/3] overflow-hidden bg-canvas">
        <Link href={href} aria-label={product.name} className="absolute inset-0 block">
          <ProductArt
            product={product}
            variant={0}
            sizes={sizes}
            priority={priority}
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
          />
          <ProductArt
            product={product}
            variant={1}
            sizes={sizes}
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        {sizesOpen && (
          <div className="absolute inset-x-0 bottom-0 animate-fade-up bg-paper/95 p-3 backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between text-2xs uppercase">
              <span>Select a size</span>
              <button type="button" onClick={() => setSizesOpen(false)} aria-label="Close">
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <li key={size}>
                  <button
                    type="button"
                    onClick={() => {
                      store.addToBag(product, size, product.colors[0].name);
                      setSizesOpen(false);
                    }}
                    className="min-w-9 border border-line px-2 py-1.5 text-2xs uppercase hover:border-ink"
                  >
                    {size}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {dense ? (
        <div className="flex flex-col items-center pt-3">
          <Price product={product} dense />
          {!compact && (
            <button
              type="button"
              onClick={() => setSizesOpen((o) => !o)}
              aria-label={`Add ${product.name} to bag`}
              aria-expanded={sizesOpen}
              className="p-1"
            >
              <PlusIcon className="h-3 w-3" />
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-start justify-between gap-2 pt-4">
          <div className="min-w-0">
            <Link href={href} className="block truncate text-2xs uppercase hover:underline hover:underline-offset-4">
              {product.name}
            </Link>
            <Price product={product} />
            {product.colors.length > 1 && (
              <ul className="mt-2 flex gap-1.5" aria-label={`${product.colors.length} colours`}>
                {product.colors.map((c) => (
                  <li
                    key={c.name}
                    title={c.name}
                    className="h-2.5 w-2.5 border border-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </ul>
            )}
          </div>
          {!compact && (
            <button
              type="button"
              onClick={() => setSizesOpen((o) => !o)}
              aria-label={`Add ${product.name} to bag`}
              aria-expanded={sizesOpen}
              className={cn("-mr-1 shrink-0 p-1", sizesOpen && "opacity-40")}
            >
              <PlusIcon className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
    </article>
  );
}
