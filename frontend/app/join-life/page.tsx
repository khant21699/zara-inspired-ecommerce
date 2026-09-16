import type { Metadata } from "next";
import Link from "next/link";
import { Page } from "@/components/ui/Page";

export const metadata: Metadata = { title: "Join Life" };

const PILLARS = [
  {
    title: "Materials",
    body: "Prioritising organic, recycled and responsibly sourced fibres, with the goal of using only lower-impact materials across the collection.",
  },
  {
    title: "Circularity",
    body: "Designing garments to last, offering repair and resale through Pre-owned, and collecting used clothing in every store for reuse or recycling.",
  },
  {
    title: "Energy & water",
    body: "Stores and logistics centres running on renewable energy, with efficiency programmes that reduce water and energy use per garment.",
  },
  {
    title: "People",
    body: "Working with suppliers, workers and unions to protect human rights and improve conditions across the supply chain.",
  },
];

export default function JoinLifePage() {
  return (
    <Page className="pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xs uppercase">Join Life</h1>
        <p className="mt-8 font-logo text-3xl leading-tight md:text-5xl">
          A commitment to make fashion with less impact and more care.
        </p>
        <p className="mt-10 text-xs leading-relaxed">
          Join Life identifies the products made with the most responsible raw materials and
          processes. Look for the label on product pages and in store.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-[2px] md:grid-cols-2">
          {PILLARS.map((p) => (
            <section key={p.title} className="border border-line p-6">
              <h2 className="text-2xs font-bold uppercase">{p.title}</h2>
              <p className="mt-4 text-xs leading-relaxed">{p.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-8 text-2xs uppercase">
          <p className="text-muted">Give your clothes a second life</p>
          <Link href="/pre-owned" className="mt-3 inline-block u-link">
            Pre-owned · repair, resell, donate
          </Link>
        </div>
      </div>
    </Page>
  );
}
