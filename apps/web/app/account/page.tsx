import type { Metadata } from "next";
import Link from "next/link";
import { SignOutButton } from "@/components/account/SignOutButton";
import { Page } from "@/components/ui/Page";
import { requireSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "My account" };

const DATE = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Sections that need services this project has not built yet. */
const PENDING = [
  { name: "Purchases", note: "Orders arrive with checkout" },
  { name: "Returns", note: "Orders arrive with checkout" },
  { name: "Addresses", note: "Saved with the first order" },
  { name: "Payment methods", note: "Handled by the payment provider" },
];

export default async function AccountPage() {
  const { user, session } = await requireSession("/account");
  const since = DATE.format(new Date(user.createdAt));

  return (
    <Page>
      <div className="max-w-[640px] pb-32">
        <h1 className="text-chrome uppercase">My account</h1>

        <dl className="mt-10 border-t border-line text-xs">
          <div className="flex justify-between gap-6 border-b border-line py-4">
            <dt className="text-2xs uppercase text-muted">Name</dt>
            <dd className="text-right uppercase">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-6 border-b border-line py-4">
            <dt className="text-2xs uppercase text-muted">E-mail</dt>
            <dd className="break-all text-right">{user.email}</dd>
          </div>
          <div className="flex justify-between gap-6 border-b border-line py-4">
            <dt className="text-2xs uppercase text-muted">Member since</dt>
            <dd className="text-right uppercase">{since}</dd>
          </div>
          <div className="flex justify-between gap-6 border-b border-line py-4">
            <dt className="text-2xs uppercase text-muted">Session ends</dt>
            <dd className="text-right uppercase">
              {DATE.format(new Date(session.expiresAt))}
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/wishlist" className="btn-primary sm:min-w-[220px]">
            Wishlist
          </Link>
          <SignOutButton />
        </div>

        <h2 className="mt-20 text-2xs uppercase text-muted">
          Not connected yet
        </h2>
        <ul className="mt-4 border-t border-line text-2xs uppercase">
          {PENDING.map((item) => (
            <li
              key={item.name}
              className="flex justify-between gap-6 border-b border-line py-4"
            >
              <span>{item.name}</span>
              <span className="text-right text-muted">{item.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}
