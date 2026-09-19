import { HomeSlides } from "@/components/home/HomeSlides";

// The NEW IN rail reads the catalogue; refresh it on the same cadence as listings.
export const revalidate = 300;

export default function Home() {
  return <HomeSlides />;
}
