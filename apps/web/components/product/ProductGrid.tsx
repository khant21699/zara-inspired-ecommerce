"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/format";
import { ProductCard } from "./ProductCard";
import { CheckIcon, CloseIcon } from "@/components/ui/Icons";

/** 1 = single hero column, 2 = hero-then-pairs rhythm (default), 3 = six-up. */
type View = 1 | 2 | 3;
type Sort = "recommended" | "price-asc" | "price-desc" | "newest";

const VIEWS: View[] = [1, 2, 3];

/*
 * Column geometry measured on the reference at 1800px (column 1296):
 * hero 962, pair 620 + 56 gutter, six-up 183 + 40 gutter.
 */
const HERO = "md:w-[74.23%]";
const PAIR = "md:w-[47.84%]";
const SIX = "md:w-[calc((100%-5*3.086%)/6)]";

const GAP_CLASS: Record<View, string> = {
  1: "gap-y-10 md:gap-y-28",
  2: "gap-x-2 gap-y-10 md:gap-x-[4.32%] md:gap-y-28",
  3: "gap-x-2 gap-y-6 md:gap-x-[3.086%] md:gap-y-4",
};

const VIEW_SIZES: Record<View, string> = {
  1: "(max-width: 768px) 100vw, 54vw",
  2: "(max-width: 768px) 50vw, 35vw",
  3: "(max-width: 768px) 33vw, 11vw",
};

const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: "recommended", label: "RECOMMENDED" },
  { value: "newest", label: "NEWEST" },
  { value: "price-asc", label: "LOWEST PRICE" },
  { value: "price-desc", label: "HIGHEST PRICE" },
];

interface Props {
  products: Product[];
  /** Accessible heading. Rendered visibly only when `titleVisible`. */
  title?: string;
  titleVisible?: boolean;
  /** Filters button and view switch (both float at the viewport edges). */
  showControls?: boolean;
  emptyMessage?: string;
}

function cardWidth(view: View, index: number): string {
  if (view === 1) return cn("w-full", HERO);
  if (view === 3) return cn("w-[calc((100%-16px)/3)]", SIX);
  // Five-card cycle: hero, pair, pair.
  return index % 5 === 0 ? cn("w-[calc((100%-8px)/2)]", HERO) : cn("w-[calc((100%-8px)/2)]", PAIR);
}

export function ProductGrid({
  products,
  title,
  titleVisible = true,
  showControls = true,
  emptyMessage = "NO PRODUCTS FOUND",
}: Props) {
  const [view, setView] = useState<View>(2);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<Sort>("recommended");
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of products) for (const c of p.colors) if (!map.has(c.name)) map.set(c.name, c.hex);
    return [...map.entries()].map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) for (const s of p.sizes) set.add(s);
    return [...set];
  }, [products]);

  const visible = useMemo(() => {
    let list = products.filter(
      (p) =>
        (colors.length === 0 || p.colors.some((c) => colors.includes(c.name))) &&
        (sizes.length === 0 || p.sizes.some((s) => sizes.includes(s))),
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "newest") list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return list;
  }, [products, colors, sizes, sort]);

  const activeFilters = colors.length + sizes.length + (sort !== "recommended" ? 1 : 0);

  const toggle = (list: string[], value: string, set: (v: string[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const clear = () => {
    setColors([]);
    setSizes([]);
    setSort("recommended");
  };

  return (
    <section>
      {title && (
        <h1 className={cn("text-2xs uppercase", titleVisible ? "mb-8 text-muted" : "sr-only")}>
          {title}
        </h1>
      )}

      {showControls && (
        <>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="fixed left-(--chrome-x) top-14 z-30 flex h-8 items-center text-chrome uppercase hover:underline hover:underline-offset-4 md:top-(--chrome-top)"
          >
            Filters{activeFilters > 0 && ` (${activeFilters})`}
          </button>

          <div
            role="group"
            aria-label="Grid density"
            className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper px-(--chrome-x) pb-2 pt-2 text-chrome uppercase md:inset-x-auto md:bottom-8 md:left-(--chrome-x) md:border-0 md:bg-transparent md:p-0"
          >
            <p className="pl-2 text-muted">View</p>
            <div className="mt-1 flex gap-5">
              {VIEWS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-label={`View ${v}`}
                  aria-pressed={view === v}
                  className={cn(
                    "-mx-1.5 h-8 w-6 transition-opacity",
                    view === v ? "font-normal opacity-100" : "opacity-40 hover:opacity-100",
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {visible.length === 0 ? (
        <p className="py-24 text-center text-2xs uppercase text-muted">{emptyMessage}</p>
      ) : (
        <ul className={cn("flex flex-wrap justify-center", GAP_CLASS[view])}>
          {visible.map((p, i) => (
            <li key={p.id} className={cardWidth(view, i)}>
              <ProductCard product={p} sizes={VIEW_SIZES[view]} priority={i < 3} dense={view === 3} />
            </li>
          ))}
        </ul>
      )}

      {/* Filters drawer */}
      <div className={cn("fixed inset-0 z-50", !filtersOpen && "pointer-events-none")} aria-hidden={!filtersOpen}>
        <div
          onClick={() => setFiltersOpen(false)}
          className={cn(
            "absolute inset-0 bg-paper/60 backdrop-blur-[2px] transition-opacity duration-500",
            filtersOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className={cn(
            "absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-paper transition-transform duration-500 ease-out-expo",
            filtersOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-(--chrome-x) pt-(--chrome-top)">
            <h2 className="text-chrome uppercase">Filters</h2>
            <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-(--chrome-x) pb-6 pt-10">
            <fieldset>
              <legend className="mb-4 text-2xs uppercase">Sort by</legend>
              <ul className="space-y-3 text-2xs uppercase">
                {SORT_OPTIONS.map((o) => (
                  <li key={o.value}>
                    <button
                      type="button"
                      onClick={() => setSort(o.value)}
                      className="flex items-center gap-3"
                      aria-pressed={sort === o.value}
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 items-center justify-center border border-ink",
                          sort === o.value && "bg-ink text-paper",
                        )}
                      >
                        {sort === o.value && <CheckIcon className="h-3 w-3" />}
                      </span>
                      {o.label}
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>

            {availableColors.length > 1 && (
              <fieldset className="mt-10">
                <legend className="mb-4 text-2xs uppercase">Colour</legend>
                <ul className="space-y-3 text-2xs uppercase">
                  {availableColors.map((c) => (
                    <li key={c.name}>
                      <button
                        type="button"
                        onClick={() => toggle(colors, c.name, setColors)}
                        aria-pressed={colors.includes(c.name)}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={cn(
                            "h-4 w-4 border",
                            colors.includes(c.name) ? "border-ink ring-1 ring-ink ring-offset-1" : "border-black/10",
                          )}
                          style={{ backgroundColor: c.hex }}
                        />
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </fieldset>
            )}

            {availableSizes.length > 1 && (
              <fieldset className="mt-10">
                <legend className="mb-4 text-2xs uppercase">Size</legend>
                <ul className="flex flex-wrap gap-2">
                  {availableSizes.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => toggle(sizes, s, setSizes)}
                        aria-pressed={sizes.includes(s)}
                        className={cn(
                          "min-w-11 border px-3 py-2 text-2xs uppercase",
                          sizes.includes(s) ? "border-ink bg-ink text-paper" : "border-line hover:border-ink",
                        )}
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </fieldset>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-line p-4">
            <button type="button" onClick={clear} className="btn-secondary">
              Clear
            </button>
            <button type="button" onClick={() => setFiltersOpen(false)} className="btn-primary">
              View results ({visible.length})
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
