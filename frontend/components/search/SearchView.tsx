"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { searchProducts } from "@/lib/data/products";
import { SECTIONS } from "@/lib/data/catalog";
import type { SectionSlug } from "@/lib/types";
import { cn } from "@/lib/format";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CloseIcon } from "@/components/ui/Icons";

const TRENDING = ["Dresses", "Jackets", "Jeans", "Coats", "Bags", "Sneakers", "Knitwear", "Perfumes"];

export function SearchView() {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<SectionSlug | "all">("all");
  const deferred = useDeferredValue(query);
  const results = searchProducts(deferred, section);
  const hasQuery = deferred.trim().length > 0;

  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 pt-6 md:px-6 md:pt-12">
        <div className="relative">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            aria-label="Search"
            className="input-line pr-8 text-base uppercase md:text-xl"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-6 flex gap-6 text-2xs uppercase">
          {(["all", ...SECTIONS.map((s) => s.slug)] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSection(s)}
              aria-pressed={section === s}
              className={cn("pb-1", section === s ? "border-b border-ink font-bold" : "text-muted hover:text-ink")}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>

        {!hasQuery && (
          <div className="mt-14">
            <h2 className="text-2xs uppercase text-muted">Trending</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-2xs uppercase">
              {TRENDING.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    onClick={() => setQuery(t)}
                    className="hover:underline hover:underline-offset-4"
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-14 text-2xs uppercase text-muted">
              Or browse{" "}
              {SECTIONS.map((s, i) => (
                <span key={s.slug}>
                  <Link href={`/${s.slug}/new-in`} className="u-link text-ink">
                    {s.name}
                  </Link>
                  {i < SECTIONS.length - 1 && " · "}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>

      {hasQuery && (
        <div className="mt-10">
          <ProductGrid
            products={results}
            title={`${results.length} ${results.length === 1 ? "result" : "results"} for "${deferred.trim()}"`}
            emptyMessage={`No results for "${deferred.trim()}". Try another term.`}
          />
        </div>
      )}
    </div>
  );
}
