import pg from "pg";
import { env } from "../config/env.js";

const isLocalDb = false;

export const pool = new pg.Pool({
  connectionString: isLocalDb ? env.DATABASE_URL : process.env.DATABASE_URL,
  ...(isLocalDb ? {} : { ssl: { rejectUnauthorized: false } }),
});

export async function query<T extends pg.QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  const result = await pool.query<T>(text, params);
  return result.rows;
}
