import { Router } from "express";
import {
  getAllProducts,
  getProductByID,
} from "../../modules/product/product.controller.ts";

export const productsRouter = Router();

productsRouter.get("/:id", getProductByID);
productsRouter.get("/", getAllProducts);
