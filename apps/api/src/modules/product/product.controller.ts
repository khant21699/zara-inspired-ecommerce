import { asyncHandler } from "../../middleware/error.js";
import { parse } from "../../middleware/validate.js";
import * as service from "./products.service.js";
import { listQuerySchema, relatedQuerySchema, searchQuerySchema, slugSchema } from "./products.types.js";

export const listProducts = asyncHandler(async (req, res) => {
  res.json(await service.listProducts(parse(listQuerySchema, req.query)));
});

export const getProduct = asyncHandler(async (req, res) => {
  res.json(await service.getProduct(parse(slugSchema, req.params.slug)));
});

export const getRelated = asyncHandler(async (req, res) => {
  const slug = parse(slugSchema, req.params.slug);
  const { limit } = parse(relatedQuerySchema, req.query);
  res.json({ items: await service.getRelated(slug, limit) });
});

export const searchProducts = asyncHandler(async (req, res) => {
  res.json(await service.searchProducts(parse(searchQuerySchema, req.query)));
});
