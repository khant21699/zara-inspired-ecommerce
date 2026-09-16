import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTIONS, getCategory, getSection, isSectionSlug } from "@/lib/data/catalog";
import { getProducts } from "@/lib/data/products";
import { Page } from "@/components/ui/Page";
import { ProductGrid } from "@/components/product/ProductGrid";

export function generateStaticParams() {
  return SECTIONS.flatMap((s) => s.categories.map((c) => ({ section: s.slug, category: c.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[section]/[category]">): Promise<Metadata> {
  const { section, category } = await params;
  const s = getSection(section);
  const c = getCategory(section, category);
  if (!s || !c) return {};
  return { title: `${s.name} ${c.name}` };
}

export default async function CategoryPage({ params }: PageProps<"/[section]/[category]">) {
  const { section, category } = await params;
  if (!isSectionSlug(section)) notFound();
  const s = getSection(section);
  const c = getCategory(section, category);
  if (!s || !c) notFound();

  const products = getProducts(section, category);

  // The listing opens on product: categories live in the menu, the heading is
  // for assistive tech and the document title only.
  return (
    <Page bleed className="pb-32">
      <ProductGrid products={products} title={`${s.name} · ${c.name}`} titleVisible={false} />
    </Page>
  );
}
