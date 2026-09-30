import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/account/AuthForm";
import { Page } from "@/components/ui/Page";
import { signUpAction } from "@/lib/auth/actions";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Register" };

export default async function RegisterPage({
  searchParams,
}: PageProps<"/register">) {
  const { next } = await searchParams;
  const target =
    typeof next === "string" && next.startsWith("/") ? next : "/account";
  if (await getSession()) redirect(target);

  return (
    <Page>
      <div className="mx-auto max-w-[360px] pb-32">
        <h1 className="text-chrome uppercase">Create an account</h1>
        <p className="mt-3 text-2xs uppercase text-muted">
          A name, an e-mail and a password of at least 8 characters.
        </p>
        <AuthForm
          action={signUpAction}
          next={target}
          submit="Create account"
          submitting="Creating account…"
          withName
          alternative={{
            lead: "Already registered?",
            label: "Log in",
            href: "/login",
          }}
        />
      </div>
    </Page>
  );
}
