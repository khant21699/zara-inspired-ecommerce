const DURATION = 700;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

let cancel: (() => void) | null = null;

/**
 * Scrolls the window to `to` with the deck's own tween (700ms ease-out-expo;
 * instant under reduced motion). One tween runs at a time, and any wheel,
 * touch or key from the visitor hands the scroll straight back to them.
 */
export function tweenScrollTo(to: number) {
  cancel?.();
  const from = window.scrollY;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, to);
    return;
  }
  const start = performance.now();
  let frame = 0;
  const stop = () => {
    cancelAnimationFrame(frame);
    for (const type of INTERRUPTS) window.removeEventListener(type, stop);
    cancel = null;
  };
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION);
    window.scrollTo(0, from + (to - from) * easeOutExpo(t));
    if (t < 1) frame = requestAnimationFrame(step);
    else stop();
  };
  for (const type of INTERRUPTS)
    window.addEventListener(type, stop, { passive: true });
  cancel = stop;
  frame = requestAnimationFrame(step);
}

/** True while a tween of ours is driving the scroll. */
export const isTweening = () => cancel !== null;

const INTERRUPTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
