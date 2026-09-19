import type { Product, ProductColor, SectionSlug, Shape } from "../types";
import { ApiError, apiFetch } from "./client";

/* ---- API shapes (see apps/api/openapi.json) ---- */

interface ApiColour {
  name: string;
  hex: string;
  images: string[];
  sizes: { size: string; inStock: boolean }[];
}

interface ApiProduct {
  id: string;
  slug: string;
  name: string;
  ref: string;
  section: SectionSlug;
  category: string;
  priceCents: number;
  compareAtCents: number | null;
  isNew: boolean;
  isBestSeller: boolean;
  sizes: string[];
  images: string[];
  colours: ApiColour[];
  description?: string;
  composition?: string;
}

interface ListResponse {
  items: ApiProduct[];
  total: number;
  page: number;
  limit: number;
}

/* ---- mapping to the web Product ---- */

/** Silhouette used by the studio placeholder when a product has no images. */
const SHAPE_BY_CATEGORY: Record<string, Shape> = {
  dresses: "dress",
  tops: "top",
  "t-shirts": "tee",
  shirts: "shirt",
  knitwear: "knit",
  sweatshirts: "knit",
  jackets: "jacket",
  blazers: "jacket",
  coats: "coat",
  trousers: "trousers",
  jeans: "trousers",
  skirts: "skirt",
  shoes: "shoe",
  bags: "bag",
  accessories: "hat",
  perfumes: "perfume",
  girl: "dress",
  boy: "tee",
  "baby-girl": "onesie",
  "baby-boy": "onesie",
};

function hash(s: string): number {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return Math.abs(h);
}

export function toProduct(p: ApiProduct): Product {
  const colors: ProductColor[] = p.colours.map((c) => ({
    name: c.name,
    hex: c.hex,
    images: c.images,
    sizes: c.sizes,
  }));
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    section: p.section,
    category: p.category,
    price: p.priceCents / 100,
    compareAt: p.compareAtCents === null ? undefined : p.compareAtCents / 100,
    colors,
    sizes: p.sizes,
    description: p.description ?? "",
    composition: p.composition ?? "",
    ref: p.ref,
    images: p.images,
    shape: SHAPE_BY_CATEGORY[p.category] ?? "top",
    tone: hash(p.slug) % 5,
    isNew: p.isNew,
    isBestSeller: p.isBestSeller,
  };
}

/* ---- calls ---- */

const REVALIDATE = 300; // seconds; listings and products change rarely

/** Every product in a section/category (the grid filters and sorts client-side). */
export async function fetchProducts(section: SectionSlug, category: string): Promise<Product[]> {
  const items: ApiProduct[] = [];
  let page = 1;
  for (;;) {
    const res = await apiFetch<ListResponse>(
      "/products",
      { section, category, page, limit: 60 },
      { next: { revalidate: REVALIDATE } },
    );
    items.push(...res.items);
    if (items.length >= res.total || res.items.length === 0) break;
    page += 1;
  }
  return items.map(toProduct);
}

/** One product by slug, or null when the API has no live product for it. */
export async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const p = await apiFetch<ApiProduct>(`/products/${slug}`, {}, { next: { revalidate: REVALIDATE } });
    return toProduct(p);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function fetchRelated(slug: string, limit = 8): Promise<Product[]> {
  const res = await apiFetch<{ items: ApiProduct[] }>(
    `/products/${slug}/related`,
    { limit },
    { next: { revalidate: REVALIDATE } },
  );
  return res.items.map(toProduct);
}

/** Live search from the browser; never cached. */
export async function searchProducts(q: string, section?: SectionSlug, signal?: AbortSignal): Promise<Product[]> {
  const res = await apiFetch<{ items: ApiProduct[] }>("/search", { q, section, limit: 60 }, { cache: "no-store", signal });
  return res.items.map(toProduct);
}

/** First product of a category, for the menu's image rail. */
export async function fetchFirstProduct(section: SectionSlug, category: string): Promise<Product | null> {
  const res = await apiFetch<ListResponse>(
    "/products",
    { section, category, limit: 1 },
    { next: { revalidate: 3600 } },
  );
  const first = res.items[0];
  return first ? toProduct(first) : null;
}

/* ---- home rail ---- */

/**
 * The newest products across the three sections, interleaved (woman, man,
 * kids, woman, ...) for the home's NEW IN rail. Resilient: an unreachable API
 * gives an empty rail rather than a broken home.
 */
export async function fetchNewIn(sections: SectionSlug[], perSection: number): Promise<Product[]> {
  const columns = await Promise.all(
    sections.map(async (section) => {
      try {
        const res = await apiFetch<ListResponse>(
          "/products",
          { section, category: "new-in", sort: "newest", limit: perSection },
          { next: { revalidate: REVALIDATE } },
        );
        return res.items.map(toProduct);
      } catch {
        return [];
      }
    }),
  );
  const rail: Product[] = [];
  for (let i = 0; i < perSection; i += 1) {
    for (const column of columns) if (column[i]) rail.push(column[i]);
  }
  return rail;
}

/* ---- menu rail ---- */

export interface RailSlot {
  category: { slug: string; name: string };
  product: Product;
}
export type MenuRail = Record<SectionSlug, RailSlot[]>;

/**
 * One representative product per menu rail slot (NEW IN, then the first
 * four real categories), per section. Resilient: an unreachable API leaves
 * the rail empty rather than breaking every page.
 */
export async function fetchMenuRail(
  sections: { slug: SectionSlug; categories: { slug: string; name: string; virtual?: string }[] }[],
): Promise<MenuRail> {
  const rail = { woman: [], man: [], kids: [] } as MenuRail;
  await Promise.all(
    sections.map(async (section) => {
      const slots = [
        section.categories.find((c) => c.slug === "new-in"),
        ...section.categories.filter((c) => !c.virtual).slice(0, 4),
      ].filter((c): c is NonNullable<typeof c> => c !== undefined);
      const seen = new Set<string>();
      for (const category of slots) {
        try {
          const product = await fetchFirstProduct(section.slug, category.slug);
          if (!product || seen.has(product.slug)) continue;
          seen.add(product.slug);
          rail[section.slug].push({ category: { slug: category.slug, name: category.name }, product });
        } catch {
          // leave the slot empty
        }
      }
    }),
  );
  return rail;
}
