import { Router } from "express";
import { getProduct, getRelated, listProducts, searchProducts } from "../../modules/product/product.controller.js";

export const productsRouter = Router();

productsRouter.get("/", listProducts);
productsRouter.get("/:slug", getProduct);
productsRouter.get("/:slug/related", getRelated);

export const searchRouter = Router();

searchRouter.get("/", searchProducts);
