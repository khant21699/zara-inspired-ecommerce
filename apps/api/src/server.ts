// src/server.ts
import app from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./db/pool.js";

/**
 * Serverless hosts (Vercel) import this module and invoke the exported app
 * per request; there is no port to listen on and no process to shut down.
 * Everywhere else (local dev, Railway, Render, Fly) we run a real server.
 */
export default app;

if (!process.env.VERCEL) {
  const server = app.listen(env.PORT, () => {
    console.log(`Listening on http://localhost:${env.PORT}`);
  });

  const shutdown = (signal: string) => {
    console.log(`${signal} received, shutting down`);
    server.close(async () => {
      await pool.end();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}
