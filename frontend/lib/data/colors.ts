export const COLORS: Record<string, string> = {
  black: "#161616",
  white: "#f6f6f4",
  ecru: "#e9e2d3",
  cream: "#f1ead8",
  beige: "#d6c6ad",
  sand: "#cdb896",
  camel: "#b8895b",
  taupe: "#a89a8a",
  stone: "#b8b0a2",
  oyster: "#d8d0c4",
  grey: "#8a8a8a",
  "light grey": "#c9c9c9",
  charcoal: "#3a3a3a",
  navy: "#1f2a44",
  "dark blue": "#28405e",
  "mid blue": "#6a8fbf",
  "light blue": "#a9c1dc",
  denim: "#5c7ea3",
  indigo: "#2b3a67",
  brown: "#5a3e2b",
  chocolate: "#40281c",
  olive: "#6b6b4a",
  khaki: "#8a7f5c",
  green: "#3f6b4f",
  "bottle green": "#1f3d2e",
  burgundy: "#5b1f2b",
  red: "#b3202a",
  pink: "#e8b9c4",
  "dusty pink": "#c99a9d",
  lilac: "#b9a7cf",
  mustard: "#c69a3a",
  orange: "#d8763a",
  silver: "#c0c0c0",
  gold: "#c8a951",
};

/** Relative luminance (0..1) of a hex color, used to pick a contrasting backdrop. */
export function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}
