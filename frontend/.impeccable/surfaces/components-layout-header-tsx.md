---
version: 1
slug: "components-layout-header-tsx"
primary_target: "components/layout/Header.tsx"
related_targets: ["components/ui/Page.tsx","app/globals.css","components/ui/Icons.tsx"]
---

## Scope

Global chrome and type for every route: `components/layout/Header.tsx`, `components/ui/Page.tsx`, `app/globals.css`, `components/ui/Icons.tsx`. Mode: Operate (the chrome is the shopper's wayfinding on every surface). Step 1 of a five-step redesign toward the live zara.com layout; later steps own listing, PDP, menu, and home slides.

## Audience and job

The reviewer acting as a shopper. Job: open any page and immediately have menu, search, bag, account, and help within reach without a bar eating the top of the screen. Success: the chrome reads as the live reference at a glance and never collides with content.

## Direction contract

THESIS: Chrome as four floating instruments at the corners, never a bar. Refuses the category default of a full-width white header with a centered logo and horizontal utility row.

OWN-WORLD: White paper, black ink, one hairline weight (1px; 0.5px on outlined buttons). Helvetica Neue Light 300 as the stand-in for Helvetica Now Text: 13px chrome, 11px product info, 12px running copy, uppercase throughout. No icons except the two-line hamburger and the bracketed bag count; every other control is a word. The Bodoni wordmark appears only on the home surface, oversized and fixed.

STORY: The visitor sees product first; the instruments sit at the edges and are found by convention. Menu top-left, search top-right, bag/account/help stacked at the right edge, filters at the left edge on listings. They understand this is the reference brand's current site and act on the product, not the chrome.

FIRST VIEWPORT (desktop 1800): 64×1px two-line hamburger at (32,32) and (32,47); `SEARCH` right-aligned ending 32px from the right edge at y=28, 170px wide, 1px underline; `BAG` + bracket-count 20px glyph at y=160, `LOG IN` y=192, `HELP` y=224, right-aligned at 1768; content column centered from 252 to 1548 starting at y=160. Home only: Bodoni `ZARA` fixed at the right edge, roughly 600px wide, centred at 58% viewport height. Mobile (unmeasured, by judgement): hamburger 40×1px at (16,20), `SEARCH` right at 16px, the stack collapses into a single row `BAG |0|` under `SEARCH`, content full-bleed below 72px.

FORM: Pinned by the brief: a faithful recreation of zara.com's live `layout-ss26` chrome, measured on 2026-09-16. No concept-seed roll was run: the user asked for the competitor-like path in plain words, so convention is the commitment and the reference's craft is the bar. Seed key: none (brief-pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Signature interaction

The hamburger's two lines cross into an X on open (the reference animates the same element). Header inverts to paper-white over dark home slides via the existing `data-header-theme` hook.

## Boundaries

Do not touch listing grid, PDP layout, menu contents, or home slides in this step. Preserve bag count, wishlist, cookie banner, and the header-theme inversion. The wordmark is Bodoni Moda; the real overlapping-letter logo and Helvetica Now are licensed and out of scope.

## Carry-overs recorded by the step-1 finish review

- Step 5 (home slides): the `NEW COLLECTION` eyebrow above each slide title is a kicker, a craft-floor ban; delete it when the slides are rebuilt.
- Step 2 (listing): `FILTERS` and `VIEW 1 2 3` are edge-floating chrome instruments reading `--chrome-x` / `--chrome-top`, never toolbar buttons inside the grid.

## Open decisions

Mobile chrome geometry is unmeasured (the reference could not be resized in this session); revisit once measured. The `SHOPPING BAG` wording becomes `BAG` per the reference.
