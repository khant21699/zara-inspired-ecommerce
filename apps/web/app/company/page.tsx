import type { Metadata } from "next";
import Link from "next/link";
import { Page } from "@/components/ui/Page";

export const metadata: Metadata = { title: "About us" };

const FACTS = [
  { value: "1975", label: "Founded" },
  { value: "200+", label: "Markets online" },
  { value: "2 weeks", label: "Design to store" },
  { value: "52", label: "Collections a year" },
];

export default function CompanyPage() {
  return (
    <Page className="pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xs uppercase">About us</h1>
        <p className="mt-8 font-logo text-3xl leading-tight md:text-5xl">
          Fashion that listens to the customer, designed and delivered at the pace of the street.
        </p>
        <div className="mt-12 space-y-5 text-xs leading-relaxed">
          <p>
            We design, produce and distribute clothing, footwear, accessories and beauty for women,
            men and kids. Every collection starts with what customers are asking for in stores and
            online, and reaches the shop floor in a matter of weeks.
          </p>
          <p>
            Our integrated model connects design, manufacturing, logistics and retail. Short runs and
            constant renewal mean the offer is always current, while stock is kept close to demand to
            avoid waste.
          </p>
          <p>
            Stores and the online shop work as one: buy online and collect in store, return anywhere,
            and check the availability of any item in the store nearest to you.
          </p>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-[2px] md:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label} className="border border-line p-5">
              <dt className="text-2xs uppercase text-muted">{f.label}</dt>
              <dd className="mt-3 font-logo text-2xl">{f.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-16 space-y-3 text-2xs uppercase">
          <li>
            <Link href="/join-life" className="u-link">
              Join Life · sustainability
            </Link>
          </li>
          <li>
            <Link href="/careers" className="u-link">
              Work with us
            </Link>
          </li>
          <li>
            <Link href="/stores" className="u-link">
              Stores
            </Link>
          </li>
        </ul>
      </div>
    </Page>
  );
}
