import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getRelated } from "@/lib/data/products";
import { Page } from "@/components/ui/Page";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductRail } from "@/components/product/ProductRail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // A longer list so COMPLETE YOUR LOOK can reach past the item's own category.
  const related = getRelated(product, 24);

  return (
    <Page bleed wide>
      <ProductDetail product={product} related={related} />
      <ProductRail title="You may also like" products={related.slice(0, 8)} />
    </Page>
  );
}
