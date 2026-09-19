"use client";

import { useState, type ReactNode } from "react";
import { ChevronDownIcon } from "./Icons";
import { cn } from "@/lib/format";

interface Props {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Accordion({ title, children, defaultOpen = false, className }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn("border-b border-line", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-2xs uppercase"
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-xs leading-relaxed text-ink/80">{children}</div>
        </div>
      </div>
    </div>
  );
}
