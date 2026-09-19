// src/app.ts
import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { notFound, errorHandler } from "./middleware/error.js";
import { healthRouter } from "./routes/health/health.routes.js";
import { categoriesRouter } from "./routes/category/categories.routes.js";
import { docsRouter } from "./routes/docs/docs.routes.js";
import { productsRouter, searchRouter } from "./routes/product/products.routes.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.FRONTEND_ORIGIN }));
  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/products", productsRouter);
  app.use("/search", searchRouter);
  app.use("/categories", categoriesRouter);
  app.use(docsRouter); // GET /docs, GET /openapi.json

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
