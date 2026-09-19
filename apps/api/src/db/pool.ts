import pg from "pg";
import { env } from "../config/env.js";

// Hosted Postgres needs TLS; a local server on localhost does not offer it.
const { hostname } = new URL(env.DATABASE_URL);
const isLocalDb = ["localhost", "127.0.0.1", "::1"].includes(hostname);

export const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ...(isLocalDb ? {} : { ssl: { rejectUnauthorized: false } }),
});

export async function query<T extends pg.QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  const result = await pool.query<T>(text, params);
  return result.rows;
}
