# Migrations

Plain SQL, applied in filename order by `src/db/migrate.ts` and recorded in
`schema_migrations`. Name files with a zero-padded sequence and a short verb:

    001_create_products.sql
    002_add_product_images.sql

Rules:
- Never edit a file after it has been applied anywhere; add a new one.
- One concern per file; keep them forward-only (no down migrations).
- `npm run db:migrate` from the repo root (or `apps/api`) applies what is pending.
