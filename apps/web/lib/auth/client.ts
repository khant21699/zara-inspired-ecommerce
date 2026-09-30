import "server-only";
import { headers } from "next/headers";
import { createAuthClient } from "better-auth/client";
import { API_URL } from "@/lib/api/client";

/**
 * Better Auth client for the storefront API's `/auth` routes.
 *
 * It runs on the Next server only. The browser never talks to the auth API
 * and never holds a token: sign-in happens in a server action, which puts the
 * session token in an HttpOnly cookie (lib/auth/cookie.ts), and every later
 * call reads that cookie server-side and sends it as a bearer token.
 */
export const authClient = createAuthClient({ baseURL: `${API_URL}/auth` });

/**
 * This app's own origin, taken from the incoming request.
 *
 * Better Auth refuses state-changing calls whose `Origin` is missing or
 * untrusted (its CSRF guard). A server-to-server call sends no Origin of its
 * own, so we pass the origin the visitor is actually on; it has to be listed
 * in the API's FRONTEND_ORIGIN, which is exactly the check we want.
 */
export async function siteOrigin(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("origin");
  if (forwarded) return forwarded;
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/** Fetch options for an auth call: this app's origin, plus the session token when there is one. */
export async function authFetchOptions(token?: string | null) {
  return {
    headers: {
      origin: await siteOrigin(),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
}
