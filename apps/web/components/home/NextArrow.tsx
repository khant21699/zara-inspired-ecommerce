"use client";

import { ArrowRightIcon } from "@/components/ui/Icons";
import { tweenScrollTo } from "./tween";

/** Deals the next home card: the first one whose top is still below the viewport's. */
function dealNextCard() {
  const next = [...document.querySelectorAll<HTMLElement>("[data-slide]")].find(
    (s) => s.getBoundingClientRect().top > 1,
  );
  if (next) tweenScrollTo(window.scrollY + next.getBoundingClientRect().top);
}

/** Fixed arrow at the bottom right of the home: deals the next card. Hidden once the deck is through. */
export function NextArrow() {
  return (
    <button
      type="button"
      aria-label="Next"
      onClick={dealNextCard}
      className="home-arrow fixed bottom-5 right-(--chrome-x) z-40 p-1 text-ink transition-[color,opacity] duration-300 md:bottom-7"
    >
      <ArrowRightIcon className="h-5 w-5" />
    </button>
  );
}
