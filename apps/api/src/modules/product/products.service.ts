import { query } from "../../db/pool.js";
import { AppError } from "../../middleware/error.js";
import type {
  Colour,
  ListQuery,
  ProductDetail,
  ProductSummary,
  SearchQuery,
  Section,
} from "./products.types.js";

/*
 * Every listing/detail row carries the same core columns plus two JSON
 * aggregates: `colours` (name, hex, images, and each colour's sizes with
 * stock) and `sizes` (the product's distinct sizes in display order). The
 * mappers below turn rows into the API shapes; prices stay in cents.
 */
const PRODUCT_SELECT = `
  SELECT
    p.id, p.slug, p.name, p.ref, p.description, p.composition, p.section,
    c.slug AS category, c.name AS category_name,
    p.price_cents, p.compare_at_cents, p.is_new, p.is_best_seller, p.created_at,
    (
      SELECT coalesce(jsonb_agg(jsonb_build_object(
        'name', pc.name, 'hex', pc.hex, 'images', pc.images,
        'sizes', (
          SELECT coalesce(jsonb_agg(jsonb_build_object('size', v.size, 'inStock', v.stock_qty > 0) ORDER BY v.position), '[]'::jsonb)
          FROM variants v WHERE v.colour_id = pc.id AND v.is_active
        )
      ) ORDER BY pc.position), '[]'::jsonb)
      FROM product_colours pc WHERE pc.product_id = p.id
    ) AS colours,
    (
      SELECT coalesce(jsonb_agg(s.size ORDER BY s.position), '[]'::jsonb)
      FROM (
        SELECT v.size, min(v.position) AS position
        FROM product_colours pc JOIN variants v ON v.colour_id = pc.id
        WHERE pc.product_id = p.id AND v.is_active
        GROUP BY v.size
      ) s
    ) AS sizes
  FROM products p
  JOIN categories c ON c.id = p.category_id
`;

interface Row {
  id: string;
  slug: string;
  name: string;
  ref: string;
  description: string;
  composition: string;
  section: Section;
  category: string;
  category_name: string;
  price_cents: number;
  compare_at_cents: number | null;
  is_new: boolean;
  is_best_seller: boolean;
  created_at: Date;
  colours: Colour[];
  sizes: string[];
}

function toSummary(row: Row): ProductSummary {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    ref: row.ref,
    section: row.section,
    category: row.category,
    priceCents: row.price_cents,
    compareAtCents: row.compare_at_cents,
    isNew: row.is_new,
    isBestSeller: row.is_best_seller,
    colours: row.colours,
    sizes: row.sizes,
    images: row.colours[0]?.images ?? [],
  };
}

function toDetail(row: Row): ProductDetail {
  return { ...toSummary(row), description: row.description, composition: row.composition };
}

const SORT_SQL: Record<ListQuery["sort"], string> = {
  // Rows seeded in one statement share a timestamp, so lead with the merchandising flags.
  recommended: "p.is_best_seller DESC, p.is_new DESC, p.created_at ASC, p.slug ASC",
  newest: "p.is_new DESC, p.created_at DESC, p.slug ASC",
  "price-asc": "p.price_cents ASC, p.slug ASC",
  "price-desc": "p.price_cents DESC, p.slug ASC",
};

/**
 * Listing for a section and category. The virtual categories NEW IN,
 * SPECIAL PRICES (sale) and BEST SELLERS are flags, not category rows.
 */
export async function listProducts(q: ListQuery) {
  const where: string[] = ["p.status = 'live'", "p.section = $1"];
  const params: unknown[] = [q.section];

  switch (q.category) {
    case undefined:
      break;
    case "new-in":
      where.push("p.is_new");
      break;
    case "sale":
      where.push("p.compare_at_cents IS NOT NULL");
      break;
    case "best-sellers":
      where.push("p.is_best_seller");
      break;
    default:
      params.push(`${q.section}/${q.category}`);
      where.push(`c.path = $${params.length}`);
  }
  if (q.colours.length > 0) {
    params.push(q.colours);
    where.push(
      `EXISTS (SELECT 1 FROM product_colours pc WHERE pc.product_id = p.id AND pc.name = ANY($${params.length}::text[]))`,
    );
  }
  if (q.sizes.length > 0) {
    params.push(q.sizes);
    where.push(
      `EXISTS (SELECT 1 FROM product_colours pc JOIN variants v ON v.colour_id = pc.id
               WHERE pc.product_id = p.id AND v.is_active AND v.size = ANY($${params.length}::text[]))`,
    );
  }

  const whereSql = where.join(" AND ");
  const countRows = await query<{ count: string }>(
    `SELECT count(*)::text AS count FROM products p JOIN categories c ON c.id = p.category_id WHERE ${whereSql}`,
    params,
  );
  const total = Number(countRows[0]?.count ?? 0);

  const offset = (q.page - 1) * q.limit;
  const rows = await query<Row>(
    `${PRODUCT_SELECT} WHERE ${whereSql} ORDER BY ${SORT_SQL[q.sort]} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, q.limit, offset],
  );

  return { items: rows.map(toSummary), total, page: q.page, limit: q.limit };
}

export async function getProduct(slug: string): Promise<ProductDetail> {
  const rows = await query<Row>(`${PRODUCT_SELECT} WHERE p.status = 'live' AND p.slug = $1`, [slug]);
  const row = rows[0];
  if (!row) throw new AppError(404, "Product not found", "PRODUCT_NOT_FOUND");
  return toDetail(row);
}

/** Same category first, then the rest of the section; never the product itself. */
export async function getRelated(slug: string, limit: number): Promise<ProductSummary[]> {
  const rows = await query<Row>(
    `${PRODUCT_SELECT}
     JOIN products self ON self.slug = $1
     WHERE p.status = 'live' AND p.section = self.section AND p.id <> self.id
     ORDER BY (p.category_id = self.category_id) DESC, p.created_at ASC, p.slug ASC
     LIMIT $2`,
    [slug, limit],
  );
  if (rows.length === 0) {
    // Distinguish "no neighbours" from "no such product".
    await getProduct(slug);
  }
  return rows.map(toSummary);
}

/** Full-text match on name + description, with a plain substring fallback for partial words. */
export async function searchProducts(q: SearchQuery) {
  const params: unknown[] = [q.q, `%${q.q}%`];
  let sectionSql = "";
  if (q.section) {
    params.push(q.section);
    sectionSql = `AND p.section = $${params.length}`;
  }
  const rows = await query<Row>(
    `${PRODUCT_SELECT}
     WHERE p.status = 'live' ${sectionSql}
       AND (p.search_tsv @@ plainto_tsquery('english', $1) OR p.name ILIKE $2)
     ORDER BY ts_rank(p.search_tsv, plainto_tsquery('english', $1)) DESC, p.created_at ASC, p.slug ASC
     LIMIT $${params.length + 1}`,
    [...params, q.limit],
  );
  return { items: rows.map(toSummary), total: rows.length };
}
