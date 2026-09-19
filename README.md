# Zara-inspired storefront

Non-commercial portfolio recreation of a minimalist fashion e-commerce site. Not affiliated with any brand.

One repository, two apps, deployed separately:

| App | Path | Stack | Deploy |
| --- | --- | --- | --- |
| Web | `apps/web` | Next.js 16 · React 19 · Tailwind v4 | Vercel (root directory `apps/web`) |
| API | `apps/api` | Express 5 · Postgres (`pg`) · zod | Railway / Render / Fly (root directory `apps/api`) |

## Run

```bash
npm install            # installs both workspaces
cp apps/api/.env.example apps/api/.env   # then fill in DATABASE_URL

npm run dev            # web on :3000 and api on :4000 together
npm run dev:web        # or one at a time
npm run dev:api
```

## Build

```bash
npm run build          # both
npm run build:web      # next build
npm run build:api      # tsc → apps/api/dist
npm run typecheck
npm run lint
```

## Layout

```
apps/
  api/   src/ (app, routes, modules, db, middleware) · .env
  web/   app/ (routes) · components/ · lib/ · public/ · PRODUCT.md · DESIGN.md
```

`apps/web/PRODUCT.md` records the product truth and `apps/web/DESIGN.md` the design system; both are the authority for new UI work.

## API

Express 5 + Postgres, in `apps/api`. Development base URL: `http://localhost:4000`.

The API documents itself: **`GET /docs`** is an interactive reference (try requests, copy snippets in any language) rendered from **`GET /openapi.json`**, the OpenAPI 3.1 document at `apps/api/src/openapi.json`. That file is the contract; keep it in step with the routes. The guide below is the same information for reading in the repo.

### Conventions

- Every response is JSON. Prices are **integers in cents** (`priceCents: 4990` → $49.90); the client formats them.
- Sections are `woman`, `man`, `kids`. Categories are slugs (`dresses`, `jackets`, `girl`, …) plus three **virtual** ones that are flags rather than rows: `new-in`, `sale` (SPECIAL PRICES), `best-sellers`.
- Colour and size filters are comma-separated and case-insensitive (`colours=black,ecru`, `sizes=m,l`).
- Only `status = 'live'` products are ever returned.
- Errors always look like:
  ```json
  { "error": { "code": "VALIDATION_ERROR", "message": "section: Invalid option: expected one of \"woman\"|\"man\"|\"kids\"" } }
  ```
  `400 VALIDATION_ERROR` for a bad query, `404 PRODUCT_NOT_FOUND` for an unknown slug, `404 NOT_FOUND` for an unknown route, `500 INTERNAL_ERROR` otherwise.
- CORS: browsers may call the API only from the origins listed in `FRONTEND_ORIGIN` (comma-separated; default `http://localhost:3000`; `*` matches anything, so `https://*.vercel.app` covers preview deployments). Server-side fetches from Next are not subject to it, so a wrong value shows up as a broken search (the one browser-side call) while listings still render.

### Product shape

Listing items and the detail share one shape; the detail adds `description` and `composition`.

```json
{
  "id": "5f1c…",
  "slug": "linen-blend-mini-dress-p40004535",
  "name": "LINEN BLEND MINI DRESS",
  "ref": "1185/165",
  "section": "woman",
  "category": "dresses",
  "priceCents": 4990,
  "compareAtCents": 6990,
  "isNew": true,
  "isBestSeller": false,
  "sizes": ["XS", "S", "M", "L", "XL"],
  "images": ["https://placehold.co/600x900/c9b58f/1a1a1a?text=LINEN+BLEND+MINI+DRESS", "…"],
  "colours": [
    {
      "name": "SAND",
      "hex": "#c9b58f",
      "images": ["https://placehold.co/600x900/…", "…"],
      "sizes": [
        { "size": "XS", "inStock": true },
        { "size": "S",  "inStock": true },
        { "size": "M",  "inStock": false },
        { "size": "L",  "inStock": true },
        { "size": "XL", "inStock": true }
      ]
    },
    { "name": "OLIVE", "hex": "#4d5a3c", "images": ["…"], "sizes": ["…"] }
  ],
  "description": "Collared dress with long sleeves and buttoned cuffs. …",
  "composition": "OUTER SHELL\n95% viscose, 5% elastane\n\nLINING\n100% polyester"
}
```

- `compareAtCents` is `null` unless the item is on sale; when set it is always higher than `priceCents`.
- `images` is the first colour's images (what a card shows); each colour carries its own under `colours[].images`.
- `sizes` at the top level is the union across colours in display order; stock is per colour under `colours[].sizes`.

### `GET /products` — listing

| Query | Values | Default |
| --- | --- | --- |
| `section` | `woman` · `man` · `kids` | **required** |
| `category` | a category slug, or `new-in` · `sale` · `best-sellers` | whole section |
| `sort` | `recommended` · `newest` · `price-asc` · `price-desc` | `recommended` |
| `colours` | comma-separated colour names | none |
| `sizes` | comma-separated sizes | none |
| `page` | ≥ 1 | `1` |
| `limit` | 1–60 | `30` (a multiple of the listing's five-card cycle) |

```
GET /products?section=woman&category=sale
GET /products?section=woman&category=dresses&colours=black&sizes=m&sort=price-asc
GET /products?section=man&category=new-in&page=2&limit=30
```

```json
{ "items": [ …product… ], "total": 30, "page": 1, "limit": 30 }
```

`total` is the count for the whole filter, not the page, so pages = `ceil(total / limit)`.

### `GET /products/:slug` — detail

```
GET /products/linen-blend-mini-dress-p40004535
```

Returns the full product shape above, `404 PRODUCT_NOT_FOUND` otherwise. The slug is the last path segment of the web app's product URL.

### `GET /products/:slug/related`

| Query | Values | Default |
| --- | --- | --- |
| `limit` | 1–24 | `8` |

Products from the same category first, then the rest of the section; never the product itself.

```json
{ "items": [ …product… ] }
```

### `GET /search`

| Query | Values | Default |
| --- | --- | --- |
| `q` | 1–80 characters | **required** |
| `section` | `woman` · `man` · `kids` | all |
| `limit` | 1–60 | `30` |

Full-text search on name and description (stemmed: `dresses` finds `dress`), with a substring fallback so partial words work while typing (`dres`).

```
GET /search?q=coat&section=man
```

```json
{ "items": [ …product… ], "total": 6 }
```

### `GET /categories`

The tree the menu renders: sections at the root, their categories beneath, in display order.

```json
{
  "items": [
    {
      "slug": "woman", "name": "WOMAN", "path": "woman",
      "categories": [
        { "slug": "dresses", "name": "DRESSES", "path": "woman/dresses" },
        { "slug": "tops", "name": "TOPS", "path": "woman/tops" }
      ]
    }
  ]
}
```

The virtual categories are not in this tree; the web app adds NEW IN, SPECIAL PRICES and BEST SELLERS itself.

### `GET /health`

`{ "message": "OK" }` — for the host's health check.

### Environment

`apps/api/.env` (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string. TLS is used automatically unless the host is `localhost`. |
| `PORT` | Local port (`4000`). Hosts inject their own in production. |
| `FRONTEND_ORIGIN` | Allowed browser origins, comma-separated; `*` wildcards allowed. Must include the deployed web app's origin, e.g. `https://zara-inspired-ecommerce.vercel.app,https://*.vercel.app,http://localhost:3000`. |
| `NODE_ENV` | `development` (default) or `production` (hides error details). |

### Database

```
apps/api/
├── migrations/001_product_zone.sql      schema: categories, products, product_colours, variants
└── seeds/
    ├── 01_categories/categories.sql     3 sections + their categories
    ├── 02_products/products.sql         266 products
    ├── 03_product_colours/…             541 colours with placeholder images
    └── 04_variants/…                    2,517 colour × size variants with stock
```

- `npm run db:migrate` applies pending migrations in order and records them in `schema_migrations`. If you applied a migration by hand, record it once so the runner skips it: `INSERT INTO schema_migrations (name) VALUES ('001_product_zone.sql');`
- `npm run db:seed` runs the seed folders in order. Seeds are idempotent (`ON CONFLICT DO NOTHING`); run them again after a dropped connection and they fill in what is missing.
- `npm run db:seed:generate -w apps/api` regenerates the seed files from the web app's static catalogue.

### Adding an endpoint

Follow the existing shape: a zod schema for the query/params in `src/modules/<name>/<name>.types.ts`, SQL in `<name>.service.ts` (parameterised, never interpolated), a thin controller wrapped in `asyncHandler` that calls `parse(schema, req.query)`, and a router in `src/routes/<name>/` mounted in `src/app.ts`. Throw `AppError(status, message, code)` for expected failures; the error middleware formats it.
