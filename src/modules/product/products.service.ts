import { query } from "../../db/pool.ts";
import { AppError } from "../../middleware/error.ts";

export async function getProduct(id: string) {
  const rows = await query(
    "SELECT id, name, price FROM products WHERE id = $1",
    [id],
  );
  if (rows.length === 0)
    throw new AppError(404, "Product not found", "PRODUCT_NOT_FOUND");
  return rows[0];
}

export async function getAllProducts() {
  const rows = await query("SELECT id, name, price FROM products");
  if (rows.length === 0)
    throw new AppError(404, "Products not found", "PRODUCTS_NOT_FOUND");
  return rows;
}
