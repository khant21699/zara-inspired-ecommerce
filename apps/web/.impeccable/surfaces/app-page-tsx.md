---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["components/home/HomeSlides.tsx","components/home/Deck.tsx","components/home/NewIn.tsx"]
---

## Scope

The home route `app/page.tsx` and `components/home/*`, plus the fixed wordmark the chrome renders on `/`. Mode: Persuade (the visitor decides which section to enter). Redesign of the home inside the established world after the user found the paper-cover-plus-five-identical-blocks version boring; the rest of the site keeps the measured zara.com grammar.

## Audience and job

The reviewer opening the portfolio link for the first time. Success: the first viewport reads as a fashion house's cover (photograph, oversized fixed wordmark, floating chrome), the scroll has a rhythm worth continuing, each section is one obvious tap away, and real product from the catalogue appears before the footer.

## Research

Compared on 2026-09-19: zara.com (full-viewport picture blocks, one small label, nothing else), cos.com (a split gate: two full-height halves, SHOP WOMEN / SHOP MEN in bold uppercase), uniqlo.com (stacked full-bleed campaigns each with a logo eyebrow, title, subline; a four-up product rail with swatches), aritzia.com (full-bleed hero with a large light display title, 50/50 split blocks, six-up product rail, "coming soon" story block). Common to the attractive ones: a display voice for the section names, varied rhythm, and product before the footer.

## Direction contract

THESIS: The home is a deck of photographs the visitor deals through: each card sticks under the chrome while the next slides up over it, and each section's name is set once, large, in the house serif. It refuses the category default of hero slides carrying an eyebrow, a display title, a subline and a button, and refuses the incumbent's five identical full-bleed blocks with a 13px label.

OWN-WORLD: Ink on paper; the Bodoni Moda serif that already names the sections in the menu, raised to 96px for the card titles; the 13px light uppercase sans for every other word; the floating chrome and the fixed wordmark untouched; hairlines only; no radius; the chrome, wordmark, arrow and titles turn paper over the two dark photographs, each with the card under its own band. The receding card drifts up and dims under ink as the next covers it. After the deck, a paper section: NEW IN, a horizontal rail of 2:3 product cards from the catalogue.

STORY: The visitor lands on the cover photograph under the wordmark, scrolls or taps the arrow, and WOMAN slides up and holds; then MAN, KIDS, SALE, PERFUMES, each a whole-card link into its section; the deck releases into NEW IN with twelve real products (WOMAN, MAN, KIDS links at the rail's head), then the footer.

FIRST VIEWPORT (desktop 1800): `hero.jpeg` full-bleed under the chrome; the wordmark fixed at the right edge at 58% of the viewport height; the arrow at the bottom right; nothing else. Scrolling one viewport brings WOMAN over it: its photograph full-bleed, its title at (32, bottom-32) in the serif at 96px, the cover behind it lifted 15% and dimmed to half. Phone: the same with titles at 48px and the wordmark at its 96px floor.

FORM: Stacked deck, #5 on the ordered list (1 stacked campaigns with a display voice, 2 split gate, 3 hover index, 4 magazine contents spread, 5 stacked deck, 6 horizontal filmstrip, 7 shoppable feed); dealt lead of seed key dfd96a21 (alternates dealt: split gate, shoppable feed). Code-led: no image generation in this harness.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Signature interaction

The deck: every card is `position: sticky` at the top and one viewport tall; the next card slides over it on scroll, and the covered card's photograph translates up 15% and dims to 50% ink in step with the coverage (a scroll-bound variable, no easing), its title fading first. Each chrome instrument inverts to paper with the card under its own band: the top chrome (hamburger, search, bag column) with the card under the top tenth, the wordmark with the card under 58%, the arrow with the card at the bottom, so nothing reads paper over a still-light card. The whole card is the link: its photograph settles to 1.03 over 1.2s ease-out-expo while the pointer rests on it (each dealt card lands with a breath), and the title alone takes a hairline underline on hover and keyboard focus; focusing a covered card's link deals it. After the deck, the NEW IN rail pages by one visible width from a hairline previous/next pair at its head (desktop; phones swipe). Proximity settle: when the scroll comes to rest with the next card 60% or more of the way up, the deck completes the deal with the arrow's 700ms ease-out-expo tween; a card nudged less than 15% returns; anything between rests where it was, and any wheel, touch, key or pointer cancels a tween in flight (no CSS scroll snapping). Reduced motion: cards stack without the drift; the dim stays; settles and the arrow jump instead of tweening.

## Boundaries

Keep the six photographs in `public/home`, the `BlockImage` all-at-once loading rule, the header-theme inversion, the fixed wordmark and the arrow. Do not touch listing, PDP, menu, or footer. The cookie banner may move up on desktop to clear the titles.

## Open decisions

Whether the cover should carry a seasonal line once real campaign copy exists (no invented claims until then).
