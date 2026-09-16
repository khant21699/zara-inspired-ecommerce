// src/app.ts
import express from "express";
import { notFound, errorHandler } from "./middleware/error.ts";
import { healthRouter } from "./routes/health/health.routes.ts";
import { productsRouter } from "./routes/product/products.routes.ts";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/products", productsRouter);
  // app.use("/api/products", productsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
