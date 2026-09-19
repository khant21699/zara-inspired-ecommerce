import { Router } from "express";
import { asyncHandler } from "../../middleware/error.js";
import { getCategoryTree } from "../../modules/category/categories.service.js";

export const categoriesRouter = Router();

categoriesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json({ items: await getCategoryTree() });
  }),
);
