"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";

interface Props {
  src: string;
  priority?: boolean;
  className?: string;
}

/**
 * Full-bleed home photograph that stays invisible until the whole file has
 * decoded, then appears in one go; it never paints line by line. The block
 * ground shows until then. A cached image can finish before React attaches
 * `onLoad`, so the mounted element is checked as well.
 */
export function BlockImage({ src, priority, className }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <Image
      ref={ref}
      src={src}
      alt=""
      fill
      sizes="100vw"
      priority={priority}
      onLoad={() => setLoaded(true)}
      className={cn("object-cover object-[35%_50%]", loaded ? "opacity-100" : "opacity-0", className)}
    />
  );
}
