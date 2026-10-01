import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { authClient, authFetchOptions } from "./client";
import { SESSION_COOKIE } from "./cookie";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date | string;
}

export interface Session {
  user: SessionUser;
  session: { id: string; expiresAt: Date | string };
}

/** The session token this browser sent, straight from the HttpOnly cookie. */
export async function getSessionToken(): Promise<string | null> {
  return (await cookies()).get(SESSION_COOKIE)?.value ?? null;
}

/**
 * The signed-in user, or null. Asks the API once per request (React `cache`),
 * so the layout, the page and any component can call it freely.
 *
 * A token the API no longer knows (signed out elsewhere, expired, or the
 * secret rotated) resolves to null; the stale cookie is cleared on the next
 * sign-in or sign-out, since a server component cannot write cookies.
 */
export const getSession = cache(async (): Promise<Session | null> => {
  const token = await getSessionToken();
  if (!token) return null;
  try {
    const { data } = await authClient.getSession({
      fetchOptions: await authFetchOptions(token),
    });
    return (data as Session | null) ?? null;
  } catch {
    // The API is unreachable: treat the visitor as signed out rather than
    // failing the page. Catalogue pages keep rendering.
    return null;
  }
});

/** The session, or a redirect to the log-in page with a way back. */
export async function requireSession(next: string): Promise<Session> {
  const session = await getSession();
  if (!session) redirect(`/login?next=${encodeURIComponent(next)}`);
  return session;
}

/** `Authorization` header for calling protected API routes on the user's behalf. */
export async function authorizationHeader(): Promise<Record<string, string>> {
  const token = await getSessionToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
