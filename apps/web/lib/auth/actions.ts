"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL } from "@/lib/api/client";
import { authClient, authFetchOptions } from "./client";
import { SESSION_COOKIE, sessionCookieOptions } from "./cookie";
import { getSessionToken } from "./session";

/** What a form gets back when something goes wrong. Values come back so the visitor does not retype them; passwords never do. */
export interface AuthFormState {
  message?: string;
  fields?: { name?: string; email?: string; password?: string };
  values?: { name?: string; email?: string };
}

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MIN_PASSWORD = 8; // the API's minimum; keep the two in step
const MAX_PASSWORD = 128;

/** Only same-site paths, so a crafted `next` cannot bounce the visitor off the site. */
function safeNext(value: FormDataEntryValue | null): string {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") ? next : "/account";
}

/**
 * Better Auth's error codes in this site's voice. Anything unmapped is a fault
 * in the service rather than in the visitor's details, so it also goes to the
 * server log: the visitor gets one line, the terminal gets the cause.
 */
function readableError(
  where: string,
  error: { code?: string; status?: number; message?: string } | null,
): string {
  switch (error?.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
      return "Those details do not match an account.";
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "An account already exists with this e-mail. Log in instead.";
    case "PASSWORD_TOO_SHORT":
      return `Use at least ${MIN_PASSWORD} characters.`;
    case "PASSWORD_TOO_LONG":
      return `Use at most ${MAX_PASSWORD} characters.`;
    default:
      if (error?.status === 429)
        return "Too many attempts. Try again in a minute.";
      console.error(`[auth] ${where} failed`, {
        api: API_URL,
        status: error?.status,
        code: error?.code,
        message: error?.message,
      });
      return "We could not complete that. Try again in a moment.";
  }
}

/** Writes the API's session token into this app's own HttpOnly cookie. */
async function keepSession(token: string) {
  (await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions);
}

export async function signInAction(
  _prev: AuthFormState | undefined,
  form: FormData,
): Promise<AuthFormState> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const values = { email };

  if (!EMAIL.test(email))
    return { fields: { email: "Enter a valid e-mail address." }, values };
  if (!password)
    return { fields: { password: "Enter your password." }, values };

  let token: string | null = null;
  const { error } = await authClient.signIn.email(
    { email, password },
    {
      ...(await authFetchOptions()),
      onSuccess: (ctx) => {
        token = ctx.response.headers.get("set-auth-token");
      },
    },
  );

  if (error || !token)
    return { message: readableError("sign-in", error), values };
  await keepSession(token);
  redirect(safeNext(form.get("next")));
}

export async function signUpAction(
  _prev: AuthFormState | undefined,
  form: FormData,
): Promise<AuthFormState> {
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const values = { name, email };

  if (!name) return { fields: { name: "Enter your name." }, values };
  if (!EMAIL.test(email))
    return { fields: { email: "Enter a valid e-mail address." }, values };
  if (password.length < MIN_PASSWORD)
    return {
      fields: { password: `Use at least ${MIN_PASSWORD} characters.` },
      values,
    };
  if (password.length > MAX_PASSWORD)
    return {
      fields: { password: `Use at most ${MAX_PASSWORD} characters.` },
      values,
    };

  let token: string | null = null;
  const { error } = await authClient.signUp.email(
    { name, email, password },
    {
      ...(await authFetchOptions()),
      onSuccess: (ctx) => {
        token = ctx.response.headers.get("set-auth-token");
      },
    },
  );

  if (error || !token)
    return { message: readableError("sign-up", error), values };
  await keepSession(token);
  redirect(safeNext(form.get("next")));
}

/**
 * Ends the session at the API and drops the cookie, whichever of the two
 * fails. Used directly as a form action (it needs nothing from the form).
 */
export async function signOutAction() {
  const token = await getSessionToken();
  if (token) {
    try {
      await authClient.signOut({ fetchOptions: await authFetchOptions(token) });
    } catch {
      // The API is unreachable; the cookie still goes.
    }
  }
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/");
}
