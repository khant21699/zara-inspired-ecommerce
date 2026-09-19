import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HELP_TOPICS, getHelpTopic } from "@/lib/data/help";
import { Page } from "@/components/ui/Page";
import { Accordion } from "@/components/ui/Accordion";
import { ComingSoon } from "@/components/ui/ComingSoon";

export function generateStaticParams() {
  return HELP_TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/help/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  const t = getHelpTopic(topic);
  return t ? { title: `${t.name} · Help` } : {};
}

export default async function HelpTopicPage({ params }: PageProps<"/help/[topic]">) {
  const { topic } = await params;
  const t = getHelpTopic(topic);
  if (!t) notFound();

  if (t.comingSoon) {
    return (
      <ComingSoon
        title={`Help · ${t.name}`}
        description={`${t.summary} This section reads live account and order data and will be available once the backend is connected.`}
      />
    );
  }

  return (
    <Page className="pb-24">
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-2xs uppercase text-muted">
          <Link href="/help" className="hover:text-ink">
            Help
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{t.name}</span>
        </nav>
        <h1 className="mt-6 text-2xs uppercase">{t.name}</h1>
        <p className="mt-2 text-xs text-muted">{t.summary}</p>

        <div className="mt-10 border-t border-line">
          {t.faqs.map((f, i) => (
            <Accordion key={f.q} title={f.q} defaultOpen={i === 0}>
              <p>{f.a}</p>
            </Accordion>
          ))}
        </div>

        <div className="mt-16 border border-line p-6">
          <h2 className="text-2xs font-bold uppercase">Still need help?</h2>
          <p className="mt-2 text-xs text-muted">
            Chat, e-mail and phone support need the customer service platform.
          </p>
          <Link href="/help/contact" className="btn-secondary mt-5">
            Contact · Coming soon
          </Link>
        </div>
      </div>
    </Page>
  );
}
