import { notFound, redirect } from "next/navigation";
import { SECTION_SLUGS, isSectionSlug } from "@/lib/data/catalog";

export function generateStaticParams() {
  return SECTION_SLUGS.map((section) => ({ section }));
}

export default async function SectionPage({ params }: PageProps<"/[section]">) {
  const { section } = await params;
  if (!isSectionSlug(section)) notFound();
  redirect(`/${section}/new-in`);
}
