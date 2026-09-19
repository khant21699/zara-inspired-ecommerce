import { asyncHandler } from "../../middleware/error.js";
import * as service from "./products.service.js";

export const getProductByID = asyncHandler(async (req, res) => {
  const product = await service.getProduct(req.params.id as string);
  res.json(product);
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await service.getAllProducts();
  res.json(products);
});
