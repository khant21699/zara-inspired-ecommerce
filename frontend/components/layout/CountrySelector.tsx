"use client";

import { useState } from "react";
import { CloseIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

const REGIONS: { name: string; countries: string[] }[] = [
  {
    name: "AMERICAS",
    countries: ["United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Colombia"],
  },
  {
    name: "EUROPE",
    countries: [
      "Spain",
      "France",
      "Germany",
      "Italy",
      "United Kingdom",
      "Portugal",
      "Netherlands",
      "Belgium",
      "Ireland",
      "Sweden",
    ],
  },
  {
    name: "ASIA-PACIFIC",
    countries: ["Japan", "South Korea", "Australia", "Singapore", "India"],
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Country/language modal. Purely presentational: stores are single-market in this build. */
export function CountrySelector({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  if (!open) return null;

  const q = query.trim().toLowerCase();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-paper/70 backdrop-blur-[2px] p-4 md:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Select your location"
        className="relative flex max-h-[85svh] w-full max-w-2xl flex-col border border-ink bg-paper p-6 md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xs uppercase">Select your location</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search country"
          className="input-line mt-6 text-xs"
        />
        <div className="mt-6 grid grid-cols-1 gap-8 overflow-y-auto pr-2 sm:grid-cols-3">
          {REGIONS.map((region) => {
            const list = region.countries.filter((c) => c.toLowerCase().includes(q));
            if (list.length === 0) return null;
            return (
              <div key={region.name}>
                <h3 className="mb-3 text-2xs font-bold uppercase">{region.name}</h3>
                <ul className="space-y-2 text-2xs uppercase">
                  {list.map((c) => (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={onClose}
                        className={cn(
                          "text-left hover:underline hover:underline-offset-4",
                          c === "United States" && "font-bold",
                        )}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
