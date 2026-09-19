"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { searchProducts } from "@/lib/api/products";
import { SECTIONS } from "@/lib/data/catalog";
import type { Product, SectionSlug } from "@/lib/types";
import { cn } from "@/lib/format";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CloseIcon } from "@/components/ui/Icons";

const TRENDING = [
  "Dresses",
  "Jackets",
  "Jeans",
  "Coats",
  "Bags",
  "Sneakers",
  "Knitwear",
  "Perfumes",
];

/** Quiet time after the last keystroke before the API is asked. */
const TYPING_PAUSE = 400;

type Scope = SectionSlug | "all";

/** The last answer, tied to the exact query and scope it was fetched for. */
interface Answer {
  q: string;
  scope: Scope;
  items: Product[];
  failed: boolean;
}

export function SearchView() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<Scope>("all");
  const [answer, setAnswer] = useState<Answer | null>(null);
  // Bumped by Enter, a trending term or a scope switch: deliberate acts that
  // should not wait out the typing pause.
  const [now, setNow] = useState(0);
  const immediate = useRef(false);
  const answered = useRef<string | null>(null); // key of the last successful fetch
  const hasQuery = query.trim().length > 0;

  const searchNow = (next?: string) => {
    immediate.current = true;
    if (next !== undefined) setQuery(next);
    setNow((n) => n + 1);
  };

  // One request per pause in typing. Typing again before it fires cancels
  // the timer; typing while a request is in flight aborts it. Leaving the
  // field does nothing. The same query and scope are never fetched twice in
  // a row.
  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const delay = immediate.current ? 0 : TYPING_PAUSE;
    immediate.current = false;
    const key = `${scope}:${q}`;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      if (answered.current === key) return;
      searchProducts(q, scope === "all" ? undefined : scope, controller.signal)
        .then((items) => {
          answered.current = key;
          setAnswer({ q, scope, items, failed: false });
        })
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError")
            return;
          setAnswer({ q, scope, items: [], failed: true });
        });
    }, delay);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, scope, now]);

  // Results are shown for the query they answer, so the count never describes
  // a different term than the one it was fetched for.
  const shown = hasQuery ? answer : null;

  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 pt-6 md:px-6 md:pt-12">
        <div className="relative">
          <input
            autoFocus
            enterKeyHint="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchNow();
            }}
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
              onClick={() => {
                setScope(s);
                searchNow();
              }}
              aria-pressed={scope === s}
              className={cn(
                "pb-1",
                scope === s
                  ? "border-b border-ink font-bold"
                  : "text-muted hover:text-ink",
              )}
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
                    onClick={() => searchNow(t)}
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

      {shown && (
        <div className="mt-10">
          <ProductGrid
            products={shown.items}
            title={`${shown.items.length} ${shown.items.length === 1 ? "result" : "results"} for "${shown.q}"`}
            emptyMessage={
              shown.failed
                ? "Search is unavailable right now. Try again in a moment."
                : `No results for "${shown.q}". Try another term.`
            }
          />
        </div>
      )}
    </div>
  );
}
