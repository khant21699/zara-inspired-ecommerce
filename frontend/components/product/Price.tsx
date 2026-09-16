import type { Product } from "@/lib/types";
import { discountPercent, formatPrice } from "@/lib/format";
import { cn } from "@/lib/format";

/**
 * Price line. A reduced item shows the original price struck through in ink,
 * then the percentage and current price together in a black chip.
 */
interface Props {
  product: Product;
  /** Six-up cards: single line, and on phones only the chip is shown. */
  dense?: boolean;
  /** sm = 11px listing, md = 13px product page. */
  size?: "sm" | "md";
  className?: string;
}

export function Price({ product, dense = false, size = "sm", className }: Props) {
  const text = size === "md" ? "text-chrome" : "text-2xs";
  if (product.compareAt) {
    return (
      <p className={cn("flex items-center gap-x-1 whitespace-nowrap", text, className)}>
        <s className={cn(dense && "hidden md:inline")}>{formatPrice(product.compareAt)}</s>
        <span className="whitespace-pre bg-ink px-1 text-paper">
          -{discountPercent(product.price, product.compareAt)}%  {formatPrice(product.price)}
        </span>
      </p>
    );
  }
  return <p className={cn(text, className)}>{formatPrice(product.price)}</p>;
}
