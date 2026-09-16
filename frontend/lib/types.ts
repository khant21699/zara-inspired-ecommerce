export type SectionSlug = "woman" | "man" | "kids";

export type Shape =
  | "dress"
  | "top"
  | "tee"
  | "shirt"
  | "knit"
  | "jacket"
  | "coat"
  | "trousers"
  | "skirt"
  | "shoe"
  | "bag"
  | "hat"
  | "perfume"
  | "onesie";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  section: SectionSlug;
  category: string;
  price: number;
  compareAt?: number;
  colors: ProductColor[];
  sizes: string[];
  description: string;
  composition: string;
  ref: string;
  /** Real image URLs. When empty, a generated studio placeholder is rendered. */
  images: string[];
  shape: Shape;
  tone: number;
  isNew: boolean;
  isBestSeller: boolean;
}

export interface Category {
  slug: string;
  name: string;
  /** Virtual categories are computed from product flags instead of a category match. */
  virtual?: "new-in" | "sale" | "best-sellers";
  group?: number;
}

export interface Section {
  slug: SectionSlug;
  name: string;
  categories: Category[];
}
