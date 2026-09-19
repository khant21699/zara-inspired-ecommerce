import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProduct, fetchRelated } from "@/lib/api/products";
import { Page } from "@/components/ui/Page";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductRail } from "@/components/product/ProductRail";

// Rendered on request and cached; the catalogue comes from the API.
export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  // A longer list so COMPLETE YOUR LOOK can reach past the item's own category.
  const related = await fetchRelated(slug, 24);

  return (
    <Page bleed wide>
      <ProductDetail product={product} related={related} />
      <ProductRail title="You may also like" products={related.slice(0, 8)} />
    </Page>
  );
}
