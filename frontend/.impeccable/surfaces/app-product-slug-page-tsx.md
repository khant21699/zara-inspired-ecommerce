---
version: 1
slug: "app-product-slug-page-tsx"
primary_target: "app/product/[slug]/page.tsx"
related_targets: ["components/product/ProductDetail.tsx"]
---

## Scope

Product detail route `app/product/[slug]/page.tsx` and `components/product/ProductDetail.tsx`, with `components/product/Price.tsx` (13px size), `components/ui/Icons.tsx` (bookmark), `components/ui/Page.tsx` (`wide`), and the `.btn-outline` button in `app/globals.css`. Mode: Operate (judge the item, pick a size, add to bag). Step 3 of the five-step redesign toward the live zara.com layout.

## Audience and job

The reviewer acting as a shopper who has opened an item. Success: the gallery leads, the buy column is found at the right without a bar or box, ADD works in two taps, and the page reads as the reference's editorial product page.

## Direction contract

THESIS: The photograph owns the page; the buy column is a narrow annotation beside it. Refuses the category default of a two-up gallery next to a boxed buy panel with an always-open size list, a filled black CTA, and chevron accordions.

OWN-WORLD: White paper, ink type at weight 300; 15px name, 13px price and buttons, 12px description, 11px reference line and links. Two 40px outlined buttons with a 0.5px hairline (`ADD`, `PAY`), never a filled block. A bookmark glyph for wishlist. Composition floats in the whitespace beside the second image in uppercase 12px. Links are words, not accordions with chevrons.

STORY: The shopper lands on a full-height photograph starting at the top of the viewport, reads name, price chip and reference at the right, taps ADD, picks a size from the list that appears, and continues scrolling through staggered images with the composition set beside them.

FIRST VIEWPORT (desktop 1800): first image 775px wide at x=232 from y=32 (2:3). Buy column at x=1117, 436px wide, from y=165: name, price chip, hairline, `COLOUR | REF`, the `ADD` / `PAY` pair (209px each, 18px gap), description, `COMPLETE YOUR LOOK` with 66×99 thumbnails, then four text links (PRODUCT MEASUREMENTS, COMPOSITION & CARE, CHECK IN-STORE AVAILABILITY, SHIPPING, EXCHANGES AND RETURNS). Second image 633px at x=928, 112px below the first, composition text vertically centred to its left; images alternate from there. Mobile (unmeasured): swipe gallery, buy column below at 16px gutters.

FORM: Pinned by the brief: a faithful recreation of zara.com's live product page measured on 2026-09-16. Apple Pay cannot be truthfully offered, so the second button reads `PAY` and routes to the honest coming-soon checkout. No concept-seed roll: the user asked for the competitor-like path in plain words. Seed key: none (brief-pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Signature interaction

`ADD` opens the size list in place beneath the buttons; choosing a size adds to bag and closes it. Colour swatches re-render every gallery image in the chosen colour.

## Boundaries

Keep bag/wishlist state, the `You may also like` rail, the coming-soon routes, and the composition data. Do not touch the listing, menu, or home.

## Recorded after the finish review

- Click-to-zoom: each shot opens a full-viewport paper view of the same image; the reference's thumbnail strip inside the zoom is not built.

## Open decisions

Mobile geometry is unmeasured. Whether the rail at the bottom should stay once `COMPLETE YOUR LOOK` exists.
