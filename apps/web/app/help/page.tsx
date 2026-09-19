import type { Metadata } from "next";
import Link from "next/link";
import { HELP_TOPICS } from "@/lib/data/help";
import { Page } from "@/components/ui/Page";
import { HelpSearch } from "@/components/help/HelpSearch";

export const metadata: Metadata = { title: "Help" };

export default function HelpPage() {
  return (
    <Page className="pb-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xs uppercase">Help</h1>
        <div className="mt-8 max-w-xl">
          <HelpSearch />
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-[2px] sm:grid-cols-2 lg:grid-cols-3">
          {HELP_TOPICS.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/help/${t.slug}`}
                className="flex h-full min-h-32 flex-col justify-between border border-line p-5 transition-colors hover:border-ink"
              >
                <span className="text-2xs uppercase">
                  {t.name}
                  {t.comingSoon && <span className="ml-2 text-muted">· Coming soon</span>}
                </span>
                <span className="mt-6 text-xs text-muted">{t.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}
