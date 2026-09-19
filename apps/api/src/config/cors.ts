/**
 * Browser origins allowed by CORS, from FRONTEND_ORIGIN. Each entry is an
 * exact origin (`https://shop.example.com`) or a pattern with `*` standing
 * for any run of characters (`https://*.vercel.app` covers every preview
 * deployment). Patterns become anchored, case-insensitive regular expressions,
 * which the `cors` package matches against the request's Origin header.
 */
export function allowedOrigins(entries: string[]): (string | RegExp)[] {
  return entries.map((entry) => {
    if (!entry.includes("*")) return entry;
    const pattern = entry
      .split("*")
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join(".*");
    return new RegExp(`^${pattern}$`, "i");
  });
}
