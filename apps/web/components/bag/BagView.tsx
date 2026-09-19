"use client";

import Link from "next/link";
import { bagCount, store, useHydrated, useStore } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/ui/Icons";

const FREE_SHIPPING_THRESHOLD = 50;

export function BagView() {
  const hydrated = useHydrated();
  const { bag } = useStore();

  const lines = bag.map((item) => ({ item, product: item.product }));

  const count = bagCount(bag);
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.item.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 5.95;

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-2xs uppercase">Shopping bag ({count})</h1>
        <Link href="/wishlist" className="text-2xs uppercase u-link">
          Wishlist
        </Link>
      </div>

      {!hydrated ? null : lines.length === 0 ? (
        <div className="flex min-h-[50svh] flex-col items-center justify-center text-center">
          <p className="text-2xs uppercase">Your shopping bag is empty</p>
          <p className="mt-3 max-w-xs text-xs text-muted">
            Items you add will appear here. They are saved on this device.
          </p>
          <Link href="/woman/new-in" className="btn-primary mt-8 min-w-[220px]">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 gap-16 md:grid md:grid-cols-[minmax(0,1fr)_340px] lg:grid-cols-[minmax(0,1fr)_400px]">
          <ul className="divide-y divide-line border-t border-line">
            {lines.map(({ item, product }) => (
              <li key={item.id} className="flex gap-4 py-5 md:gap-6">
                <Link
                  href={`/product/${product.slug}`}
                  className="relative aspect-[2/3] w-24 shrink-0 overflow-hidden bg-canvas md:w-32"
                >
                  <ProductArt
                    product={product}
                    colorIndex={Math.max(0, product.colors.findIndex((c) => c.name === item.color))}
                    sizes="128px"
                    className="absolute inset-0"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 text-2xs uppercase">
                      <Link href={`/product/${product.slug}`} className="block hover:underline hover:underline-offset-4">
                        {product.name}
                      </Link>
                      <p className="mt-1 text-muted">
                        {item.color} | {product.ref}
                      </p>
                      <p className="mt-1 text-muted">Size {item.size}</p>
                    </div>
                    <p className="shrink-0 text-2xs">{formatPrice(product.price * item.qty)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-line" aria-label="Quantity">
                      <button
                        type="button"
                        onClick={() => store.setQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                        className="p-2"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-2xs">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => store.setQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                        className="p-2"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => store.removeFromBag(item.id)}
                      className="flex items-center gap-1.5 text-2xs uppercase hover:underline hover:underline-offset-4"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="mt-10 md:sticky md:top-(--chrome-top) md:mt-0 md:self-start">
            <dl className="space-y-3 border-t border-line pt-5 text-2xs uppercase">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-bold">
                <dt>Total</dt>
                <dd>{formatPrice(subtotal + shipping)}</dd>
              </div>
            </dl>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="mt-3 text-2xs uppercase text-muted">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free standard shipping
              </p>
            )}
            <Link href="/checkout" className="btn-primary mt-6 w-full">
              Continue
            </Link>
            <p className="mt-4 text-2xs uppercase text-muted">
              Checkout requires the payment service · coming soon
            </p>
            <button
              type="button"
              onClick={() => store.clearBag()}
              className="mt-6 text-2xs uppercase u-link"
            >
              Empty bag
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
