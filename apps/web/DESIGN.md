---
name: Zara-inspired storefront
description: Paper, ink, one hairline weight; four instruments float at the viewport edges and product carries the page.
colors:
  ink: "#000000"
  paper: "#ffffff"
  caption-grey: "#767676"
  hairline-grey: "#e5e5e5"
  special-prices-pink: "#e5007d"
  studio-canvas: "#f4f3f1"
typography:
  wordmark:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(96px, 12.9vw, 300px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.06em"
  menu-section:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "27px"
    fontWeight: 400
    lineHeight: "36px"
    letterSpacing: "-0.02em"
  home-card-title:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Times New Roman, serif"
    fontSize: "clamp(48px, 6.6vw, 96px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.03em"
  product-name:
    fontFamily: "Helvetica Neue, Inter, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 300
    lineHeight: "24px"
    letterSpacing: "normal"
  chrome:
    fontFamily: "Helvetica Neue, Inter, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 300
    lineHeight: "22px"
    letterSpacing: "normal"
  body:
    fontFamily: "Helvetica Neue, Inter, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 300
    lineHeight: "18px"
    letterSpacing: "normal"
  label:
    fontFamily: "Helvetica Neue, Inter, Helvetica, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 300
    lineHeight: "16px"
    letterSpacing: "normal"
rounded:
  none: "0px"
spacing:
  chrome-x: "16px"
  chrome-x-md: "32px"
  chrome-top: "104px"
  chrome-top-md: "160px"
  gutter-phone: "8px"
  row-chrome: "32px"
  row-menu: "36px"
  row-size: "40px"
  block-gap: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.chrome}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "40px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  input-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 0"
  chip-sale:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 4px"
  chrome-word:
    textColor: "{colors.ink}"
    typography: "{typography.chrome}"
    height: "32px"
    padding: "5px 0"
  size-option:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.chrome}"
    rounded: "{rounded.none}"
    height: "40px"
---

# Design System: Zara-inspired storefront

## Overview

**Creative North Star: "Instruments at the Edges"**

There is no header bar. The page is a white sheet; four instruments float at its corners (menu top-left, search top-right, bag / log in / help stacked at the right edge, filters at the left edge on listings, the view switch bottom-left) and content runs underneath them in a centred column. Everything the interface says, it says in one light uppercase sans at 11, 12 or 13px; the only display voice is the Didone, and it is used three ways: the oversized wordmark fixed over the home deck (reprised at the head of the open menu), the 27px section names in the menu, and the same section names at up to 96px, one per card, on the home deck. This is a faithful recreation of the live zara.com `layout-ss26` grammar measured at 1800px on 2026-09-16, so convention is the commitment and the reference's craft is the bar.

Density is editorial rather than catalogue: 2:3 imagery in a hero-then-pair rhythm with wide white gutters, product info as three short lines beneath each picture, a product page where the photograph owns the page and the buy column is a narrow annotation beside it. The build refuses the category defaults it replaced: the full-width header with a centred logo, the sticky listing toolbar with breadcrumb and count, the boxed buy panel with a filled CTA and chevron accordions, the 440px drawer menu, and hero slides carrying an eyebrow, a display title, a subline and a button (the home deck sets one serif name per card and nothing else).

Depth is flat. Ink on paper, one hairline (1px; 0.5px on the product page's outlined buttons), no radius anywhere, no shadows on interface surfaces. State is expressed by underline, by inversion (ink fills paper on hover), by opacity, and by the chrome, wordmark and arrow each turning to paper over a dark home card.

**Key Characteristics:**
- Floating chrome, never a bar: every instrument reads `--chrome-x` / `--chrome-top` and content starts below them in a `--page-col` column.
- One sans, one weight: Helvetica Neue Light 300 (Inter 300 self-hosted fallback) in uppercase at 13px chrome, 12px running copy, 11px product info.
- Controls are words; the two-line hamburger, the bracketed bag count, the `+` quick add and the bookmark are the enumerated glyph exceptions.
- Flat ink on paper: no radius, no interface shadows, hairlines only.
- Reduced prices as a black chip with white text; pink is reserved for the menu's SPECIAL PRICES link.
- 2:3 imagery in listings and product pages, on a warm studio canvas until real product photography lands; the home deck runs full-bleed photographs from `public/home/`, cropped `object-cover` with the focal point 35% in from the left, each card sticky under the next.

## Colors

Two colours do the work; a caption grey, a hairline grey, a warm image canvas and one pink complete the set.

### Primary
- **Ink** (`{colors.ink}`): all type, all hairlines, the sale chip and primary button fills, the active view number, the hamburger lines, the ground of the dark home cards and the veil that dims a covered card. Inverts to paper over dark home cards, one band at a time, via `html[data-header-theme]`, `[data-mark-theme]` and `[data-arrow-theme]`.

### Secondary
- **Special-Prices Pink** (`{colors.special-prices-pink}`): the single SPECIAL PRICES link inside the open menu. It appears nowhere else; reduced prices on cards and product pages use the black chip, not pink.

### Neutral
- **Paper** (`{colors.paper}`): the page, the menu sheet, the zoom viewer, the filters drawer, secondary and outlined button grounds, the home cover's ground, the NEW IN card that closes the home deck, the chrome colour over dark cards.
- **Caption Grey** (`{colors.caption-grey}`): the `VIEW` label, the `|01|` group numerals, the menu's secondary links, empty-state copy, placeholder text, "Size M" in the bag toast. Secondary information, never a control at rest except the muted menu links.
- **Hairline Grey** (`{colors.hairline-grey}`): dividers between size rows, the phone view-switch strip's top border, unselected size and swatch outlines, accordion dividers on legacy pages.
- **Studio Canvas** (`{colors.studio-canvas}`): the ground behind every 2:3 image slot (cards, gallery, rail, thumbnails, bag toast), the ground of the light home cards, and the hover fill on product-page size rows.

Derived tints seen in the build, not tokens: ink at up to 50% as the veil over a covered home card, ink at 60% for the buy column's hairline, black at 10% for colour-swatch borders, paper at 95% behind the card's quick-add sheet, paper at 60% with a 2px blur as the filters scrim.

### Named Rules
**The Black Chip Rule.** A reduced price is the original struck through in ink followed by `-NN%  $ price` set white on an ink chip. No red, no pink on listings or product pages.
**The One Pink Rule.** `{colors.special-prices-pink}` colours exactly one string, the menu's SPECIAL PRICES link. Any other pink is a defect.
**The Inversion Rule.** Over a `data-slide="dark"` home card each instrument switches to paper with the card under its own band: the top chrome with the card under the top tenth (`data-header-theme`), the wordmark with the card under 58% (`data-mark-theme`), the arrow with the card at the bottom (`data-arrow-theme`), so nothing reads paper over a still-light card. The open menu lays paper over everything and forces the chrome back to ink.

## Typography

**Display Font:** Bodoni Moda via `next/font` as `--font-wordmark` (with Bodoni 72, Didot, Times New Roman) — a licensed-logo stand-in for the reference's Didone wordmark; wordmark, menu section names and home card titles only.
**Body Font:** Helvetica Neue (with Inter 300/400 self-hosted as `--font-sans-fallback`, then Helvetica, Arial) — stand-in for Helvetica Now Text.

**Character:** A single light weight of a neutral grotesque, always uppercase in the interface, set small and left alone; the Didone is the only face allowed to be large, and it only ever says the house name or a section name.

### Hierarchy
- **Wordmark** (500, `clamp(96px, 12.9vw, 300px)`, line-height 1, tracking -0.06em): the home only, fixed at the right edge and vertically centred at 58% of the viewport over the whole deck, fading out (300ms) once the closing NEW IN card holds the viewport. The menu reuses the face at 92px (44px on phones, where it is the only way home) at the head of the sheet, line-height 0.9, same tracking, as a link to `/`.
- **Home card title** (400, `clamp(48px, 6.6vw, 96px)`, line-height 1, tracking -0.03em, uppercase): WOMAN / MAN / KIDS / SALE / PERFUMES, once per deck card at (`--chrome-x`, bottom-24/32), paper on dark cards, ink on light; a 1px underline at 0.12em offset on hover and keyboard focus. It fades out over the first half of the card's coverage.
- **Menu section** (400, 27px, 36px rows, tracking -0.02em): WOMAN / MAN / KIDS / PRE-OWNED in the open menu, uppercase, with a 4px ink dot 20px left of the active one.
- **Product name** (300, 15px / 24px): the product-page title. The only 15px in the system.
- **Chrome** (300, 13px / 22px, uppercase): every floating instrument (SEARCH, BAG, LOG IN, HELP, FILTERS, VIEW, CLOSE), the NEW IN head row on the home, product-page price and buttons, size rows, menu category links.
- **Body** (300, 12px / 18px): product descriptions, panel bodies, cookie and help copy, the product page's floating composition (uppercase, one fibre per line). Mixed case except where noted.
- **Label** (300, 11px / 16px, uppercase): the `body` default. Card name and price, `COLOUR | REF`, menu group numerals and secondary links, panel link titles, rail captions, toast copy, filter options.

### Named Rules
**The Three Sizes Rule.** Interface text is 13px, 12px or 11px. Larger sizes exist only for the wordmark, the menu sections, the home card titles (all three in the Didone) and the 15px product name; a display headline on a shopping surface is a defect.
**The Light Weight Rule.** The sans is set at 300 everywhere; the active view number is the only permitted step up (to 400). The wordmark alone uses 500.
**The Uppercase Rule.** Controls, labels, names and prices are uppercase; only descriptions, panel bodies and policy copy run in mixed case.

## Layout

The chrome owns the margins. Two custom properties describe it: `--chrome-x` (16px on phones, 32px from the 48rem breakpoint) and `--chrome-top` (104px, then 160px). Every fixed instrument is positioned from those values and every page starts at `pt: var(--chrome-top)` inside a centred column of `--page-col` (100% on phones with a 16px gutter; `min(72vw, 1440px)` from 48rem, which at 1800px yields the measured 252→1548 column). `Page` accepts `bleed` (drops the phone gutter only) and `wide` (full viewport width, used by the product page).

Measured desktop positions at 1800px: hamburger 64×1px lines at (32,32) and (32,47), crossing to an X on open; SEARCH 170px wide, right-aligned at 32px from the edge, 1px underline (120px wide on phones); BAG `|n|`, LOG IN, HELP stacked at the right edge from y=160 in 32px rows; FILTERS at (32,160); the VIEW switch fixed at (32, bottom-32); the home arrow fixed bottom-right at (`--chrome-x`, bottom-28); the cookie box bottom-left at (`--chrome-x`, bottom `--chrome-top`), clear of the deck titles. On phones the stack collapses to BAG alone under SEARCH, FILTERS sits at (16,56) the view switch becomes a full-width paper strip pinned to the bottom with a hairline top, and the cookie box sits 16px in from the edges at the bottom.

Listing rhythm (column widths as percentages of the 1296px column): view 1 is heroes at 74.23%; view 2 (default) cycles hero, pair, pair with pairs at 47.84% and a 4.32% gutter (56px); view 3 is six-up at `calc((100% - 5 × 3.086%) / 6)` (183px) with 40px gutters and 16px row gaps. Views 1 and 2 use a 112px row gap. On phones the views map to 1 / 2 / 3 columns with 8px gutters. Card info sits 16px below the image (12px, centred, name dropped in the six-up).

Product page: the gallery starts at the top of the viewport (the page pulls up 128px against `--chrome-top`); shots alternate 43% wide at 12.9% from the left and 35.2% wide at 51.6%, 112px apart, with the composition floating at the vertical centre left of the second shot. The buy column is absolute at 62% from the left, 24.2% wide, from y=133; ADD and PAY are a two-column grid with an 18px gap. On phones the gallery is a snap-x swipe strip and the buy column follows at 16px gutters.

Menu: a fixed paper sheet under the chrome; wordmark at the column's left edge, then a three-column row 86px below: sections 22%, numbered groups 31.3% (labels 45% of that), image rail of 174px-wide 2:3 tiles with 7px gaps filling the remainder. Home: a deck. The cover and the five section cards are each `position: sticky; top: 0` and one viewport tall (`h-svh`), so ordinary scrolling slides each card up over the one holding the viewport; there is no CSS scroll snapping, only a proximity settle: when the scroll comes to rest with the next card 60% or more of the way up, the deck completes the deal with its 700ms ease-out-expo tween, and a card nudged less than 15% returns; anything between rests where it was, and any wheel, touch or key cancels a tween in flight. Each card's title sits at (`--chrome-x`, bottom-24; bottom-32 from 48rem). The deck closes with a paper card that follows the page rule: `pt: var(--chrome-top)` inside `--page-col` on desktop (16px gutters on phones), a head row of NEW IN with WOMAN / MAN / KIDS beside it (24/40px gaps) and the rail controls at the right, then 24/40px down a horizontal snap-x rail of 2:3 cards, each (100% − 4×24px)/4.5 wide at 24px gaps on desktop (four and a half visible) and (100% − 8px)/2.2 at 8px gaps on phones, scroll-padded to `--chrome-x`; 64/80px below to the footer.

## Elevation & Depth

Flat. No interface surface carries a shadow; the cookie box, bag toast, quick-add sheet and filters drawer are paper with a 1px ink border or a translucent paper scrim. Layering is expressed by paint order (home arrow z-40, menu z-50, chrome z-60, cookie z-65, zoom z-70) and by the chrome's colour inversion over dark cards, not by lift. The home deck's depth is the same flatness in motion: a covered card recedes by lifting its photograph 15% and drawing a 50% ink veil over it, bound to the scroll with no easing; no shadow exists anywhere in the build.

### Named Rules
**The No-Lift Rule.** Surfaces never float on shadows. Overlays are paper sheets; separation is a hairline or a scrim.

## Shapes

Right angles only; `border-radius` is 0 on every element, including inputs, buttons, chips, swatches and image slots. The single exception is the 4px circular dot that marks the active menu section. Hairlines are 1px ink (or hairline grey when passive) and 0.5px on the product page's outlined buttons. Images are always 2:3 boxes on studio canvas. The bag count is a bracket glyph: an 18px-tall box with left, right and bottom 1px ink borders and no top, 20px minimum width, 12px digits at -0.5px tracking.

## Components

Refined and nearly silent: words for controls, hairlines for structure, inversion for state.

### Buttons
- **Shape:** square (0px), uppercase, weight 300.
- **Primary** (`.btn-primary`): ink fill, paper text, 44px tall, 24px side padding, 11px. Hover drops to 85% opacity; disabled 40% with `not-allowed`. Cookie accept, filters "View results", bag toast, bag and checkout flows.
- **Secondary** (`.btn-secondary`): paper fill, 1px ink border, same box and size. Hover inverts to ink on paper. Cookie reject, filters "Clear".
- **Outline** (`.btn-outline`): the product page's ADD / PAY pair: paper, 0.5px ink border, 40px tall, 16px side padding, 13px chrome size. Hover inverts. Never a filled block on the product page.
- **Transitions:** 200ms ease on opacity or background/colour.

### Chips
- **Sale chip:** ink ground, paper text, 4px side padding, inline in the price line after the struck original; reads `-29%  $ 49.90` with two spaces.
- **Bag count:** the bracket glyph described under Shapes, following the word BAG with an 8px gap.
- **Size options (listing quick add / filters):** 11px uppercase in a 1px hairline-grey box (min 36px wide, 6px/8px padding); hover raises the border to ink; selected in filters inverts to ink.

### Cards / Containers
- **Product card:** a 2:3 image slot on studio canvas with a 500ms cross-fade to the detail crop on hover; below it, 16px down, the name (11px, truncated, underline on hover), the price line, then 10px colour squares with a 10% black border at 6px gaps; a 12px `+` glyph at the right edge opens a size sheet (paper at 95% with blur, fade-up) inside the image. Six-up variant centres the price and `+` and drops name and colours; the `compact` variant on the home rail keeps name, price and colours but drops the `+`.
- **Paper boxes (cookie, toast):** 1px ink border, paper ground, 20–24px padding, fade-up on entry; no radius, no shadow.
- **Filters drawer:** full-height paper panel up to 28rem wide sliding in over a 60% paper scrim with 2px blur, 500ms ease-out-expo.

### Inputs / Fields
- **Line input** (`.input-line`): borderless, transparent, 1px ink bottom rule, 10px vertical padding, uppercase caption-grey placeholder, no outline. Text inherits the 11px/300 body.
- **Focus:** chrome links draw a 1px `currentColor` outline offset 4px; the menu button rings its lines at 8px offset instead of its oversized hit area.

### Account forms
- **Shell:** a 360px column centred in the page column (`/login`, `/register`); `/account` runs at the column's left edge like any content page. The heading is 13px uppercase — the form is the page, so no display type is spent on it.
- **Field:** an 11px caption-grey label over a full-width line input (12px), 32px between fields. An invalid field sets `aria-invalid` and prints its message beneath in 11px uppercase ink, tied to the input with `aria-describedby`.
- **Form error** (a rejected sign-in, a taken e-mail): one 11px uppercase line with `role="alert"` above the button, separated by a full-width ink hairline.
- **Submit:** the primary button at full width; while the action is in flight it is disabled, `aria-busy`, and its label takes the present participle (LOGGING IN…, CREATING ACCOUNT…, LOGGING OUT…). The alternative route (register / log in) follows in 11px caption grey with the link in ink.
- **Account page:** a definition list on hairlines (11px caption-grey term, value right-aligned), then primary + secondary buttons side by side from 40rem, then the sections this project has not built as a hairline list with a caption-grey note on each. The menu's secondary list carries LOG OUT as a plain caption-grey word while a session exists.

### Navigation
- **Chrome:** fixed, pointer-events off except on the instruments, 13px uppercase, 300ms colour transition. Words underline on hover (1px, 4px offset); SEARCH thickens its underline to 2px instead. Bag, log in, help are 32px rows with 5px vertical padding, right-aligned.
- **Hamburger:** two 1px ink lines 15px apart in a 64×16px box (40px wide on phones); on open each line translates 7.5px and rotates 45° over 500ms ease-out-expo into an X, the only close control besides Escape.
- **Menu sheet:** fixed paper, 300ms fade, `inert` when closed. Sections in the serif list (underline at 8px offset on hover); category links 13px uppercase on 36px rows; secondary links 11px caption grey turning ink on hover; SPECIAL PRICES in pink.
- **Listing instruments:** FILTERS as a chrome word (count in parentheses when active); VIEW as a caption-grey label above `1 2 3` at 13px, active at full opacity and weight 400, others at 40% until hover.

### Price
- 11px on cards (`sm`), 13px on the product page (`md`); plain price alone, or struck original + sale chip in a single non-wrapping line. Dense six-up cards hide the struck price on phones.

### Product page buy column
- 15px name with a 1px bookmark glyph at the right (filled when wishlisted); 13px price line; a 60%-ink hairline; `COLOUR | REF` at 11px with 16px swatches (active one ringed at 2px offset); the ADD / PAY outline pair; a 40px-row size list on hairline-grey dividers that fades up beneath ADD and closes on choice; 12px description; COMPLETE YOUR LOOK as 66px 2:3 thumbnails at 2px gaps; four 11px uppercase text links (24px rows, underline on hover) that expand their body in 12px in place. No chevrons, no boxes.

### Home deck
- **Cards:** the cover (photograph only, `aria-hidden`, paper ground) then WOMAN / MAN / KIDS / SALE / PERFUMES, each `sticky top-0 h-svh overflow-hidden`; dark cards are ink ground with paper text, light cards studio canvas with ink. The whole card is one `Link` into its section; the photograph inside `.deck-photo` settles to 1.03 over 1200ms ease-out-expo while the pointer rests on it, and only the title underlines. `BlockImage` holds each photograph invisible until it has fully decoded, then shows it in one go.
- **Coverage:** the client `Deck` sets `--covered` (0..1) on every card each frame from how far the next card has slid over it. CSS reads it: `.deck-photo` lifts `translate3d(0, calc(var(--covered) * -15%), 0)`, `.deck-dim` (an ink veil) sits at `opacity: calc(var(--covered) * 0.5)`, `.deck-title` fades at `clamp(0, 1 - var(--covered) * 2, 1)`. Reduced motion drops the lift and keeps the dim. Focusing a covered card's link deals it (scrolls the deck to that card). **Settle:** on `scrollend` (or a 120ms pause in scroll events where it is missing) the controller reads the fractional depth and, inside the deck only, completes a deal at 60% or more, returns one under 15%, and leaves the rest alone, through the same tween the arrow uses (`components/home/tween.ts`, one at a time, cancelled by any wheel, touch, key or pointer).
- **Per-band inversion:** the same controller writes `data-header-theme` from the card under the top tenth, `data-mark-theme` from the card under 58%, `data-arrow-theme` from the card at the bottom; `globals.css` maps each to paper on the chrome, the wordmark and the arrow. `data-home-deck="end"` once the NEW IN card holds the viewport fades the wordmark and arrow out (300ms) and disables them.
- **Arrow:** a 20px 1.2px-stroke arrow fixed at (right `--chrome-x`, bottom-20/28), z-40, tweening the scroll to the next card over 700ms ease-out-expo (instant under reduced motion); hidden at deck end.
- **NEW IN rail:** the closing paper card. Head row in 13px uppercase: NEW IN in ink, WOMAN / MAN / KIDS in caption grey turning ink and underlined on hover, and on desktop a hairline previous/next pair (the 20px arrow, one rotated 180°) at the right edge. Below, up to twelve `ProductCard compact` tiles from `fetchNewIn` in a `snap-x snap-mandatory` rail with the scrollbar hidden; the section renders nothing while the catalogue is unreachable.
- **Rail controls:** each button pages the rail by one visible width with smooth scroll and fades to 25% opacity (300ms) when its end is reached; phones swipe and the pair is hidden.

### Icons
- Stroke set at 1.2px (`currentColor`, round caps and joins, 24px viewBox): close, plus, check, arrow-right and the legacy chevrons; the bookmark alone is 1px. Rendered at 12–24px (the home arrow and the rail's previous/next at 20px, previous being arrow-right rotated). The chrome itself uses none of them; controls there are words.

## Do's and Don'ts

### Do:
- **Do** position every fixed instrument from `--chrome-x` and `--chrome-top`, and start every page at `pt: var(--chrome-top)` inside `w: var(--page-col)`; nothing may collide with the chrome.
- **Do** set interface text in the sans at weight 300, uppercase, at 13px (chrome), 12px (copy) or 11px (product info and labels).
- **Do** show reduced prices as the struck original followed by the black chip with `-NN%  $ price` in paper.
- **Do** keep every image slot 2:3 on studio canvas (`{colors.studio-canvas}`).
- **Do** express state by underline (1px, 4px offset), inversion (ink on paper), or opacity (40% / 85%), with 200–500ms transitions on `--ease-out-expo` or plain ease.
- **Do** keep controls as words; when a glyph is required use the 1.2px stroke set at 12–24px.
- **Do** make product-page actions outlined (`.btn-outline`: 0.5px, 40px) and reserve the filled primary for consent, filters and bag/checkout flows.
- **Do** make each home card a whole-card link carrying its section name once in the Didone at `clamp(48px, 6.6vw, 96px)`, and invert each instrument only with the card under its own band.

### Don't:
- **Don't** add a header bar, a centred logo on inner pages, breadcrumbs, listing titles or item counts; the reference has none.
- **Don't** use any radius, shadow or gradient on interface surfaces; the build carries no shadow at all.
- **Don't** use red or pink for prices or anywhere outside the menu's SPECIAL PRICES link.
- **Don't** set the sans above 15px or below 300 weight on shopping surfaces; the wordmark, the menu sections and the home card titles, all in the Didone, are the only large type.
- **Don't** put kickers, eyebrows, sublines, buttons or a second line of copy on home cards; each card carries its section name once and nothing else, and the sans never sets a title there.
- **Don't** replace the product page's text-link panels with chevron accordions or a boxed buy panel.
