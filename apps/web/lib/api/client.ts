/**
 * Thin fetch wrapper for the storefront API (apps/api). Works in server
 * components (with Next's cache options) and in the browser.
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

type Query = Record<string, string | number | undefined>;

export async function apiFetch<T>(path: string, query: Query = {}, init: RequestInit = {}): Promise<T> {
  const url = new URL(API_URL + path);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
  const res = await fetch(url, { ...init, headers: { accept: "application/json", ...init.headers } });
  if (!res.ok) {
    let code = "HTTP_ERROR";
    let message = `${res.status} ${res.statusText}`;
    try {
      const body = (await res.json()) as { error?: { code?: string; message?: string } };
      code = body.error?.code ?? code;
      message = body.error?.message ?? message;
    } catch {
      // non-JSON error body; keep the status text
    }
    throw new ApiError(res.status, code, message);
  }
  return (await res.json()) as T;
}
