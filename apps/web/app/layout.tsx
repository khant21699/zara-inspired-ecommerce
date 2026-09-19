import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { BagToast } from "@/components/layout/BagToast";

const wordmark = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-wordmark",
  display: "swap",
});

// Fallback body face with a real 300 weight for machines without Helvetica Neue.
const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-sans-fallback",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZARA | New Collection Online",
    template: "%s | ZARA",
  },
  description:
    "Discover the latest trends in clothing, shoes and accessories for women, men and kids. Zara-inspired storefront built as a portfolio project.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${wordmark.variable} ${sans.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <BagToast />
      </body>
    </html>
  );
}
