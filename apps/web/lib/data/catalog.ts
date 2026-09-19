import type { Category, Section, SectionSlug } from "../types";

const HEAD: Category[] = [
  { slug: "new-in", name: "NEW IN", virtual: "new-in", group: 0 },
  { slug: "sale", name: "SALE", virtual: "sale", group: 0 },
  { slug: "best-sellers", name: "BEST SELLERS", virtual: "best-sellers", group: 0 },
];

export const SECTIONS: Section[] = [
  {
    slug: "woman",
    name: "WOMAN",
    categories: [
      ...HEAD,
      { slug: "dresses", name: "DRESSES", group: 1 },
      { slug: "tops", name: "TOPS", group: 1 },
      { slug: "t-shirts", name: "T-SHIRTS", group: 1 },
      { slug: "shirts", name: "SHIRTS", group: 1 },
      { slug: "jackets", name: "JACKETS", group: 1 },
      { slug: "coats", name: "COATS", group: 1 },
      { slug: "blazers", name: "BLAZERS", group: 1 },
      { slug: "knitwear", name: "KNITWEAR", group: 1 },
      { slug: "trousers", name: "TROUSERS", group: 1 },
      { slug: "jeans", name: "JEANS", group: 1 },
      { slug: "skirts", name: "SKIRTS", group: 1 },
      { slug: "shoes", name: "SHOES", group: 2 },
      { slug: "bags", name: "BAGS", group: 2 },
      { slug: "accessories", name: "ACCESSORIES", group: 2 },
      { slug: "perfumes", name: "PERFUMES", group: 2 },
    ],
  },
  {
    slug: "man",
    name: "MAN",
    categories: [
      ...HEAD,
      { slug: "jackets", name: "JACKETS", group: 1 },
      { slug: "coats", name: "COATS", group: 1 },
      { slug: "blazers", name: "BLAZERS", group: 1 },
      { slug: "shirts", name: "SHIRTS", group: 1 },
      { slug: "t-shirts", name: "T-SHIRTS", group: 1 },
      { slug: "sweatshirts", name: "SWEATSHIRTS", group: 1 },
      { slug: "knitwear", name: "KNITWEAR", group: 1 },
      { slug: "trousers", name: "TROUSERS", group: 1 },
      { slug: "jeans", name: "JEANS", group: 1 },
      { slug: "shoes", name: "SHOES", group: 2 },
      { slug: "bags", name: "BAGS", group: 2 },
      { slug: "accessories", name: "ACCESSORIES", group: 2 },
      { slug: "perfumes", name: "PERFUMES", group: 2 },
    ],
  },
  {
    slug: "kids",
    name: "KIDS",
    categories: [
      ...HEAD,
      { slug: "girl", name: "GIRL | 6-14 YEARS", group: 1 },
      { slug: "boy", name: "BOY | 6-14 YEARS", group: 1 },
      { slug: "baby-girl", name: "BABY GIRL | 3 MONTHS-4 YEARS", group: 1 },
      { slug: "baby-boy", name: "BABY BOY | 3 MONTHS-4 YEARS", group: 1 },
      { slug: "shoes", name: "SHOES", group: 2 },
      { slug: "accessories", name: "ACCESSORIES", group: 2 },
    ],
  },
];

export const SECTION_SLUGS = SECTIONS.map((s) => s.slug);

export function isSectionSlug(value: string): value is SectionSlug {
  return (SECTION_SLUGS as string[]).includes(value);
}

export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export function getCategory(section: string, category: string): Category | undefined {
  return getSection(section)?.categories.find((c) => c.slug === category);
}

/** Secondary links shown at the bottom of the side menu. */
export const MENU_LINKS = [
  { name: "GIFT CARD", href: "/gift-card" },
  { name: "STORE LOCATOR", href: "/stores" },
  { name: "PRE-OWNED", href: "/pre-owned" },
  { name: "JOIN LIFE", href: "/join-life" },
  { name: "NEWSLETTER", href: "/newsletter" },
  { name: "HELP", href: "/help" },
  { name: "MY ACCOUNT", href: "/account" },
];
