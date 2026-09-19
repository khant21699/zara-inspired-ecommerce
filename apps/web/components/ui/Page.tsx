import type { ReactNode } from "react";
import { cn } from "@/lib/format";

interface Props {
  children: ReactNode;
  /** Remove horizontal padding so grids can run edge to edge. */
  bleed?: boolean;
  /** Use the full viewport width instead of the centred column. */
  wide?: boolean;
  className?: string;
}

/**
 * Page shell: a centred column of --page-col that starts below the floating
 * chrome. `bleed` only removes the phone gutter; on desktop the chrome owns
 * the margins, so content always stays inside the column.
 */
export function Page({ children, bleed = false, wide = false, className }: Props) {
  return (
    <div
      className={cn(
        "mx-auto min-h-svh pt-(--chrome-top)",
        wide ? "w-full" : "w-(--page-col)",
        !bleed && "px-4 md:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
