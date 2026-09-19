"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { store, useStore } from "@/lib/store";
import { cn } from "@/lib/format";
import { ProductArt } from "./ProductArt";
import { Price } from "./Price";
import { BookmarkIcon } from "@/components/ui/Icons";

interface Props {
  product: Product;
  /** Items shown under COMPLETE YOUR LOOK. */
  related: Product[];
}

/*
 * Gallery rhythm measured on the reference at 1800px: a 775px image at x=232
 * starting y=32, then a 633px image at x=928 with the composition floating
 * beside it, repeating. The buy column sits at x=1117, 436px wide, from y=165.
 */
const SHOTS = [
  { variant: 0, className: "md:ml-[12.9%] md:w-[43%]" },
  { variant: 1, className: "md:ml-[51.6%] md:w-[35.2%]", aside: true },
  { variant: 2, className: "md:ml-[12.9%] md:w-[43%]" },
  { variant: 3, className: "md:ml-[51.6%] md:w-[35.2%]" },
] as const;

const PANELS = [
  {
    id: "measurements",
    title: "Product measurements",
    body: "The measurements table depends on the catalog API. Coming soon.",
  },
  {
    id: "composition",
    title: "Composition & care",
    body: "CARE\nMachine wash at max. 30ºC with short spin cycle. Do not use bleach. Iron at a maximum of 110ºC. Do not dry clean. Do not tumble dry.\n\nORIGIN\nWe work with our suppliers, workers, unions and international organisations to develop a supply chain in which human rights are respected.",
  },
  {
    id: "stores",
    title: "Check in-store availability",
    body: "Live store stock needs a connection to the inventory service. Coming soon.",
  },
  {
    id: "shipping",
    title: "Shipping, exchanges and returns",
    body: "DELIVERY\nStandard home delivery in 2–5 working days. Free on orders over $50.\nExpress delivery in 1–2 working days.\n\nRETURNS\nYou have 30 days from the shipping date to return your items free of charge in store or at a collection point.",
  },
] as const;

/** "OUTER SHELL\n95% viscose, 5% elastane" → one fibre per line. */
function compositionLines(composition: string): string[] {
  return composition.split("\n").flatMap((line) => (line === line.toUpperCase() ? [line] : line.split(", ")));
}

export function ProductDetail({ product, related }: Props) {
  const [colorIndex, setColorIndex] = useState(0);
  const [sizesOpen, setSizesOpen] = useState(false);
  const [panel, setPanel] = useState<(typeof PANELS)[number]["id"] | null>(null);
  const [zoom, setZoom] = useState<(typeof SHOTS)[number]["variant"] | null>(null);
  const { wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const color = product.colors[colorIndex];
  const singleSize = product.sizes.length === 1;
  // A "look" is built from other categories, not more of the same item.
  const look = related.filter((p) => p.category !== product.category).slice(0, 3);

  const add = (size: string) => {
    store.addToBag(product.id, size, color.name);
    setSizesOpen(false);
  };

  return (
    <div className="relative -mt-(--chrome-top) md:-mt-[128px]">
      {/* Gallery: a swipe strip on phones, a staggered editorial column on desktop. */}
      <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:block md:overflow-visible">
        {SHOTS.map((shot, i) => (
          <div
            key={shot.variant}
            className={cn("relative w-full shrink-0 snap-start md:mt-28 md:first:mt-0", shot.className)}
          >
            <button
              type="button"
              onClick={() => setZoom(shot.variant)}
              aria-label={`Zoom image ${i + 1}`}
              className="relative block aspect-[2/3] w-full cursor-zoom-in bg-canvas"
            >
              <ProductArt
                product={product}
                variant={shot.variant}
                colorIndex={colorIndex}
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 43vw"
                className="absolute inset-0"
              />
            </button>
            {"aside" in shot && (
              <p className="absolute right-[calc(100%+20.4vw)] top-1/2 hidden -translate-y-1/2 whitespace-pre text-xs uppercase md:block">
                {compositionLines(product.composition).join("\n")}
              </p>
            )}
          </div>
        ))}
      </div>

      {zoom !== null && <Zoom product={product} variant={zoom} colorIndex={colorIndex} onClose={() => setZoom(null)} />}

      {/* Buy column */}
      <aside className="px-4 pt-6 md:absolute md:left-[62%] md:top-[133px] md:w-[24.2%] md:px-0 md:pt-0">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-[15px] uppercase leading-6">{product.name}</h1>
          <button
            type="button"
            onClick={() => store.toggleWishlist(product.id)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            className="mt-1 shrink-0"
          >
            <BookmarkIcon filled={wished} className="h-4 w-4" />
          </button>
        </div>
        <Price product={product} size="md" className="mt-1" />

        <div className="mt-5 border-t border-ink/60 pt-6">
          <p className="text-2xs uppercase">
            {color.name} | {product.ref}
          </p>
          {product.colors.length > 1 && (
            <ul className="mt-3 flex gap-2" aria-label="Colours">
              {product.colors.map((c, i) => (
                <li key={c.name}>
                  <button
                    type="button"
                    onClick={() => setColorIndex(i)}
                    aria-label={c.name}
                    aria-pressed={i === colorIndex}
                    className={cn(
                      "h-4 w-4 border",
                      i === colorIndex ? "border-ink ring-1 ring-ink ring-offset-2" : "border-black/10",
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-[18px]">
          <button
            type="button"
            onClick={() => (singleSize ? add(product.sizes[0]) : setSizesOpen((o) => !o))}
            aria-expanded={singleSize ? undefined : sizesOpen}
            className="btn-outline"
          >
            Add
          </button>
          <Link href="/checkout" className="btn-outline">
            Pay
          </Link>
        </div>

        {sizesOpen && (
          <ul className="mt-2 animate-fade-up border-t border-line" aria-label="Select a size">
            {product.sizes.map((s) => (
              <li key={s} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => add(s)}
                  className="flex h-10 w-full items-center text-chrome uppercase hover:bg-canvas"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 text-xs">{product.description}</p>

        {look.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xs uppercase">Complete your look</h2>
            <ul className="mt-3 flex gap-[2px]">
              {look.map((p) => (
                <li key={p.id} className="w-[66px]">
                  <Link href={`/product/${p.slug}`} aria-label={p.name} className="relative block aspect-[2/3] bg-canvas">
                    <ProductArt product={p} variant={0} sizes="66px" className="absolute inset-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ul className="mt-10">
          {PANELS.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setPanel((open) => (open === p.id ? null : p.id))}
                aria-expanded={panel === p.id}
                className="flex h-6 items-center text-2xs uppercase hover:underline hover:underline-offset-4"
              >
                {p.title}
              </button>
              {panel === p.id && (
                <div className="whitespace-pre-line py-3 text-xs">
                  {p.id === "composition" ? `${product.composition}\n\n${p.body}` : p.body}
                  {p.id === "stores" && (
                    <>
                      {" "}
                      <Link href="/stores" className="u-link">
                        Store locator
                      </Link>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

interface ZoomProps {
  product: Product;
  variant: (typeof SHOTS)[number]["variant"];
  colorIndex: number;
  onClose: () => void;
}

/** Full-viewport view of one shot; click anywhere or press Escape to close. */
function Zoom({ product, variant, colorIndex, onClose }: ZoomProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name}, zoomed`}
      onClick={onClose}
      className="fixed inset-0 z-[70] cursor-zoom-out overflow-y-auto bg-paper"
    >
      <div className="relative mx-auto aspect-[2/3] w-full md:w-[66vw]">
        <ProductArt product={product} variant={variant} colorIndex={colorIndex} sizes="100vw" className="absolute inset-0" />
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed right-(--chrome-x) top-7 text-chrome uppercase hover:underline hover:underline-offset-4"
      >
        Close
      </button>
    </div>
  );
}
