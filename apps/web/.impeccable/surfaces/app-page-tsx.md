---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["components/home/HomeSlides.tsx"]
---

## Scope

The home route `app/page.tsx` and `components/home/HomeSlides.tsx`, plus the fixed wordmark already rendered by the chrome on `/`. Mode: Persuade (the visitor decides which section to enter). Step 5 of the five-step redesign toward the live zara.com layout.

## Audience and job

The reviewer opening the portfolio link for the first time. Success: the first viewport reads as the reference's home (chrome, oversized fixed wordmark, nothing else), and each scrolled block leads into a section.

## Direction contract

THESIS: The home is a paper cover and a run of full-bleed pictures under a fixed wordmark; the interface says nothing. Refuses the category default of hero slides with an eyebrow, a display title and a button on each.

OWN-WORLD: Paper cover; the Bodoni wordmark fixed at the right edge (~600px wide at 1800, centred at 58% of the viewport height); full-bleed blocks one viewport tall carrying the placeholder studio slides (gradient backdrop, film grain, garment silhouettes) until real photography lands; one 13px uppercase section label at each block's bottom-left; a single hairline arrow fixed bottom-right; the chrome inverts to paper over dark blocks.

STORY: The visitor sees the wordmark and the chrome on white, scrolls (or taps the arrow) into WOMAN, MAN, KIDS, SALE and PERFUMES blocks, and taps a label to enter a section.

FIRST VIEWPORT (desktop 1800): white; chrome at its measured positions; wordmark fixed at the right; arrow at the bottom right; the first picture block begins at the fold. Each following block is a viewport tall with its label at (32, bottom-32). Mobile (unmeasured): same, with the wordmark at its 96px floor.

FORM: Pinned by the brief: a faithful recreation of zara.com's live home measured on 2026-09-16 (paper cover, image blocks, fixed logo, arrow). The kicker and display titles of the old slides are removed per the craft floor. No concept-seed roll: the user asked for the competitor-like path in plain words. Seed key: none (brief-pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Signature interaction

Scroll-snapped blocks with the chrome and arrow inverting to paper over dark blocks; the arrow advances one block.

## Boundaries

Keep the slide data (sections, backdrops, figures), the scroll snapping, and the dark-slide inversion hook. Do not touch listing, PDP, or menu.

## Open decisions

Whether each block should be a link in its entirety once real photography exists.
