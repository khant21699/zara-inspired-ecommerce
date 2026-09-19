---
version: 1
slug: "app-section-category-page-tsx"
primary_target: "app/[section]/[category]/page.tsx"
related_targets: ["components/product/ProductGrid.tsx","components/product/ProductCard.tsx","components/product/Price.tsx"]
---

## Scope

Category listing route `app/[section]/[category]/page.tsx` and its grid: `components/product/ProductGrid.tsx`, `components/product/ProductCard.tsx`, `components/product/Price.tsx`. Mode: Operate (find an item, judge it, add it). Step 2 of the five-step redesign toward the live zara.com layout. `ProductGrid` is also reused by search and wishlist, which inherit the new grid without their own redesign.

## Audience and job

The reviewer acting as a shopper, scanning a category and adding to bag. Success: the grid reads as the reference's editorial rhythm at a glance, and the view switch, filters, and quick add all work.

## Direction contract

THESIS: Products carry the page; the grid is an editorial rhythm, not a catalogue wall. Refuses the category default of an edge-to-edge equal-column grid with a sticky toolbar, breadcrumb, and item count above it.

OWN-WORLD: White paper, 2:3 imagery in a centred column, wide white gutters (56px between a pair, 40px in the six-up). Product info in 11px Helvetica Neue Light: name, then price where the sale price and percentage sit in a black chip with white text, then 10px colour squares. A hairline `+` for quick add. `FILTERS` floats at the left edge, `VIEW 1 2 3` sits fixed bottom-left. No red anywhere on the listing.

STORY: The shopper lands on product immediately (no title, no category strip, no count); scans the hero-then-pair rhythm; switches density with the numbers bottom-left; taps `+` to add a size from the card.

FIRST VIEWPORT (desktop 1800): column 252→1548 starting at y=160. View 2 (default) cycles five cards: one 962px hero centred, then two rows of 620px pairs with a 56px gutter. View 1: 962px heroes only. View 3: six 183px cards, 40px gutters, 16px row gap, info centred and name dropped. `FILTERS` at (32,160) h32. `VIEW` label with `1 2 3` at (32, bottom-32). Info block under each image: name 11px, price row 16px with the sale chip, colour squares. Mobile (unmeasured, by judgement): views map to 1 / 2 / 3 columns with 8px gutters inside the 16px page gutter; `FILTERS` at (16,56); `VIEW` at (16, bottom-16).

FORM: Pinned by the brief: a faithful recreation of zara.com's live `layout-ss26` listing measured on 2026-09-16 (card boxes, gutters, chip, and control positions read from the DOM). No concept-seed roll: the user asked for the competitor-like path in plain words. Seed key: none (brief-pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Signature interaction

Switching `VIEW 1 / 2 / 3` reflows the same cards between hero, hero-pair rhythm, and six-up without a page jump; image hover swaps to the detail crop.

## Boundaries

Keep filters logic, sort, quick-add size picker, hover swap, empty state, and the `ProductGrid` props used by search and wishlist. Category navigation moves to the menu (already there); `CategoryNav` is retired. Sale wording changes belong to the menu step. Do not touch PDP, menu, or home.

## Open decisions

Mobile grid gutters and control positions are unmeasured. Whether the six-up should drop names on mobile too.
