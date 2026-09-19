import Image from "next/image";
import { useId } from "react";
import type { Product } from "@/lib/types";
import { luminance } from "@/lib/data/colors";
import { BACKDROPS_DARK, BACKDROPS_LIGHT, SILHOUETTES } from "@/lib/silhouettes";
import { cn } from "@/lib/format";

interface Props {
  product: Product;
  /** 0 = front, 1 = detail crop, 2 = mirrored, 3 = alternate crop */
  variant?: 0 | 1 | 2 | 3;
  colorIndex?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const VARIANT_TRANSFORM = [
  "",
  "translate(-70 -110) scale(1.85)",
  "translate(200 0) scale(-1 1)",
  "translate(-110 -240) scale(2.2)",
];

/**
 * Product imagery. Renders the real photo when a URL exists, otherwise a
 * generated studio-style placeholder tinted with the product colour.
 */
export function ProductArt({
  product,
  variant = 0,
  colorIndex = 0,
  className,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority,
}: Props) {
  const gradientId = useId();
  const src = product.images[variant];

  if (src) {
    return (
      <Image
        src={src}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  const garment = product.colors[colorIndex]?.hex ?? product.colors[0].hex;
  const pale = luminance(garment) > 0.7;
  const palette = pale ? BACKDROPS_DARK : BACKDROPS_LIGHT;
  const backdrop = palette[(product.tone + variant) % palette.length];
  const shape = SILHOUETTES[product.shape];

  return (
    <svg
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={product.name}
      className={cn("block h-full w-full", className)}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="28%" r="85%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor={backdrop} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill={backdrop} />
      <rect width="200" height="300" fill={`url(#${gradientId})`} />
      <g transform={VARIANT_TRANSFORM[variant]}>
        <ellipse cx="100" cy="272" rx="66" ry="7" fill="#000" opacity="0.07" />
        <path d={shape.body} fill={garment} />
        {shape.detail && (
          <path
            d={shape.detail}
            fill={shape.strokeDetail ? "none" : garment}
            stroke={shape.strokeDetail ? backdrop : "none"}
            strokeWidth={shape.strokeDetail ? 3 : 0}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={shape.strokeDetail ? 0.6 : 1}
          />
        )}
      </g>
    </svg>
  );
}
