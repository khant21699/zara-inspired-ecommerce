---
version: 1
slug: "components-layout-sidemenu-tsx"
primary_target: "components/layout/SideMenu.tsx"
related_targets: []
---

## Scope

The site menu, `components/layout/SideMenu.tsx`, opened by the chrome's hamburger on every route. Mode: Operate (choose a section and a category). Step 4 of the five-step redesign toward the live zara.com layout.

## Audience and job

The reviewer acting as a shopper who opens the menu to move between WOMAN / MAN / KIDS and into a category. Success: the overlay reads as the reference's menu, sections and categories are found in one glance, and every link lands.

## Direction contract

THESIS: The menu is a page, not a drawer: a paper sheet that takes the whole viewport under the floating chrome and lays the catalogue out as three typographic columns and an image rail. Refuses the category default of a 440px left drawer with tabs and a flat list.

OWN-WORLD: Paper ground; the Bodoni wordmark at the column's left edge; section names in the same Didone-style serif at 27px on 36px rows with a 4px ink dot marking the active one; numbered groups (`|01|` … `|04|`) in 11px with their links in 13px light uppercase on 36px rows; the sale link in the reference's pink; a rail of 2:3 product images 174px wide with 11px labels.

STORY: The shopper taps the hamburger, which crosses into an X while the sheet fades in; picks a section from the serif list (the columns and rail follow), then a category from the numbered groups, and lands on the listing.

FIRST VIEWPORT (desktop 1800): sheet fills the viewport; wordmark at (252, 25) about 84px tall; sections column from (252, 195) reading WOMAN, MAN, KIDS, PRE-OWNED plus the secondary links in 11px muted beneath; groups column from x=538 with labels 45% wide and links from x=722: `|01| NEW IN`, `|02|` SPECIAL PRICES in pink, `|03| BEST SELLERS`, `|04| COLLECTION` listing every real category; image rail from x=942 with five 174×262 thumbnails and labels. SEARCH and the BAG / LOG IN / HELP stack stay visible above the sheet. Mobile (unmeasured): the same sheet stacked, no wordmark, no rail.

FORM: Pinned by the brief: a faithful recreation of zara.com's live menu measured on 2026-09-16. Sections are limited to the product's own (no ZARA HOME, BEAUTY, MASSIMO DUTTI, TRAVEL MODE); "SELECTED FOR YOU" is replaced by BEST SELLERS because personalisation cannot be truthfully offered; the sale label reads SPECIAL PRICES. No concept-seed roll: the user asked for the competitor-like path in plain words. Seed key: none (brief-pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Signature interaction

Choosing a section in the serif list swaps the group columns and the image rail in place; the hamburger's X (step 1) is the only close control besides Escape.

## Boundaries

Keep every route in MENU_LINKS reachable. Do not touch listing, PDP, or home.

## Open decisions

Mobile geometry is unmeasured. Whether hovering a section (rather than clicking) should switch columns as the reference does.
