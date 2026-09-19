# Zara-inspired storefront (frontend)

A Next.js 16 / React 19 / Tailwind v4 recreation of the layout and interaction patterns of a
minimalist fashion e-commerce site. Non-commercial portfolio project; not affiliated with any brand.
Product imagery is generated placeholder art — drop real URLs into `Product.images` to replace it.

## Run

```bash
npm install
npm run dev
```

## What works (no backend)

| Route | Notes |
| --- | --- |
| `/` | Full-screen editorial slides with scroll snapping |
| `/woman`, `/man`, `/kids` | Redirect to the section's NEW IN |
| `/[section]/[category]` | Listing grid, filters (sort/colour/size), grid density toggle, quick add |
| `/product/[slug]` | Gallery, colour + size selection, add to bag, wishlist, accordions, related rail |
| `/search` | Live client-side search with section tabs and trending terms |
| `/bag` | Shopping bag persisted in `localStorage` |
| `/wishlist` | Wishlist persisted in `localStorage` |
| `/help`, `/help/[topic]` | Help centre with searchable FAQs |
| `/company`, `/join-life`, `/legal/[slug]` | Static content |

## Coming soon (needs a backend)

`/login`, `/register`, `/account`, `/checkout`, `/stores`, `/gift-card`, `/newsletter`,
`/careers`, `/pre-owned`, `/help/my-account`, `/help/my-purchases`, `/help/contact`.
Each renders the `ComingSoon` component with a greyed-out preview of the eventual UI.

## Structure

```
app/            routes (App Router)
components/     layout chrome, product UI, search, bag, help
lib/data/       catalog structure, products, colours, help content
lib/store.ts    localStorage-backed bag / wishlist / cookie consent (useSyncExternalStore)
lib/silhouettes.ts  SVG garment silhouettes used for placeholder imagery
```
