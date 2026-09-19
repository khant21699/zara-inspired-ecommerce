import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

interface Props {
  title: string;
  products: Product[];
}

/** Horizontal scroller of product cards ("You may also like"). */
export function ProductRail({ title, products }: Props) {
  if (products.length === 0) return null;
  return (
    <section className="mt-20 md:mt-28">
      <h2 className="px-4 pb-4 text-2xs uppercase md:px-6">{title}</h2>
      <ul className="no-scrollbar flex gap-[2px] overflow-x-auto px-4 md:px-6">
        {products.map((p) => (
          <li key={p.id} className="w-[46vw] shrink-0 snap-start sm:w-[30vw] md:w-[22vw] lg:w-[17vw]">
            <ProductCard product={p} compact sizes="(max-width: 768px) 46vw, 17vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
