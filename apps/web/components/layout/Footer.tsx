"use client";

import Link from "next/link";
import { useState } from "react";
import { store } from "@/lib/store";
import { CountrySelector } from "./CountrySelector";

const COLUMNS: { title: string; links: { name: string; href: string }[] }[] = [
  {
    title: "HELP",
    links: [
      { name: "MY ACCOUNT", href: "/account" },
      { name: "ITEMS AND SIZES", href: "/help/items-and-sizes" },
      { name: "GIFT CARD", href: "/gift-card" },
      { name: "SHIPPING", href: "/help/shipping" },
      { name: "PAYMENT AND INVOICES", href: "/help/payment-and-invoices" },
      { name: "MY PURCHASES", href: "/help/my-purchases" },
      { name: "EXCHANGES, RETURNS AND REFUNDS", href: "/help/exchanges-returns-and-refunds" },
      { name: "PRE-OWNED", href: "/pre-owned" },
      { name: "SHOPS AND COMPANY", href: "/help/shops-and-company" },
      { name: "CONTACT", href: "/help/contact" },
    ],
  },
  {
    title: "FOLLOW US",
    links: [
      { name: "TIKTOK", href: "/newsletter" },
      { name: "INSTAGRAM", href: "/newsletter" },
      { name: "FACEBOOK", href: "/newsletter" },
      { name: "X", href: "/newsletter" },
      { name: "PINTEREST", href: "/newsletter" },
      { name: "YOUTUBE", href: "/newsletter" },
      { name: "SPOTIFY", href: "/newsletter" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { name: "ABOUT US", href: "/company" },
      { name: "JOIN LIFE", href: "/join-life" },
      { name: "OFFICES", href: "/careers" },
      { name: "STORES", href: "/stores" },
      { name: "CAREERS", href: "/careers" },
      { name: "WORK WITH US", href: "/careers" },
    ],
  },
  {
    title: "POLICIES",
    links: [
      { name: "PRIVACY POLICY", href: "/legal/privacy-policy" },
      { name: "PURCHASE CONDITIONS", href: "/legal/purchase-conditions" },
      { name: "GIFT CARD CONDITIONS", href: "/legal/gift-card-conditions" },
      { name: "COOKIES POLICY", href: "/legal/cookies-policy" },
    ],
  },
];

export function Footer() {
  const [countryOpen, setCountryOpen] = useState(false);

  return (
    <footer className="px-4 pb-8 pt-20 text-2xs uppercase md:px-6 md:pt-28">
      <div className="mb-16">
        <Link href="/newsletter" className="u-link">
          Join our newsletter
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="mb-5 font-bold">{col.title}</h2>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:underline hover:underline-offset-4">
                    {l.name}
                  </Link>
                </li>
              ))}
              {col.title === "POLICIES" && (
                <li>
                  <button
                    type="button"
                    onClick={() => store.setCookieConsent(null)}
                    className="uppercase hover:underline hover:underline-offset-4"
                  >
                    Cookie settings
                  </button>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={() => setCountryOpen(true)}
          className="self-start uppercase hover:underline hover:underline-offset-4"
        >
          United States | English
        </button>
        <p className="text-muted">
          © {new Date().getFullYear()} Zara-inspired storefront · Non-commercial portfolio project,
          not affiliated with any brand
        </p>
      </div>

      <CountrySelector open={countryOpen} onClose={() => setCountryOpen(false)} />
    </footer>
  );
}
