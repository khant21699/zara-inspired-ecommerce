import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { BlockImage } from "./BlockImage";
import { Deck } from "./Deck";
import { NewIn } from "./NewIn";
import { NextArrow } from "./NextArrow";
import { cn } from "@/lib/format";

interface Card {
  title: string;
  href: string;
  /** Photograph under public/. The card shows its ground alone when the file is missing. */
  image: string;
  /** Dark photographs invert the chrome and the title to paper. Set it to match the file. */
  dark?: boolean;
}

/**
 * Cover media. Only the photograph ships today; drop a muted loopable film at
 * `video` (and optionally a 9:16 cut at `portrait`) and the cover plays it
 * over the still, which remains for reduced motion. Missing files are skipped.
 */
const COVER = {
  video: "/home/cover.mp4",
  /** Optional 9:16 cut for phones; the landscape file is cropped when absent. */
  portrait: "/home/cover-portrait.mp4",
  poster: "/home/hero.jpeg",
  dark: false,
};

const CARDS: Card[] = [
  { title: "Woman", image: "/home/wemen.jpeg", href: "/woman/new-in" },
  { title: "Man", image: "/home/men.jpeg", href: "/man/new-in", dark: true },
  { title: "Kids", image: "/home/kids.jpeg", href: "/kids/new-in" },
  { title: "Sale", image: "/home/sales.jpeg", href: "/woman/sale", dark: true },
  { title: "Perfumes", image: "/home/perfume.jpeg", href: "/woman/perfumes" },
];

const inPublic = (path: string) =>
  existsSync(join(process.cwd(), "public", path));

/*
 * The home is a deck: the cover, then one card per section, each sticky and
 * a viewport tall so the next slides over it (components/home/Deck measures
 * the coverage; the .deck-* rules in globals.css lift and dim the card
 * underneath). The deck releases into the NEW IN rail on paper.
 */
export function HomeSlides() {
  return (
    <>
      <NextArrow />
      <Deck>
        <CoverCard />
        {CARDS.map((card, i) => {
          const photo = inPublic(card.image);
          return (
            <section
              key={card.title}
              data-slide={card.dark ? "dark" : "light"}
              aria-label={card.title}
              className={cn(
                "deck-card sticky top-0 h-svh overflow-hidden",
                card.dark ? "bg-ink text-paper" : "bg-canvas text-ink",
              )}
            >
              {/* The whole card is the link. Its photograph settles to 1.03 while
                  the pointer rests on it (so each dealt card lands with a breath);
                  the underline belongs to the title alone. */}
              <Link
                href={card.href}
                className="group absolute inset-0 block outline-none"
              >
                {photo && (
                  <div className="deck-photo absolute inset-0">
                    <BlockImage
                      src={card.image}
                      priority={i === 0}
                      className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <span
                  aria-hidden
                  className="deck-dim absolute inset-0 bg-ink"
                />
                <h2 className="deck-title absolute bottom-6 left-(--chrome-x) font-logo text-[clamp(48px,6.6vw,96px)] uppercase leading-none tracking-[-0.03em] md:bottom-8">
                  <span className="decoration-1 underline-offset-[0.12em] hover:underline group-focus-visible:underline">
                    {card.title}
                  </span>
                </h2>
              </Link>
            </section>
          );
        })}
        <NewIn />
      </Deck>
    </>
  );
}

function CoverCard() {
  const video = inPublic(COVER.video);
  const portrait = inPublic(COVER.portrait);
  const poster = inPublic(COVER.poster);
  return (
    <section
      data-slide={(video || poster) && COVER.dark ? "dark" : "light"}
      aria-hidden
      className={cn(
        "deck-card sticky top-0 h-svh overflow-hidden",
        COVER.dark ? "bg-ink" : "bg-paper",
      )}
    >
      {(video || poster) && (
        <div className="deck-photo absolute inset-0">
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
        </div>
      )}
      <span aria-hidden className="deck-dim absolute inset-0 bg-ink" />
    </section>
  );
}
