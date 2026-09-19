import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchNewIn } from "@/lib/api/products";
import { SECTIONS } from "@/lib/data/catalog";
import { RailControls } from "./RailControls";

/**
 * The paper card that closes the home deck: the newest products across the
 * three sections in one horizontal rail of 2:3 cards, with a link into each
 * section's NEW IN at the head. Renders nothing while the API is unreachable.
 */
export async function NewIn() {
  const newest = await fetchNewIn(
    SECTIONS.map((s) => s.slug),
    5,
  );
  // One of each name: the sections share basics, and a rail of two ANKLE BOOTS reads as a glitch.
  const seen = new Set<string>();
  const products = newest
    .filter((p) => !seen.has(p.name) && seen.add(p.name))
    .slice(0, 12);
  if (products.length === 0) return null;

  return (
    <section
      data-slide="light"
      aria-labelledby="new-in"
      className="relative bg-paper pb-16 pt-(--chrome-top) text-ink md:pb-20"
    >
      {/* Inside the listing column on desktop, so the rail never runs under the chrome. */}
      <div className="md:mx-auto md:w-(--page-col)">
        <div className="flex flex-wrap items-center gap-x-6 px-(--chrome-x) text-chrome uppercase md:gap-x-10 md:px-0">
          <h2 id="new-in">New in</h2>
          <nav
            aria-label="New in by section"
            className="flex gap-x-5 text-muted md:gap-x-8"
          >
            {SECTIONS.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}/new-in`}
                className="hover:text-ink hover:underline hover:underline-offset-4"
              >
                {s.name}
              </Link>
            ))}
          </nav>
          <RailControls railId="new-in-rail" />
        </div>

        <ul
          id="new-in-rail"
          aria-label="Newest products"
          className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-x-2 overflow-x-auto px-(--chrome-x) scroll-px-(--chrome-x) md:mt-10 md:gap-x-6 md:px-0 md:scroll-px-0"
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="w-[calc((100%-8px)/2.2)] shrink-0 snap-start md:w-[calc((100%-4*24px)/4.5)]"
            >
              <ProductCard
                product={product}
                compact
                sizes="(max-width: 768px) 45vw, 16vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
