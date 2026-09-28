/**
 * Browser origins allowed by CORS (and trusted by Better Auth), from
 * FRONTEND_ORIGIN. Each entry is an exact origin (`https://shop.example.com`)
 * or a pattern with `*` standing for any run of characters
 * (`https://*.vercel.app` covers every preview deployment).
 */

/**
 * Entries the way browsers send the Origin header: trimmed, no path or
 * trailing slash, lower-case. A pasted URL still matches.
 */
export function normalizeOrigins(entries: string[]): string[] {
  return entries.map((raw) => raw.trim().replace(/\/+$/, "").toLowerCase()).filter(Boolean);
}

/**
 * The same list for the `cors` package: exact strings, and anchored
 * case-insensitive regular expressions for the `*` patterns.
 */
export function allowedOrigins(entries: string[]): (string | RegExp)[] {
  return normalizeOrigins(entries).map((entry) => {
    if (!entry.includes("*")) return entry;
    const pattern = entry
      .split("*")
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join(".*");
    return new RegExp(`^${pattern}$`, "i");
  });
}
