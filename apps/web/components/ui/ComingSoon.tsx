import Link from "next/link";
import type { ReactNode } from "react";
import { Page } from "./Page";

interface Props {
  /** The page name as it would appear on the real site, e.g. "LOG IN TO YOUR ACCOUNT". */
  title: string;
  description?: string;
  /** A non-interactive preview of what the page will look like. */
  preview?: ReactNode;
}

const DEFAULT_DESCRIPTION =
  "This section depends on a backend service (accounts, orders, payments or live data) that is not connected yet.";

export function ComingSoon({ title, description = DEFAULT_DESCRIPTION, preview }: Props) {
  return (
    <Page>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-2 pb-24 pt-10 text-center md:pt-20">
        <p className="text-2xs uppercase text-muted">{title}</p>
        <h1 className="mt-5 font-logo text-[44px] uppercase leading-none tracking-tight md:text-[72px]">
          Coming soon
        </h1>
        <p className="mt-6 max-w-md text-xs uppercase leading-relaxed text-ink/80">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-primary min-w-[220px]">
            Continue shopping
          </Link>
          <Link href="/help" className="btn-secondary min-w-[220px]">
            Help
          </Link>
        </div>
        {preview && (
          <div
            aria-hidden
            className="mt-20 w-full max-w-md select-none opacity-40 grayscale"
            style={{ pointerEvents: "none" }}
          >
            {preview}
          </div>
        )}
      </div>
    </Page>
  );
}
