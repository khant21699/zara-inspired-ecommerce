/**
 * The session cookie this app sets. It holds the API session token, is written
 * only by the Next server (server actions and route handlers) and is
 * `HttpOnly`, so no browser script — ours or anyone else's — can read it.
 *
 * Kept free of server-only imports because the proxy reads the name too.
 */
export const SESSION_COOKIE = "zara.session";

/** Matches the API's session lifetime (see apps/api/src/auth/auth.ts). */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE,
} as const;
