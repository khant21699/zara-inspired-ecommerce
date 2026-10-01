// src/app.ts
import cors from "cors";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth.js";
import { allowedOrigins } from "./config/cors.js";
import { env } from "./config/env.js";
import { notFound, errorHandler } from "./middleware/error.js";
import { healthRouter } from "./routes/health/health.routes.js";
import { categoriesRouter } from "./routes/category/categories.routes.js";
import { docsRouter } from "./routes/docs/docs.routes.js";
import { meRouter } from "./routes/me/me.routes.js";
import { productsRouter, searchRouter } from "./routes/product/products.routes.js";

export function createApp() {
  const app = express();

  // Browsers may call the API only from the web app's origins (server-side
  // fetches from Next are not subject to CORS). See config/cors.ts.
  // `credentials` lets those origins send and receive the session cookie.
  app.use(cors({ origin: allowedOrigins(env.FRONTEND_ORIGIN), credentials: true }));

  // Better Auth reads the raw request body itself, so it is mounted before
  // express.json(). Every auth route lives under /auth (see src/auth/auth.ts).
  app.all("/auth/{*any}", toNodeHandler(auth));

  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/products", productsRouter);
  app.use("/search", searchRouter);
  app.use("/categories", categoriesRouter);
  app.use("/me", meRouter);
  app.use(docsRouter); // GET /docs, GET /openapi.json

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

/**
 * Vercel's Express preset uses this file as the function entry and needs the
 * app itself as the default export. server.ts reuses the same instance.
 */
const app = createApp();
export default app;
