"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import { MENU_LINKS, SECTIONS, isSectionSlug } from "@/lib/data/catalog";
import type { MenuRail } from "@/lib/api/products";
import type { Category, Section, SectionSlug } from "@/lib/types";
import { ProductArt } from "@/components/product/ProductArt";
import { cn } from "@/lib/format";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Image rail per section, fetched by the layout. */
  rail: MenuRail;
}

/*
 * Reference menu at 1800px: a paper overlay under the floating chrome; the
 * wordmark at the column's left edge (252, 25); the sections in a serif at
 * (252, 195) on 36px rows with a dot on the active one; numbered groups at
 * x=538 with their links at x=722; an image rail from x=942.
 */
interface Group {
  number: string;
  label: string;
  categories: Category[];
  sale?: boolean;
}

function groupsFor(section: Section): Group[] {
  const by = (slug: string) =>
    section.categories.filter((c) => c.slug === slug);
  return [
    { number: "01", label: "New in", categories: by("new-in") },
    { number: "02", label: "", categories: by("sale"), sale: true },
    { number: "03", label: "Best sellers", categories: by("best-sellers") },
    {
      number: "04",
      label: "Collection",
      categories: section.categories.filter((c) => !c.virtual),
    },
  ];
}

/** Phone mark for the open section (desktop uses the gutter dot instead). */
const ACTIVE_PHONE =
  "underline decoration-1 underline-offset-8 md:no-underline";

/** Desktop mark for the open section: a dot in the gutter left of the column. */
function ActiveDot() {
  return (
    <span
      aria-hidden
      className="absolute -left-5 top-[15px] hidden h-1 w-1 rounded-full bg-ink md:block"
    />
  );
}

/** Link label that marks itself while that link's navigation is in flight. */
function Pending({
  children,
  className,
  pendingClassName = "underline underline-offset-4",
}: {
  children: React.ReactNode;
  className?: string;
  pendingClassName?: string;
}) {
  const { pending } = useLinkStatus();
  return (
    <span
      aria-busy={pending || undefined}
      className={cn(className, pending && pendingClassName)}
    >
      {children}
    </span>
  );
}

export function SideMenu({ open, onClose, rail: railBySection }: Props) {
  const pathname = usePathname();
  const currentSection = pathname.split("/")[1];
  const [tab, setTab] = useState<SectionSlug>(
    isSectionSlug(currentSection) ? currentSection : "woman",
  );
  const firstSection = useRef<HTMLButtonElement>(null);
  const lastPathname = useRef(pathname);

  // Keep the sheet up while the chosen page loads; close only once the
  // navigation has landed, so the old page never flashes underneath.
  // (Each link shows its own in-flight state through <Pending>.)
  useEffect(() => {
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;
    onClose();
  }, [pathname, onClose]);

  // A link to the page already open would never change the pathname.
  const go = (href: string) => {
    if (href === pathname) onClose();
  };

  useEffect(() => {
    if (!open) return;
    firstSection.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const section = SECTIONS.find((s) => s.slug === tab) ?? SECTIONS[0];
  const groups = groupsFor(section);
  const rail = railBySection[section.slug];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        "fixed inset-0 z-50 bg-paper transition-opacity duration-300",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="absolute inset-x-0 bottom-0 top-(--chrome-top) overflow-y-auto overscroll-contain md:top-0">
        <div className="relative mx-auto min-h-full w-full px-4 pb-16 md:w-(--page-col) md:px-0 md:pt-6">
          {/* The wordmark is the way home from any page: 92px in the reference's
              desktop column, 44px on phones where the chrome carries no logo. */}
          <Link
            href="/"
            onClick={() => go("/")}
            aria-label="Home"
            className="block font-logo text-[44px] font-medium uppercase leading-[0.9] tracking-[-0.06em] md:text-[92px]"
          >
            <Pending pendingClassName="opacity-60">Zara</Pending>
          </Link>

          <div className="mt-6 md:mt-[86px] md:flex md:items-start">
            {/* Sections: the reference marks the open one with a dot in the gutter
                left of the column; phones have no gutter, so the mark is an underline. */}
            <nav aria-label="Sections" className="md:w-[22%] md:shrink-0">
              <ul className="font-logo text-[27px] uppercase leading-9 tracking-[-0.02em]">
                {SECTIONS.map((s) => (
                  <li key={s.slug} className="relative">
                    {tab === s.slug && <ActiveDot />}
                    <button
                      ref={
                        s.slug === SECTIONS[0].slug ? firstSection : undefined
                      }
                      type="button"
                      onClick={() => setTab(s.slug)}
                      aria-pressed={tab === s.slug}
                      className={cn(
                        "hover:underline hover:underline-offset-8",
                        tab === s.slug && ACTIVE_PHONE,
                      )}
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
                <li className="relative">
                  {pathname === "/pre-owned" && <ActiveDot />}
                  <Link
                    href="/pre-owned"
                    onClick={() => go("/pre-owned")}
                    aria-current={
                      pathname === "/pre-owned" ? "page" : undefined
                    }
                    className={cn(
                      "hover:underline hover:underline-offset-8",
                      pathname === "/pre-owned" && ACTIVE_PHONE,
                    )}
                  >
                    <Pending pendingClassName="underline underline-offset-8">
                      Pre-owned
                    </Pending>
                  </Link>
                </li>
              </ul>
              <ul className="mt-10 space-y-2 text-2xs uppercase text-muted">
                {MENU_LINKS.filter((l) => l.href !== "/pre-owned").map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => go(l.href)}
                      className="hover:text-ink"
                    >
                      <Pending pendingClassName="text-ink underline underline-offset-4">
                        {l.name}
                      </Pending>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Numbered groups */}
            <nav
              aria-label={`${section.name} categories`}
              className="mt-10 md:mt-0 md:w-[31.3%] md:shrink-0"
            >
              {groups.map((g) => (
                <div key={g.number} className="mb-6 md:flex md:items-start">
                  <p className="text-2xs uppercase md:w-[45%] md:shrink-0 md:leading-9">
                    <span className="text-muted">|{g.number}|</span>
                    {g.label && <span className="ml-2">{g.label}</span>}
                  </p>
                  <ul className="mt-1 text-chrome uppercase md:mt-0">
                    {g.categories.map((c) => (
                      <li key={c.slug} className="leading-9">
                        <Link
                          href={`/${section.slug}/${c.slug}`}
                          onClick={() => go(`/${section.slug}/${c.slug}`)}
                          className={cn(
                            "hover:underline hover:underline-offset-4",
                            g.sale && "text-sale",
                          )}
                        >
                          <Pending>
                            {g.sale ? "Special prices" : c.name}
                          </Pending>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Image rail */}
            <ul
              className="no-scrollbar hidden gap-[7px] overflow-x-auto md:flex md:min-w-0 md:flex-1"
              aria-label="Featured"
            >
              {rail.map(({ category, product }) => (
                <li key={category.slug} className="w-[174px] shrink-0">
                  <Link
                    href={`/${section.slug}/${category.slug}`}
                    onClick={() => go(`/${section.slug}/${category.slug}`)}
                    className="block"
                  >
                    <span className="relative block aspect-[2/3] bg-canvas">
                      <ProductArt
                        product={product}
                        variant={0}
                        sizes="174px"
                        className="absolute inset-0"
                      />
                    </span>
                    <Pending
                      className="mt-2 block text-2xs uppercase"
                      pendingClassName="underline underline-offset-4"
                    >
                      {category.name}
                    </Pending>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
