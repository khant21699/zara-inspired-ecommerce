import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every viewport corner belongs to the chrome (menu, search, VIEW switch, home
  // arrow), so the dev indicator is off; the error overlay is unaffected.
  devIndicators: false,
  images: {
    // Product data accepts real image URLs; allow any https host so they can
    // be dropped in without touching config.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    // The catalogue's placeholder art (placehold.co) is served as SVG, which the
    // optimiser refuses by default. Allow it, sandboxed and never inline.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
