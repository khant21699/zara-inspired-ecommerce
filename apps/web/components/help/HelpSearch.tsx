"use client";

import Link from "next/link";
import { useState } from "react";
import { HELP_TOPICS } from "@/lib/data/help";
import { SearchIcon } from "@/components/ui/Icons";

export function HelpSearch() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const matches = q
    ? HELP_TOPICS.flatMap((t) =>
        t.faqs
          .filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
          .map((f) => ({ topic: t, faq: f })),
      )
    : [];

  return (
    <div>
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="How can we help you?"
          aria-label="Search help"
          className="input-line pr-8 text-sm"
        />
        <SearchIcon className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2" />
      </div>
      {q && (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {matches.length === 0 && (
            <li className="py-4 text-2xs uppercase text-muted">No results for &ldquo;{query}&rdquo;</li>
          )}
          {matches.map(({ topic, faq }) => (
            <li key={`${topic.slug}-${faq.q}`} className="py-4">
              <Link href={`/help/${topic.slug}`} className="block">
                <p className="text-2xs uppercase text-muted">{topic.name}</p>
                <p className="mt-1 text-xs hover:underline hover:underline-offset-4">{faq.q}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
