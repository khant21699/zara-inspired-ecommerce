import type { Metadata } from "next";
import { Page } from "@/components/ui/Page";
import { SearchView } from "@/components/search/SearchView";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <Page bleed>
      <SearchView />
    </Page>
  );
}
