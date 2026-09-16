export function formatPrice(value: number): string {
  return `$ ${value.toFixed(2)}`;
}

export function discountPercent(price: number, compareAt: number): number {
  return Math.round((1 - price / compareAt) * 100);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
