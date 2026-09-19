import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { SILHOUETTES } from "@/lib/silhouettes";
import type { Shape } from "@/lib/types";
import { BlockImage } from "./BlockImage";
import { NextArrow } from "./NextArrow";
import { SnapScroll } from "./SnapScroll";
import { cn } from "@/lib/format";

interface Figure {
  shape: Shape;
  color: string;
}

interface Slide {
  title: string;
  href: string;
  /** Photograph under public/. Used when the file exists; the studio placeholder otherwise. */
  image: string;
  backdrop: [string, string];
  figures: Figure[];
  /** Dark blocks invert the chrome to paper. Set it to match the photograph. */
  dark?: boolean;
}

/**
 * Cover block media. `poster` alone gives a full-bleed photograph; add `video`
 * for a muted looping film over it (the still remains for reduced motion).
 * The cover stays paper while neither file exists. Set `dark` to match.
 */
const COVER = {
  video: "/home/cover.mp4",
  /** Optional 9:16 cut for phones; the landscape file is cropped when absent. */
  portrait: "/home/cover-portrait.mp4",
  poster: "/home/hero.jpeg",
  dark: false,
};

const SLIDES: Slide[] = [
  {
    title: "Woman",
    image: "/home/wemen.jpeg",
    href: "/woman/new-in",
    backdrop: ["#e6e1d8", "#c9c1b4"],
    figures: [
      { shape: "coat", color: "#1d1c1a" },
      { shape: "dress", color: "#8a2a33" },
      { shape: "trousers", color: "#e8e2d6" },
    ],
  },
  {
    title: "Man",
    image: "/home/men.jpeg",
    href: "/man/new-in",
    backdrop: ["#5a5852", "#2d2c29"],
    figures: [
      { shape: "jacket", color: "#0f0f0f" },
      { shape: "shirt", color: "#d9d2c3" },
      { shape: "knit", color: "#3b4a5c" },
    ],
    dark: true,
  },
  {
    title: "Kids",
    image: "/home/kids.jpeg",
    href: "/kids/new-in",
    backdrop: ["#efe7dc", "#dccbb4"],
    figures: [
      { shape: "onesie", color: "#c98f8f" },
      { shape: "tee", color: "#2b3a67" },
      { shape: "dress", color: "#e5d9c1" },
    ],
  },
  {
    title: "Sale",
    image: "/home/sales.jpeg",
    href: "/woman/sale",
    backdrop: ["#141414", "#000000"],
    figures: [
      { shape: "skirt", color: "#b3202a" },
      { shape: "top", color: "#f2ede4" },
      { shape: "bag", color: "#b8895b" },
    ],
    dark: true,
  },
  {
    title: "Perfumes",
    image: "/home/perfume.jpeg",
    href: "/woman/perfumes",
    backdrop: ["#d8cfc2", "#b9ad9c"],
    figures: [
      { shape: "perfume", color: "#3a2a22" },
      { shape: "perfume", color: "#c8a951" },
      { shape: "perfume", color: "#f1ead8" },
    ],
  },
];

function FigureArt({
  figure,
  index,
  dark,
}: {
  figure: Figure;
  index: number;
  dark?: boolean;
}) {
  const shape = SILHOUETTES[figure.shape];
  return (
    <svg
      viewBox="0 0 200 300"
      className={cn(
        "h-[62svh] w-auto max-w-[70vw] drop-shadow-[0_30px_40px_rgba(0,0,0,0.12)] md:h-[70svh]",
        index !== 1 && "hidden md:block",
        index === 0 && "md:translate-y-10",
        index === 2 && "md:-translate-y-6",
      )}
      aria-hidden
    >
      <ellipse
        cx="100"
        cy="280"
        rx="70"
        ry="8"
        fill={dark ? "#fff" : "#000"}
        opacity="0.08"
      />
      <path d={shape.body} fill={figure.color} />
      {shape.detail && (
        <path
          d={shape.detail}
          fill={shape.strokeDetail ? "none" : figure.color}
          stroke={shape.strokeDetail ? (dark ? "#000" : "#fff") : "none"}
          strokeWidth={shape.strokeDetail ? 2.5 : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={shape.strokeDetail ? 0.35 : 1}
        />
      )}
    </svg>
  );
}

/*
 * Reference home: a paper cover holding only the chrome and the fixed
 * wordmark, then full-bleed image blocks scrolling beneath it, one arrow at
 * the bottom right. The blocks here are the placeholder studio slides.
 */
export function HomeSlides() {
  return (
    <>
      <SnapScroll />
      <CoverBlock />
      <NextArrow />
      {SLIDES.map((slide, i) => {
        const photo = existsSync(join(process.cwd(), "public", slide.image));
        return (
          <section
            key={slide.title}
            data-slide={slide.dark ? "dark" : "light"}
            className={cn(
              "relative flex h-svh items-center justify-center overflow-hidden",
              !photo && "grain",
              slide.dark ? "text-paper" : "text-ink",
            )}
            style={
              photo
                ? undefined
                : {
                    backgroundImage: `linear-gradient(180deg, ${slide.backdrop[0]} 0%, ${slide.backdrop[1]} 100%)`,
                  }
            }
          >
            {photo ? (
              <BlockImage src={slide.image} priority={i === 0} />
            ) : (
              <div className="flex items-end justify-center gap-6 md:gap-16">
                {slide.figures.map((f, j) => (
                  <FigureArt key={j} figure={f} index={j} dark={slide.dark} />
                ))}
              </div>
            )}

            <h2 className="absolute bottom-6 left-(--chrome-x) z-10 text-chrome uppercase md:bottom-8">
              <Link
                href={slide.href}
                className="hover:underline hover:underline-offset-4"
              >
                {slide.title}
              </Link>
            </h2>
          </section>
        );
      })}
    </>
  );
}

function CoverBlock() {
  const video = existsSync(join(process.cwd(), "public", COVER.video));
  const portrait = existsSync(join(process.cwd(), "public", COVER.portrait));
  const poster = existsSync(join(process.cwd(), "public", COVER.poster));
  return (
    <section
      data-slide={(video || poster) && COVER.dark ? "dark" : "light"}
      aria-hidden
      className="relative h-svh overflow-hidden"
    >
      {(video || poster) && (
        <>
          {poster && <BlockImage src={COVER.poster} priority />}
          {video && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster ? COVER.poster : undefined}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-[35%_50%] motion-reduce:hidden",
                portrait && "hidden md:block",
              )}
            >
              <source src={COVER.video} type="video/mp4" />
            </video>
          )}
          {portrait && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster ? COVER.poster : undefined}
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden md:hidden"
            >
              <source src={COVER.portrait} type="video/mp4" />
            </video>
          )}
        </>
      )}
    </section>
  );
}
