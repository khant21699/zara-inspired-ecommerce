"use client";

import { useEffect, useRef } from "react";
import type React from "react";
import { isTweening, tweenScrollTo } from "./tween";

/*
 * Proximity settle. When scrolling stops with the next card most of the way
 * up, the deck completes the deal; when a card has barely moved, it returns.
 * In between, the scroll rests where the visitor left it.
 */
const COMPLETE_FROM = 0.6;
const RETURN_UNTIL = 0.15;
const STOP_DELAY = 120; // ms without a scroll event = stopped (where scrollend is missing)

/**
 * The home deck. Each card inside is sticky and one viewport tall, so the
 * next card slides up over the one holding the viewport. On scroll this
 * measures how far each card is covered (0..1) into its `--covered` custom
 * property, which the CSS reads to lift and dim the receding photograph, and
 * it keeps the chrome, the wordmark and the arrow each in step with the card
 * under its own band. Once the closing paper card has the viewport, the
 * wordmark and the arrow step aside (`html[data-home-deck="end"]`). When the
 * scroll comes to rest partway through a deal, the deck settles it.
 */
export function Deck({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = ref.current;
    if (!deck) return;
    const root = document.documentElement;
    const cards = [...deck.querySelectorAll<HTMLElement>("[data-slide]")];
    if (cards.length === 0) return;

    const height = () => cards[0].offsetHeight || window.innerHeight;
    // How many cards deep the viewport's top edge is, fractional.
    const depthNow = () => -deck.getBoundingClientRect().top / height();

    let frame = 0;
    const measure = () => {
      frame = 0;
      const depth = depthNow();
      cards.forEach((card, i) => {
        const covered = Math.min(1, Math.max(0, depth - i));
        card.style.setProperty("--covered", covered.toFixed(3));
      });
      // The card under a viewport point y = f * height is floor(depth + f);
      // each instrument flips with the card under its own band.
      const cardAt = (f: number) =>
        cards[Math.min(cards.length - 1, Math.max(0, Math.floor(depth + f)))];
      const theme = (f: number) =>
        cardAt(f).dataset.slide === "dark" ? "dark" : "light";
      root.dataset.headerTheme = theme(0.1);
      root.dataset.markTheme = theme(0.58);
      root.dataset.arrowTheme = theme(0.97);
      root.dataset.homeDeck =
        cardAt(0.5) === cards[cards.length - 1] ? "end" : "cards";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    // Settle a half-dealt card once the scroll has stopped. Only inside the
    // deck proper: past the last photo card the page scrolls freely.
    const settle = () => {
      if (isTweening()) return;
      const depth = depthNow();
      const index = Math.floor(depth);
      if (index < 0 || index >= cards.length - 1) return;
      const part = depth - index;
      const target =
        part >= COMPLETE_FROM ? index + 1 : part <= RETURN_UNTIL ? index : null;
      if (target === null || Math.abs(target - depth) < 0.002) return;
      tweenScrollTo(
        window.scrollY + deck.getBoundingClientRect().top + target * height(),
      );
    };
    // Safari has no scrollend yet; a pause in scroll events stands in for it.
    const hasScrollEnd: boolean = "onscrollend" in window;
    let stopTimer = 0;
    const onScroll = () => {
      schedule();
      if (!hasScrollEnd) {
        window.clearTimeout(stopTimer);
        stopTimer = window.setTimeout(settle, STOP_DELAY);
      }
    };

    // A covered card is "in view" to the browser (it is stuck at the top), so
    // tabbing to its link would never bring it up. Deal it on focus instead.
    const reveal = (event: FocusEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-slide]",
      );
      const i = card ? cards.indexOf(card) : -1;
      if (i < 0 || Number(card?.style.getPropertyValue("--covered")) === 0)
        return;
      window.scrollTo({
        top: window.scrollY + deck.getBoundingClientRect().top + i * height(),
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", settle);
    window.addEventListener("resize", schedule);
    deck.addEventListener("focusin", reveal);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", settle);
      window.removeEventListener("resize", schedule);
      deck.removeEventListener("focusin", reveal);
      window.clearTimeout(stopTimer);
      if (frame) cancelAnimationFrame(frame);
      delete root.dataset.headerTheme;
      delete root.dataset.markTheme;
      delete root.dataset.arrowTheme;
      delete root.dataset.homeDeck;
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
