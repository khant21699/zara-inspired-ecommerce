# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: reviewers of the author's craft.** Recruiters, hiring managers, and prospective clients who open a portfolio link for a few minutes, on a phone or a laptop, often with the real zara.com open beside it. Their job is to judge whether the author can ship a production-grade fashion storefront end to end (frontend, API, database), not to buy anything.

**Secondary: the simulated shopper.** The reviewer tests the site by behaving like one: browse WOMAN / MAN / KIDS, land on a category, filter, open a product, pick a colour and size, add to bag, search, check the bag. Every one of those paths is the reviewer's evidence.

## Product Purpose

A faithful, non-commercial recreation of a minimalist fashion e-commerce storefront (Zara) built as a portfolio project: Next.js 16 / React 19 / Tailwind v4 frontend plus an Express 5 / Postgres API. It exists to demonstrate front-end and full-stack craft under a demanding reference.

Success: on the routes that work, a reviewer cannot distinguish the fidelity and polish from the reference; the planned backend features (catalog from the API, accounts, checkout) genuinely function rather than being mocked; nothing on screen is a dead end without saying so.

## Positioning

Fidelity is the feature. This is not a generic e-commerce template or a "Zara-flavoured" original; it reproduces one specific reference's information architecture, category structure, labels, and interaction patterns, and it is wired to a real API and database rather than being a static mock. A neighbouring portfolio clone that stops at the frontend, or a starter template that generalises the patterns, cannot truthfully make the same claim.

## Operating Context

- Reviewed via a shared link; the comparison target is the live reference site. Phone and desktop both matter.
- Two runnable apps in the parent folder. `../`: Express API, `npm run dev` (`tsx watch src/server.ts`), `PORT` and `DATABASE_URL` from `.env`, hosted Postgres over SSL. ``: Next.js App Router, `npm run dev`. The frontend does not yet call the API; it reads static data.
- The repo root is the single git repository for both apps.
- Client state (bag, wishlist, cookie consent) is persisted in `localStorage` under `zara-clone:v1` via `lib/store.ts`.
- Next.js 16 carries breaking changes versus common training data; `AGENTS.md` requires reading `node_modules/next/dist/docs/` before writing framework code.

## Capabilities and Constraints

**Working today (no backend):**
- `/` full-screen editorial slides with scroll snapping; header inverts over dark slides.
- `/woman`, `/man`, `/kids` redirect to that section's NEW IN.
- `/[section]/[category]` listing grid with sort / colour / size filters, grid-density toggle, quick add. Virtual categories NEW IN, SALE, BEST SELLERS are computed from product flags.
- `/product/[slug]` gallery, colour and size selection, add to bag, wishlist, accordions (description, composition, ref), related rail.
- `/search` live client-side search with section tabs and trending terms.
- `/bag`, `/wishlist` persisted locally.
- `/help`, `/help/[topic]` help centre with searchable FAQs (10 topics in `lib/data/help.ts`).
- `/company`, `/join-life`, `/legal/[slug]` static content.

**Planned (confirmed 2026-09-16):**
- ~~Catalog served from the Express API~~ — done 2026-09-19: listings, product pages, search, related items and the menu rail read the API; the static catalogue now lives only as the seed source in `apps/api/scripts/source/products.ts`.
- Accounts & login (registration, login, My Account, purchase history).
- Checkout, orders, and payments with a real payment provider.
- Real product photography supplied by the author to replace generated placeholders.

**Currently rendering `ComingSoon`, not confirmed as planned:** `/stores`, `/gift-card`, `/newsletter`, `/careers`, `/pre-owned`, `/help/contact`. Treat as open until the author decides.

**API today:** `GET /products` (section/category/sort/colour/size filters, paging), `GET /products/:slug`, `GET /products/:slug/related`, `GET /search`, `GET /categories`, `GET /health`, documented at `GET /docs` (OpenAPI). Postgres holds `categories`, `products`, `product_colours` (images per colour) and `variants` (stock per colour × size); prices are cents.

**Terminology:** sections (WOMAN, MAN, KIDS); categories; virtual categories (NEW IN, SALE, BEST SELLERS); *bag*, never cart; wishlist; quick add; ref (product reference number); compareAt (pre-sale price); Join Life (responsibility label); Pre-owned (repair / resell / donate).

**Locale and money:** English only; single market; prices formatted as `$ 0.00` (`lib/format.ts`). A country selector exists in the chrome but does not change market, currency, or language.

**Stack constraints:** TypeScript throughout; Tailwind v4 (`@theme inline` in `app/globals.css`); Express 5 with zod 4 validation; no test suite in either app.

**Undecided:** payment provider; authentication mechanism and session strategy; whether the unconfirmed ComingSoon routes get backends; additional markets, currencies, or languages; an accessibility standard to target.

## Brand Commitments

- **The reference is the live zara.com layout, not an older memory of it.** Confirmed 2026-09-16 after a side-by-side audit: the site's current desktop layout (their CSS calls it `layout-ss26`) is the bar. Its measured grammar: no header bar or wordmark on inner pages; a 64px two-line hairline hamburger at (32,32); `SEARCH` right-aligned 32px from the right edge with a 170px 1px underline; `BAG |0|`, `LOG IN`, `HELP` stacked vertically at the right edge from y=160 in 32px rows; `FILTERS` floating at (32,160); `VIEW 1 2 3` fixed bottom-left; content in a centered column (252→1548 at 1800px); Helvetica Now Text weight 300 at 13px (chrome), 11px (product info), 12px (descriptions), 15px (PDP name); sale prices as a black chip with white text; outlined 0.5px 40px buttons; product images 2:3. Desktop was measured; mobile could not be, so mobile follows the same grammar by judgement until measured.
- **The home may depart from the reference; inner pages may not.** Confirmed by the author on 2026-09-19 ("it does not have to be 1 to 1 copy of zara it just need to be attractive"): the landing page is judged on attractiveness against other fashion houses' homes (COS, Uniqlo, Aritzia were surveyed), while listing, product, bag, menu and chrome keep the measured `layout-ss26` grammar. The home's current form is the deck recorded in `.impeccable/surfaces/app-page-tsx.md`.
- **Name and wordmark stay "ZARA".** Confirmed by the author: keep the recreation faithful. The wordmark, the `%s | ZARA` title template, the section and category names, and the secondary menu (GIFT CARD, STORE LOCATOR, PRE-OWNED, JOIN LIFE, NEWSLETTER, HELP, MY ACCOUNT) mirror the reference.
- **The disclaimer stays.** Footer and README state: non-commercial portfolio project, not affiliated with any brand. Future work must not remove or soften it, and must not add anything that implies affiliation or real commerce.
- **Wordmark asset:** Bodoni Moda via `next/font` (`--font-wordmark`), a stand-in for the reference's Didone wordmark. Recorded as an existing asset, not a direction.
- **Voice:** terse, uppercase labels; product copy in the reference's declarative garment register ("Dress with a round neckline and wide straps. Invisible side zip fastening."). Help and policy copy is brief and procedural.

## Evidence on Hand

- **Catalog:** 266 products across three sections in `lib/data/products.ts`, with colours in `lib/data/colors.ts` and structure in `lib/data/catalog.ts`. Prices, names, sizes, and descriptions are plausible reference-style copy, not real merchandise.
- **Imagery:** six home photographs in `public/home/` (author-generated, 1200×896, used full-bleed on the home deck) are the only real pictures. Product placeholders are `placehold.co` tiles from the seed data, and before that generated SVG garment silhouettes (`lib/silhouettes.ts`, rendered by `components/product/ProductArt.tsx`). `Product.images` accepts `https` URLs from any host (`next.config.ts`). Real photography is promised by the author but not yet delivered; do not fabricate photographic claims or use stock imagery presented as the collection.
- **Help content:** 10 topics in `lib/data/help.ts`.
- **Company and Join Life copy** (`/company` facts such as "1975", "200+ markets online", "2 weeks design to store", "52 collections a year"; the four Join Life pillars) is reference-brand narrative reproduced for fidelity. It describes the reference, not this project. Keep it as is; do not extend it into new claims, statistics, or commitments.
- **Database:** a hosted Postgres `products` table with at least `id, name, price`. Contents not verified during this interview.
- **Accounts:** real since 2026-09-28. Better Auth in the API (`/auth/*`, email + password, sessions in Postgres); the web app signs people in through its own server and keeps the API session token in a first-party HttpOnly cookie. `/login`, `/register` and `/account` are live; purchases, returns, addresses and payment methods on the account page are honestly labelled as not connected.
- **Absent, never to be fabricated:** testimonials, customers, press, real orders, store locations, delivery or returns guarantees beyond the reference-style help copy already present.

## Product Principles

1. **Fidelity over invention.** Where the reference already answers a question (structure, labels, flows, states), follow it. Original ideas belong only where the reference has nothing to say.
2. **The first three minutes are the review.** Home → category → product → bag on phone and desktop is the core deliverable; secondary routes earn attention only after that path is flawless.
3. **Every path works or says so.** Unfinished areas state plainly that they depend on a backend; no dead controls, no silent failures.
4. **The backend seam is real.** As the API grows, the frontend consumes it; static data is a stopgap to retire, never a second source of truth.
5. **Truthful about what this is.** The disclaimer and the non-commercial framing are part of the product; nothing added may imply affiliation, real stock, or real transactions.
