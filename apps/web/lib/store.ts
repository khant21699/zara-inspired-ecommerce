import { useSyncExternalStore } from "react";
import type { Product } from "./types";

/**
 * The bag and wishlist keep a snapshot of the product as it was when added
 * (the catalogue lives in the API now, so nothing can be looked up locally).
 */
export interface BagItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  qty: number;
}

export interface StoreState {
  bag: BagItem[];
  wishlist: Product[];
  cookieConsent: "accepted" | "rejected" | null;
  /** Last item added to the bag; drives the mini-bag toast. Not persisted. */
  lastAdded: { product: Product; size: string; at: number } | null;
}

// v2: items carry product snapshots instead of ids into the static catalogue.
const STORAGE_KEY = "zara-clone:v2";
const EMPTY: StoreState = { bag: [], wishlist: [], cookieConsent: null, lastAdded: null };

let state: StoreState = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): StoreState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoreState>;
    return {
      bag: Array.isArray(parsed.bag) ? parsed.bag : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      cookieConsent: parsed.cookieConsent ?? null,
      lastAdded: null,
    };
  } catch {
    return null;
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const stored = readStorage();
  if (stored) state = stored;
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    const next = readStorage();
    if (next) {
      state = { ...next, lastAdded: state.lastAdded };
      emit();
    }
  });
}

function persist() {
  try {
    const { bag, wishlist, cookieConsent } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ bag, wishlist, cookieConsent }));
  } catch {
    // Storage may be unavailable (private mode, quota); state still lives in memory.
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function update(patch: Partial<StoreState>) {
  state = { ...state, ...patch };
  persist();
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  hydrate();
  return state;
}

function getServerSnapshot() {
  return EMPTY;
}

export function useStore(): StoreState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True once rendering on the client after hydration; false during SSR/hydration. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function bagCount(bag: BagItem[]): number {
  return bag.reduce((n, item) => n + item.qty, 0);
}

export const store = {
  addToBag(product: Product, size: string, color: string) {
    const id = `${product.slug}::${color}::${size}`;
    const existing = state.bag.find((item) => item.id === id);
    const bag = existing
      ? state.bag.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
      : [...state.bag, { id, product, size, color, qty: 1 }];
    update({ bag, lastAdded: { product, size, at: Date.now() } });
  },
  setQty(id: string, qty: number) {
    const bag =
      qty <= 0
        ? state.bag.filter((item) => item.id !== id)
        : state.bag.map((item) => (item.id === id ? { ...item, qty } : item));
    update({ bag });
  },
  removeFromBag(id: string) {
    update({ bag: state.bag.filter((item) => item.id !== id) });
  },
  clearBag() {
    update({ bag: [] });
  },
  toggleWishlist(product: Product) {
    const wishlist = state.wishlist.some((p) => p.slug === product.slug)
      ? state.wishlist.filter((p) => p.slug !== product.slug)
      : [...state.wishlist, product];
    update({ wishlist });
  },
  setCookieConsent(cookieConsent: StoreState["cookieConsent"]) {
    update({ cookieConsent });
  },
  clearLastAdded() {
    if (state.lastAdded) update({ lastAdded: null });
  },
};
