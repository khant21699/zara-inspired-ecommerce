# Zara-inspired storefront

Non-commercial portfolio recreation of a minimalist fashion e-commerce site. Not affiliated with any brand.

One repository, two apps, deployed separately:

| App | Path | Stack | Deploy |
| --- | --- | --- | --- |
| Web | `apps/web` | Next.js 16 · React 19 · Tailwind v4 | Vercel (root directory `apps/web`) |
| API | `apps/api` | Express 5 · Postgres (`pg`) · zod · Better Auth | Vercel / Railway / Render / Fly (root directory `apps/api`) |

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
  `400 VALIDATION_ERROR` for a bad query, `401 UNAUTHENTICATED` for a protected route without a session, `404 PRODUCT_NOT_FOUND` for an unknown slug, `404 NOT_FOUND` for an unknown route, `500 INTERNAL_ERROR` otherwise. Better Auth's own routes use its shape instead: `{ "code": "INVALID_EMAIL_OR_PASSWORD", "message": "…" }`.
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

### Authentication

Accounts are handled by [Better Auth](https://www.better-auth.com) running inside the API: email + password today, social sign-in when a provider is configured. Everything auth-related is under **`/auth/*`**, and its own interactive reference (every route, request and response) is at **`GET /auth/reference`**; the same routes also appear under the *Auth* tag in `/docs`.

```
src/auth/auth.ts             the Better Auth instance (config, plugins)
src/middleware/auth.ts       requireSession — guards routes, sets req.session
src/routes/me/me.routes.ts   GET /me, the first protected route
migrations/002_auth.sql      user, session, account, verification, rateLimit
```

**Routes you will use** (all `POST` bodies are JSON; `GET /auth/reference` has the rest, e.g. update-user, change-password, list-sessions):

| Route | Body | Returns |
| --- | --- | --- |
| `POST /auth/sign-up/email` | `{ name, email, password }` (password 8–128 chars) | `{ token, user }` + session |
| `POST /auth/sign-in/email` | `{ email, password, rememberMe? }` | `{ token, user }` + session |
| `GET /auth/get-session` | – | `{ session, user }` or `null` |
| `POST /auth/sign-out` | – | `{ success: true }` |
| `GET /me` | – | `{ user, session }` · `401 UNAUTHENTICATED` without a session |

**How a session travels.** Sign-up and sign-in establish a session and hand it back two ways at once; a client uses whichever fits where it runs:

1. **Cookie** — `better-auth.session_token` (`HttpOnly`; `SameSite=None; Secure` in production). The browser sends it back when the request is made with `credentials: "include"`, and CORS is configured to allow that for the origins in `FRONTEND_ORIGIN`. This is the right choice when the site and the API are the *same site* (localhost in development, or `shop.example.com` + `api.example.com` under one custom domain). Two different `*.vercel.app` hosts are different sites: Chrome keeps the cookie, Safari and Brave drop it as third-party.
2. **Bearer token** — the same session token arrives in the **`set-auth-token`** response header of sign-up / sign-in (exposed through CORS). Store it and send `Authorization: Bearer <token>`. Works from any origin and is what the web app uses against the deployed API.

`requireSession` accepts either. A signed `better-auth.session_data` cookie caches the session for five minutes so repeat requests skip the database; sign-out clears both cookies and deletes the session row.

```bash
# sign up, keep the cookie, call a protected route
curl -c jar -X POST $API/auth/sign-up/email -H 'content-type: application/json' \
  -d '{"name":"Ada","email":"ada@example.com","password":"correct-horse-battery"}'
curl -b jar $API/me

# or take the bearer token from the sign-in response header
TOKEN=$(curl -sD - -o /dev/null -X POST $API/auth/sign-in/email -H 'content-type: application/json' \
  -d '{"email":"ada@example.com","password":"correct-horse-battery"}' | grep -i '^set-auth-token:' | cut -d' ' -f2 | tr -d '\r')
curl $API/me -H "Authorization: Bearer $TOKEN"
```

**From the web app.** Use `createAuthClient` from `better-auth/react` with `baseURL: NEXT_PUBLIC_API_URL`, `basePath: "/auth"`, and the `bearer` client plugin (or pass `fetchOptions: { credentials: "include" }` on a same-site deployment); the client exposes `signUp.email`, `signIn.email`, `signOut`, and the `useSession` hook. Server components can call the API with the same bearer header.

**Protecting a route.** Add `requireSession` before the handler (or `router.use(requireSession)` for a whole router) and read `req.session.user` / `req.session.session`; see `src/routes/me/me.routes.ts`. Anything that must check ownership (a bag, an order) compares against `req.session.user.id`.

**Rules and limits.**
- Trusted origins for auth calls are the same `FRONTEND_ORIGIN` list (wildcards included); a request from any other `Origin` is refused with `INVALID_ORIGIN`.
- Rate limiting is on in production and stored in the `rateLimit` table (serverless instances share nothing else): 60 requests a minute per IP on auth routes, 10 a minute on sign-in and sign-up.
- Sessions last 30 days and are extended once a day of use.
- Email verification is not required and password reset is not wired: both need a mail sender (`sendVerificationEmail` / `sendResetPassword` in `src/auth/auth.ts`, e.g. Resend). Social providers go in the `socialProviders` block of the same file with their client id and secret from the environment.
- Users, sessions and accounts live in the catalogue's Postgres, in Better Auth's own tables (camelCase columns, quoted). Do not hand-edit them; when a Better Auth upgrade wants schema changes, `npm run auth:schema -w apps/api` regenerates the SQL into `migrations/auth.generated.sql` — copy what is new into a fresh numbered migration.
- `BETTER_AUTH_SECRET` signs cookies and tokens; rotating it signs everyone out. Generate one with `npm run auth:secret -w apps/api`.

### Environment

`apps/api/.env` (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string. TLS is used automatically unless the host is `localhost`. |
| `PORT` | Local port (`4000`). Hosts inject their own in production. |
| `FRONTEND_ORIGIN` | Allowed browser origins, comma-separated; `*` wildcards allowed. Must include the deployed web app's origin, e.g. `https://zara-inspired-ecommerce.vercel.app,https://*.vercel.app,http://localhost:3000`. |
| `BETTER_AUTH_SECRET` | ≥ 32 random characters; signs session cookies and tokens (`npm run auth:secret -w apps/api`). |
| `BETTER_AUTH_URL` | The API's own public URL (`http://localhost:4000` locally, `https://zara-inspired-ecommerce-api.vercel.app` on Vercel). Auth routes and cookies are derived from it. |
| `NODE_ENV` | `development` (default) or `production` (hides error details, turns on secure cookies and rate limiting). |

### Database

```
apps/api/
├── migrations/001_product_zone.sql      schema: categories, products, product_colours, variants
├── migrations/002_auth.sql              Better Auth: user, session, account, verification, rateLimit
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

Follow the existing shape: a zod schema for the query/params in `src/modules/<name>/<name>.types.ts`, SQL in `<name>.service.ts` (parameterised, never interpolated), a thin controller wrapped in `asyncHandler` that calls `parse(schema, req.query)`, and a router in `src/routes/<name>/` mounted in `src/app.ts`. Throw `AppError(status, message, code)` for expected failures; the error middleware formats it. A route that belongs to a signed-in user takes `requireSession` first (see Authentication) and never trusts a user id from the request body.
