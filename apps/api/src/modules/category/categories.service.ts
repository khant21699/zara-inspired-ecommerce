import { query } from "../../db/pool.js";

interface Row {
  slug: string;
  name: string;
  path: string;
  parent_path: string | null;
  position: number;
}

export interface CategoryNode {
  slug: string;
  name: string;
  path: string;
  categories?: CategoryNode[];
}

/** The tree the menu renders: sections at the root, their categories beneath. */
export async function getCategoryTree(): Promise<CategoryNode[]> {
  const rows = await query<Row>(
    `SELECT c.slug, c.name, c.path, parent.path AS parent_path, c.position
     FROM categories c
     LEFT JOIN categories parent ON parent.id = c.parent_id
     WHERE c.is_active
     ORDER BY c.position, c.path`,
  );
  const byPath = new Map<string, CategoryNode>();
  const roots: CategoryNode[] = [];
  for (const row of rows) {
    const node: CategoryNode = { slug: row.slug, name: row.name, path: row.path };
    byPath.set(row.path, node);
    if (row.parent_path === null) {
      roots.push({ ...node, categories: [] });
      byPath.set(row.path, roots[roots.length - 1]!);
    } else {
      byPath.get(row.parent_path)?.categories?.push(node);
    }
  }
  return roots;
}
