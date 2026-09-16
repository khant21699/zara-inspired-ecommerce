"use client";

import { ArrowRightIcon } from "@/components/ui/Icons";

const DURATION = 700;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Scrolls to the next home block with a tween of our own (works without native smooth scrolling). */
function scrollToNextBlock() {
  const next = [...document.querySelectorAll<HTMLElement>("[data-slide]")].find(
    (s) => s.getBoundingClientRect().top > 1,
  );
  if (!next) return;
  const from = window.scrollY;
  const to = from + next.getBoundingClientRect().top;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, to);
    return;
  }
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION);
    window.scrollTo(0, from + (to - from) * easeOutExpo(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** Fixed arrow at the bottom right of the home: advances one block. */
export function NextArrow() {
  return (
    <button
      type="button"
      aria-label="Next"
      onClick={scrollToNextBlock}
      className="fixed bottom-5 right-(--chrome-x) z-40 p-1 text-ink transition-colors md:bottom-7 [html[data-header-theme=dark]_&]:text-paper"
    >
      <ArrowRightIcon className="h-5 w-5" />
    </button>
  );
}
