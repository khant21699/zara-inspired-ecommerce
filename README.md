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
