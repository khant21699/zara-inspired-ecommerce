/**
 * Runs every SQL file under apps/api/seeds/<NN_table>/ in path order, so the
 * numbered folders decide the sequence. Seeds are written to be idempotent
 * (ON CONFLICT DO NOTHING), so re-running is safe.
 *
 *   npm run db:seed
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.js";

const SEEDS_DIR = fileURLToPath(new URL("../../seeds/", import.meta.url));

async function main() {
  const entries = await readdir(SEEDS_DIR, { recursive: true });
  const files = entries.filter((f) => f.endsWith(".sql")).sort();
  for (const file of files) {
    const sql = await readFile(join(SEEDS_DIR, file), "utf8");
    await pool.query(sql);
    console.log(`seeded   ${file}`);
  }
}

main()
  .then(() => pool.end())
  .catch(async (error) => {
    console.error(error);
    await pool.end();
    process.exit(1);
  });
