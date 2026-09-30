import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/account/AuthForm";
import { Page } from "@/components/ui/Page";
import { signInAction } from "@/lib/auth/actions";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  const target =
    typeof next === "string" && next.startsWith("/") ? next : "/account";
  if (await getSession()) redirect(target);

  return (
    <Page>
      <div className="mx-auto max-w-[360px] pb-32">
        <h1 className="text-chrome uppercase">Log in to your account</h1>
        <AuthForm
          action={signInAction}
          next={target}
          submit="Log in"
          submitting="Logging in…"
          alternative={{
            lead: "No account yet?",
            label: "Register",
            href: "/register",
          }}
        />
      </div>
    </Page>
  );
}
