import { z } from "zod";

export const SECTIONS = ["woman", "man", "kids"] as const;
export type Section = (typeof SECTIONS)[number];

/** Comma-separated list query param → string[] (upper-cased, since colours and sizes are stored that way). */
const csv = z
  .string()
  .optional()
  .transform((v) => (v ? v.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean) : []));

export const listQuerySchema = z.object({
  section: z.enum(SECTIONS),
  category: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  sort: z.enum(["recommended", "newest", "price-asc", "price-desc"]).default("recommended"),
  colours: csv,
  sizes: csv,
  page: z.coerce.number().int().min(1).default(1),
  // Listing view 2 shows five-card cycles, so the default page is a multiple of five.
  limit: z.coerce.number().int().min(1).max(60).default(30),
});
export type ListQuery = z.infer<typeof listQuerySchema>;

export const searchQuerySchema = z.object({
  q: z.string().trim().min(1).max(80),
  section: z.enum(SECTIONS).optional(),
  limit: z.coerce.number().int().min(1).max(60).default(30),
});
export type SearchQuery = z.infer<typeof searchQuerySchema>;

export const relatedQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(24).default(8),
});

export const slugSchema = z.string().regex(/^[a-z0-9-]+$/);

export interface ColourSize {
  size: string;
  inStock: boolean;
}

export interface Colour {
  name: string;
  hex: string;
  images: string[];
  sizes: ColourSize[];
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  ref: string;
  section: Section;
  category: string;
  priceCents: number;
  compareAtCents: number | null;
  isNew: boolean;
  isBestSeller: boolean;
  colours: Colour[];
  /** Distinct sizes across colours, in display order. */
  sizes: string[];
  /** The first colour's images, for cards. */
  images: string[];
}

export interface ProductDetail extends ProductSummary {
  description: string;
  composition: string;
}
