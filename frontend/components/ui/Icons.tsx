import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);
export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);
export const SearchIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5L21 21" />
  </svg>
);
export const UserIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
export const BagIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 8h14l1 13H4L5 8z" />
    <path d="M8.5 8V6.5a3.5 3.5 0 017 0V8" />
  </svg>
);
export const HeartIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base} {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20.5s-7.5-4.6-7.5-10A4.2 4.2 0 0112 7.8a4.2 4.2 0 017.5 2.7c0 5.4-7.5 10-7.5 10z" />
  </svg>
);
export const BookmarkIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base} {...p} strokeWidth={1} fill={filled ? "currentColor" : "none"}>
    <path d="M6 3.5h12v17l-6-4.5-6 4.5z" />
  </svg>
);
export const PlusIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);
export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);
export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);
export const TrashIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
);
export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6-6.2-6-11a6 6 0 0112 0c0 4.8-6 11-6 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </svg>
);
/** Grid density toggles used on listing pages. */
export const GridLargeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="4" width="16" height="16" />
  </svg>
);
export const GridMediumIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="4" width="7" height="7" />
    <rect x="13" y="4" width="7" height="7" />
    <rect x="4" y="13" width="7" height="7" />
    <rect x="13" y="13" width="7" height="7" />
  </svg>
);
export const GridSmallIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="4.5" height="4.5" />
    <rect x="9.75" y="3.5" width="4.5" height="4.5" />
    <rect x="16" y="3.5" width="4.5" height="4.5" />
    <rect x="3.5" y="9.75" width="4.5" height="4.5" />
    <rect x="9.75" y="9.75" width="4.5" height="4.5" />
    <rect x="16" y="9.75" width="4.5" height="4.5" />
    <rect x="3.5" y="16" width="4.5" height="4.5" />
    <rect x="9.75" y="16" width="4.5" height="4.5" />
    <rect x="16" y="16" width="4.5" height="4.5" />
  </svg>
);
