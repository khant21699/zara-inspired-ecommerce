/**
 * Applies every pending SQL file in apps/api/migrations, in filename order,
 * each inside its own transaction, and records it in schema_migrations.
 *
 *   npm run db:migrate            (local, via tsx)
 *   node dist/db/migrate.js       (after `npm run build`, e.g. a host's pre-deploy step)
 */
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

// ../../migrations from both src/db/ and dist/db/.
const MIGRATIONS_DIR = fileURLToPath(new URL("../../migrations/", import.meta.url));

async function main() {
  const files = (await readdir(MIGRATIONS_DIR)).filter((f) => f.endsWith(".sql")).sort();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name       text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  const { rows } = await pool.query<{ name: string }>("SELECT name FROM schema_migrations");
  const applied = new Set(rows.map((r) => r.name));

  const pending = files.filter((f) => !applied.has(f));
  if (pending.length === 0) {
    console.log(`Up to date (${files.length} migration${files.length === 1 ? "" : "s"}).`);
    return;
  }

  for (const file of pending) {
    const sql = await readFile(new URL(file, `file://${MIGRATIONS_DIR}`), "utf8");
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
      await client.query("COMMIT");
      console.log(`applied  ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(`failed   ${file}`);
      throw error;
    } finally {
      client.release();
    }
  }
}

main()
  .then(() => pool.end())
  .catch(async (error) => {
    console.error(error);
    await pool.end();
    process.exit(1);
  });
