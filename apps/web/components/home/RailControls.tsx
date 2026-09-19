"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";

interface Props {
  /** id of the scrolling rail (`overflow-x-auto`) these buttons page. */
  railId: string;
}

/**
 * Previous / next for a horizontal rail whose scrollbar is hidden: pages by
 * one visible width, and each arrow fades when its end is reached.
 */
export function RailControls({ railId }: Props) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const rail = document.getElementById(railId);
    if (!rail) return;
    const read = () => {
      setAtStart(rail.scrollLeft <= 1);
      setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1);
    };
    read();
    rail.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      rail.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [railId]);

  const page = (direction: -1 | 1) => {
    const rail = document.getElementById(railId);
    rail?.scrollBy({ left: direction * rail.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="ml-auto hidden gap-4 md:flex">
      <button
        type="button"
        onClick={() => page(-1)}
        aria-label="Previous products"
        aria-controls={railId}
        disabled={atStart}
        className="p-1 transition-opacity duration-300 disabled:opacity-25"
      >
        <ArrowRightIcon className="h-5 w-5 rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => page(1)}
        aria-label="Next products"
        aria-controls={railId}
        disabled={atEnd}
        className="p-1 transition-opacity duration-300 disabled:opacity-25"
      >
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
