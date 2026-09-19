import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Page } from "@/components/ui/Page";

const PAGES: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
  "privacy-policy": {
    title: "Privacy policy",
    sections: [
      { h: "Who is responsible for your data", p: "The company operating this online store is responsible for the personal data you provide when you browse, register or purchase." },
      { h: "What data we collect", p: "Identification and contact details, purchase and delivery information, payment data processed by our providers, and browsing data collected through cookies with your consent." },
      { h: "Why we use it", p: "To manage your orders and returns, to provide customer service, to prevent fraud, and, if you agree, to send you information about products and promotions." },
      { h: "Your rights", p: "You can access, rectify, delete or port your data, restrict or object to its processing, and withdraw your consent at any time by contacting customer service." },
    ],
  },
  "purchase-conditions": {
    title: "Purchase conditions",
    sections: [
      { h: "Placing an order", p: "By placing an order you make an offer to purchase the selected products. The contract is concluded when we send the shipping confirmation." },
      { h: "Prices and payment", p: "Prices include applicable taxes. Delivery costs are shown before you confirm your order. Accepted payment methods are listed at checkout." },
      { h: "Delivery", p: "Orders are delivered to the address you indicate within the estimated time shown at checkout. Risk passes to you on delivery." },
      { h: "Right of withdrawal and returns", p: "You may return items within 30 days from the shipping date in their original condition. Refunds are issued to the original payment method." },
    ],
  },
  "gift-card-conditions": {
    title: "Gift card conditions",
    sections: [
      { h: "Validity", p: "Gift cards are valid for five years from the date of activation and can be used in stores and online within the same market." },
      { h: "Use", p: "The balance can be used in one or several purchases. Remaining balance stays on the card. Gift cards cannot be exchanged for cash." },
      { h: "Loss or theft", p: "Gift cards are bearer instruments. Keep the card number and PIN safe; lost or stolen cards cannot be replaced." },
    ],
  },
  "cookies-policy": {
    title: "Cookies policy",
    sections: [
      { h: "What cookies are", p: "Small files stored on your device that let the website remember your preferences and understand how it is used." },
      { h: "Which cookies we use", p: "Strictly necessary cookies for the shop to work, analytics cookies to measure performance, and personalisation cookies to show relevant content." },
      { h: "Managing cookies", p: "You can accept, reject or configure cookies from the banner or at any time from COOKIE SETTINGS in the footer. Your choice is stored on this device." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return PAGES[slug] ? { title: PAGES[slug].title } : {};
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <Page className="pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xs uppercase">{page.title}</h1>
        <p className="mt-2 text-2xs uppercase text-muted">Last updated · September 2026</p>
        <div className="mt-10 space-y-8">
          {page.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-2xs font-bold uppercase">{s.h}</h2>
              <p className="mt-3 text-xs leading-relaxed">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </Page>
  );
}
