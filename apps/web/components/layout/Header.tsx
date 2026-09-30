"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SideMenu } from "./SideMenu";
import type { MenuRail } from "@/lib/api/products";
import type { SessionUser } from "@/lib/auth/session";
import { bagCount, useStore } from "@/lib/store";
import { cn } from "@/lib/format";

/**
 * Site chrome. There is no header bar: four instruments float at the viewport
 * edges (menu top-left, search top-right, bag / account / help stacked at the
 * right edge) and content runs underneath. The wordmark appears only on the
 * home surface, oversized and fixed at the right.
 */
export function Header({
  menuRail,
  user,
}: {
  menuRail: MenuRail;
  user: SessionUser | null;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { bag } = useStore();
  const count = bagCount(bag);
  const isHome = pathname === "/";

  // Lock page scroll while the side menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        data-menu-open={menuOpen}
        className="site-header pointer-events-none fixed inset-0 z-[60] text-chrome uppercase transition-colors duration-300"
      >
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="pointer-events-auto absolute left-0 top-0 flex h-16 w-[calc(var(--chrome-x)+56px)] items-start justify-end md:h-[92px] md:w-[calc(var(--chrome-x)+80px)]"
        >
          <span
            aria-hidden
            className="relative mt-5 mr-4 block h-4 w-10 md:mt-8 md:mr-4 md:w-16"
          >
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-px bg-ink transition-transform duration-500 ease-out-expo",
                menuOpen && "translate-y-[7.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-px bg-ink transition-transform duration-500 ease-out-expo",
                menuOpen && "-translate-y-[7.5px] -rotate-45",
              )}
            />
          </span>
        </button>

        <Link
          href="/search"
          className="pointer-events-auto absolute right-(--chrome-x) top-5 w-[120px] border-b border-ink pb-[5px] text-right md:top-7 md:w-[170px]"
        >
          Search
        </Link>

        <nav
          aria-label="Utility"
          className="pointer-events-auto absolute right-(--chrome-x) top-14 flex flex-col items-end md:top-(--chrome-top)"
        >
          <Link href="/bag" className="flex h-8 items-center gap-2 py-[5px]">
            Bag
            <span
              aria-label={`${count} items`}
              className="flex h-[18px] min-w-5 items-center justify-center border-x border-b border-ink px-1 text-xs leading-none tracking-[-0.5px]"
            >
              {count}
            </span>
          </Link>
          <Link
            href={user ? "/account" : "/login"}
            className="hidden h-8 items-center py-[5px] md:flex"
          >
            {user ? "Account" : "Log in"}
          </Link>
          <Link
            href="/help"
            className="hidden h-8 items-center py-[5px] md:flex"
          >
            Help
          </Link>
        </nav>

        {isHome && (
          <Link
            href="/"
            aria-label="Home"
            className="pointer-events-auto absolute right-0 top-[58%] -translate-y-1/2 font-logo text-[clamp(96px,12.9vw,300px)] font-medium uppercase leading-none tracking-[-0.06em]"
          >
            Zara
          </Link>
        )}
      </header>

      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        rail={menuRail}
        user={user}
      />
    </>
  );
}
