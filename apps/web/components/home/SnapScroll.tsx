"use client";

import { useEffect } from "react";

/**
 * Home-only scroll behaviour: a header theme that follows whichever block is
 * in view (dark blocks get a paper header). Scrolling itself is free.
 */
export function SnapScroll() {
  useEffect(() => {
    const root = document.documentElement;

    const slides = document.querySelectorAll<HTMLElement>("[data-slide]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          root.dataset.headerTheme = entry.target.getAttribute("data-slide") === "dark" ? "dark" : "light";
        }
      },
      { threshold: 0.5 },
    );
    slides.forEach((s) => observer.observe(s));

    return () => {
      observer.disconnect();
      delete root.dataset.headerTheme;
    };
  }, []);
  return null;
}
