/**
 * The original static catalogue. The web app reads the API now (lib/api);
 * this file remains only as the input for apps/api/scripts/generate-catalog-seed.ts.
 */
import type { Product, SectionSlug, Shape } from "../types";
import { COLORS } from "./colors";
import { slugify } from "../format";

/** [name, price, silhouette, colors, flags]  flags: n = new in, s = sale, b = best seller */
type Spec = [string, number, Shape, string[], string?];

const APPAREL = ["XS", "S", "M", "L", "XL"];
const APPAREL_M = ["S", "M", "L", "XL", "XXL"];
const SHOES_W = ["36", "37", "38", "39", "40", "41"];
const SHOES_M = ["40", "41", "42", "43", "44", "45"];
const KIDS = ["3-4 Y", "5-6 Y", "7-8 Y", "9-10 Y", "11-12 Y", "13-14 Y"];
const BABY = ["3-6 M", "6-9 M", "9-12 M", "12-18 M", "18-24 M"];
const KIDS_SHOES = ["25", "27", "29", "31", "33", "35"];
const ONE = ["ONE SIZE"];
const ML = ["30 ML", "100 ML"];

const DESCRIPTIONS: Record<Shape, string[]> = {
  dress: [
    "Dress with a round neckline and wide straps. Fitted at the waist with a flowing skirt. Invisible side zip fastening.",
    "Midi dress with a V-neckline and thin adjustable straps. Bias cut with a gathered detail at the hip. Concealed back zip.",
    "Collared dress with long sleeves and buttoned cuffs. Features a matching belt at the waist and front button fastening.",
  ],
  top: [
    "Top with a straight neckline and wide straps. Fitted silhouette with a boned bodice. Back zip fastening.",
    "Sleeveless top with a halter neckline. Features a draped front and an open back with a tie detail.",
    "Cropped top with a round neckline and short sleeves. Ribbed fabric with a stretch finish.",
  ],
  tee: [
    "Round neck T-shirt with short sleeves. Made from a mid-weight cotton with a relaxed fit.",
    "Oversized T-shirt with dropped shoulders and a ribbed crew neck. Heavyweight cotton jersey.",
    "Fitted T-shirt with a crew neckline and long sleeves. Soft, fine-ribbed fabric.",
  ],
  shirt: [
    "Shirt with a lapel collar and long sleeves with buttoned cuffs. Chest patch pocket. Front button fastening.",
    "Relaxed-fit shirt with a spread collar. Dropped shoulders and a rounded hem. Button-up front.",
    "Cropped shirt with a lapel collar and long sleeves. Front button fastening and a boxy fit.",
  ],
  knit: [
    "Round neck sweater with long sleeves. Ribbed trims on the cuffs and hem. Soft-touch yarn.",
    "Knit cardigan with a V-neckline and long sleeves. Front button fastening with matching buttons.",
    "High neck sweater with long sleeves. Fine-gauge knit with a slightly fitted silhouette.",
  ],
  jacket: [
    "Jacket with a lapel collar and long sleeves. Front welt pockets. Zip fastening at the front.",
    "Cropped jacket with a round neckline and long sleeves. Front flap pockets and metal snap fastening.",
    "Relaxed-fit jacket with a collar and long sleeves. Chest and hip pockets. Front button fastening.",
  ],
  coat: [
    "Long coat with a lapel collar and long sleeves. Front welt pockets. Double-breasted button fastening.",
    "Oversized coat with a lapel collar and long sleeves. Front pockets and a back vent. Button-up front.",
    "Belted coat with a lapel collar. Long sleeves with cuff tabs. Concealed front button fastening.",
  ],
  trousers: [
    "High-waist trousers with front pleats. Side pockets and rear welt pockets. Wide leg with a straight hem.",
    "Straight-leg trousers with a mid-rise waist. Five pockets. Front zip and button fastening.",
    "Relaxed trousers with an elastic drawstring waistband. Side pockets and a cropped leg.",
  ],
  skirt: [
    "Midi skirt with a high waist. Flowing fabric with a bias cut. Invisible side zip fastening.",
    "Mini skirt with a high waist and front pleats. Features a concealed back zip.",
    "Long skirt with an elastic waistband. Gathered detail at the front. Lined.",
  ],
  shoe: [
    "Shoes with a rounded toe. Padded insole for extra comfort. Sole height 2 cm.",
    "Heeled shoes with a pointed toe. Adjustable ankle strap with buckle. Heel height 6 cm.",
    "Lace-up shoes with a rounded toe. Contrast sole with a textured finish. Sole height 3.5 cm.",
  ],
  bag: [
    "Bag with a magnetic snap closure. Shoulder strap and an interior pocket. Height x Length x Width: 24 x 32 x 12 cm.",
    "Mini bag with a flap and a metal clasp. Adjustable crossbody strap. Height x Length x Width: 14 x 20 x 6 cm.",
    "Large tote bag with two handles and an interior zip pocket. Height x Length x Width: 34 x 42 x 14 cm.",
  ],
  hat: [
    "Accessory with a matte finish. Adjustable fit. Sold individually.",
    "Accessory with a metallic finish and a hidden clasp. Sold individually.",
    "Accessory made from a soft-touch fabric. Contrast edge detail.",
  ],
  perfume: [
    "Eau de parfum with warm floral notes over a base of musk and cedarwood. Long-lasting finish.",
    "Eau de toilette with fresh citrus top notes, a heart of white flowers and an amber base.",
    "Eau de parfum with woody notes of vetiver and sandalwood softened by a hint of vanilla.",
  ],
  onesie: [
    "Round neck bodysuit with short sleeves. Snap-button fastening at the crotch for easy changing.",
    "Long-sleeved romper with a round neckline. Front snap-button fastening. Soft organic cotton.",
    "Sleeveless playsuit with wide straps and an elasticated waist. Back button fastening.",
  ],
};

const COMPOSITION: Record<Shape, string> = {
  dress: "OUTER SHELL\n95% viscose, 5% elastane\n\nLINING\n100% polyester",
  top: "OUTER SHELL\n68% cotton, 30% polyamide, 2% elastane",
  tee: "OUTER SHELL\n100% cotton",
  shirt: "OUTER SHELL\n100% cotton",
  knit: "OUTER SHELL\n60% wool, 40% polyamide",
  jacket: "OUTER SHELL\n100% polyester\n\nLINING\n100% polyester",
  coat: "OUTER SHELL\n52% wool, 48% polyester\n\nLINING\n100% polyester",
  trousers: "OUTER SHELL\n64% polyester, 34% viscose, 2% elastane",
  skirt: "OUTER SHELL\n100% polyester\n\nLINING\n100% polyester",
  shoe: "UPPER\n100% polyurethane\n\nSOLE\n100% thermoplastic rubber",
  bag: "OUTER SHELL\n100% polyurethane\n\nLINING\n100% polyester",
  hat: "OUTER SHELL\n100% polyester",
  perfume: "Alcohol denat., aqua, parfum, limonene, linalool, citral.",
  onesie: "OUTER SHELL\n100% organic cotton",
};

let counter = 0;

function build(
  section: SectionSlug,
  category: string,
  sizes: string[],
  specs: Spec[],
): Product[] {
  return specs.map(([name, price, shape, colors, flags = ""], i) => {
    counter += 1;
    const idx = counter;
    const ref = `${((idx * 37) % 9000) + 1000}/${((idx * 13) % 900) + 100}`;
    const onSale = flags.includes("s");
    // Sale items show a struck-through original price rounded to a x9.90 pattern.
    const compareAt = onSale ? Math.round((price * 1.5) / 10) * 10 - 0.1 : undefined;
    const productColors = colors.map((c) => ({ name: c.toUpperCase(), hex: COLORS[c] ?? "#888" }));
    return {
      id: `${section}-${category}-${String(i + 1).padStart(2, "0")}`,
      slug: `${slugify(name)}-p${String(40000000 + idx * 907).slice(0, 8)}`,
      name: name.toUpperCase(),
      section,
      category,
      price,
      compareAt,
      colors: productColors,
      sizes,
      description: DESCRIPTIONS[shape][idx % DESCRIPTIONS[shape].length],
      composition: COMPOSITION[shape],
      ref,
      images: [],
      shape,
      tone: idx % 5,
      isNew: flags.includes("n"),
      isBestSeller: flags.includes("b"),
    };
  });
}

export const PRODUCTS: Product[] = [
  // ─────────────────────────── WOMAN ───────────────────────────
  ...build("woman", "dresses", APPAREL, [
    ["Ribbed knit midi dress", 45.9, "dress", ["black", "ecru"], "nb"],
    ["Satin effect slip dress", 59.9, "dress", ["burgundy", "black"], "n"],
    ["Poplin shirt dress with belt", 69.9, "dress", ["white", "light blue"], "n"],
    ["Pleated midi dress", 79.9, "dress", ["navy", "ecru"], "n"],
    ["Linen blend mini dress", 49.9, "dress", ["sand", "olive"], "s"],
    ["Draped asymmetric dress", 89.9, "dress", ["black"], ""],
    ["Printed flowing dress", 59.9, "dress", ["dusty pink", "ecru"], "s"],
    ["Knit dress with buttons", 69.9, "dress", ["camel", "grey"], ""],
    ["Cut-out long dress", 99.9, "dress", ["black", "red"], "b"],
    ["Denim pinafore dress", 59.9, "dress", ["denim", "black"], ""],
    ["Halter neck midi dress", 69.9, "dress", ["green", "ecru"], "b"],
    ["Corset style dress", 89.9, "dress", ["black", "oyster"], ""],
    ["Tailored waistcoat dress", 79.9, "dress", ["charcoal", "ecru"], "s"],
    ["Textured tweed dress", 109, "dress", ["ecru", "black"], ""],
  ]),
  ...build("woman", "tops", APPAREL, [
    ["Corset style top", 35.9, "top", ["black", "white"], "nb"],
    ["Ribbed tank top", 17.9, "top", ["white", "black", "grey"], "n"],
    ["Halter neck top", 29.9, "top", ["ecru", "burgundy"], "n"],
    ["Off-the-shoulder top", 35.9, "top", ["black", "red"], ""],
    ["Lace trim camisole", 29.9, "top", ["cream", "black"], "s"],
    ["Draped satin top", 39.9, "top", ["oyster", "bottle green"], ""],
    ["Cropped knot top", 25.9, "top", ["white", "lilac"], "s"],
    ["Bodysuit with thin straps", 22.9, "top", ["black", "ecru"], "b"],
    ["Textured crop top", 29.9, "top", ["pink", "black"], ""],
    ["Asymmetric one-shoulder top", 35.9, "top", ["black"], "n"],
  ]),
  ...build("woman", "t-shirts", APPAREL, [
    ["Basic cotton T-shirt", 12.9, "tee", ["white", "black", "grey", "navy"], "nb"],
    ["Oversized heavyweight T-shirt", 22.9, "tee", ["ecru", "charcoal"], "n"],
    ["Ribbed long sleeve T-shirt", 19.9, "tee", ["black", "cream"], ""],
    ["Cropped fitted T-shirt", 15.9, "tee", ["white", "dusty pink"], "s"],
    ["Contrast rib T-shirt", 19.9, "tee", ["olive", "ecru"], ""],
    ["Boat neck T-shirt", 17.9, "tee", ["navy", "white"], "n"],
    ["Printed slogan T-shirt", 22.9, "tee", ["white"], "s"],
    ["Washed effect T-shirt", 25.9, "tee", ["grey", "khaki"], ""],
  ]),
  ...build("woman", "shirts", APPAREL, [
    ["Oxford cotton shirt", 39.9, "shirt", ["white", "light blue"], "nb"],
    ["Oversized poplin shirt", 45.9, "shirt", ["white", "black"], "n"],
    ["Linen blend shirt", 49.9, "shirt", ["ecru", "olive"], ""],
    ["Satin shirt", 45.9, "shirt", ["burgundy", "cream"], "s"],
    ["Striped long shirt", 39.9, "shirt", ["light blue", "white"], ""],
    ["Denim shirt", 49.9, "shirt", ["denim", "mid blue"], "n"],
    ["Cropped shirt with pockets", 35.9, "shirt", ["black", "sand"], "s"],
    ["Sheer organza shirt", 45.9, "shirt", ["ecru", "black"], ""],
  ]),
  ...build("woman", "jackets", APPAREL, [
    ["Faux leather biker jacket", 89.9, "jacket", ["black", "chocolate"], "nb"],
    ["Cropped denim jacket", 59.9, "jacket", ["mid blue", "black"], "n"],
    ["Quilted jacket", 69.9, "jacket", ["olive", "black"], "n"],
    ["Bomber jacket", 79.9, "jacket", ["navy", "sand"], ""],
    ["Textured tweed jacket", 99.9, "jacket", ["ecru", "black"], "s"],
    ["Utility jacket with pockets", 69.9, "jacket", ["khaki", "charcoal"], ""],
    ["Short puffer jacket", 89.9, "jacket", ["black", "cream"], "b"],
    ["Suede effect jacket", 109, "jacket", ["camel", "chocolate"], ""],
    ["Waxed effect jacket", 89.9, "jacket", ["bottle green", "black"], "s"],
    ["Cropped trench jacket", 79.9, "jacket", ["sand", "black"], "n"],
  ]),
  ...build("woman", "coats", APPAREL, [
    ["Long wool blend coat", 169, "coat", ["camel", "black"], "nb"],
    ["Double-breasted coat", 149, "coat", ["charcoal", "navy"], "n"],
    ["Oversized wool blend coat", 179, "coat", ["grey", "ecru"], "n"],
    ["Belted trench coat", 129, "coat", ["sand", "black"], "b"],
    ["Faux shearling coat", 139, "coat", ["cream", "chocolate"], "s"],
    ["Cocoon coat", 159, "coat", ["black", "stone"], ""],
    ["Checked wool blend coat", 169, "coat", ["taupe", "grey"], ""],
    ["Long puffer coat", 149, "coat", ["black", "olive"], "s"],
  ]),
  ...build("woman", "blazers", APPAREL, [
    ["Oversized blazer", 89.9, "jacket", ["black", "ecru", "grey"], "nb"],
    ["Double-breasted blazer", 99.9, "jacket", ["navy", "black"], "n"],
    ["Linen blend blazer", 89.9, "jacket", ["sand", "white"], ""],
    ["Fitted blazer", 79.9, "jacket", ["black", "burgundy"], "s"],
    ["Cropped blazer", 69.9, "jacket", ["ecru", "charcoal"], ""],
    ["Pinstripe blazer", 99.9, "jacket", ["charcoal", "navy"], "n"],
    ["Long tailored blazer", 109, "jacket", ["black", "camel"], ""],
    ["Textured blazer", 89.9, "jacket", ["oyster", "black"], "s"],
  ]),
  ...build("woman", "knitwear", APPAREL, [
    ["Soft knit cardigan", 49.9, "knit", ["cream", "black", "grey"], "nb"],
    ["Cropped sweater", 39.9, "knit", ["ecru", "burgundy"], "n"],
    ["Cashmere blend sweater", 129, "knit", ["camel", "grey", "black"], "n"],
    ["Cable knit sweater", 59.9, "knit", ["cream", "navy"], ""],
    ["Turtleneck sweater", 45.9, "knit", ["black", "ecru", "chocolate"], "b"],
    ["Oversized sweater", 49.9, "knit", ["grey", "olive"], "s"],
    ["Ribbed knit polo", 39.9, "knit", ["white", "black"], ""],
    ["Mohair blend sweater", 69.9, "knit", ["lilac", "cream"], "s"],
    ["V-neck knit vest", 35.9, "knit", ["ecru", "charcoal"], ""],
    ["Wool blend sweater", 59.9, "knit", ["mustard", "black"], "n"],
  ]),
  ...build("woman", "trousers", APPAREL, [
    ["Wide leg trousers", 49.9, "trousers", ["black", "ecru", "navy"], "nb"],
    ["Tailored trousers", 59.9, "trousers", ["charcoal", "black"], "n"],
    ["Pleated trousers", 59.9, "trousers", ["sand", "grey"], "n"],
    ["Cargo trousers", 49.9, "trousers", ["khaki", "black"], "b"],
    ["Straight cut trousers", 45.9, "trousers", ["black", "brown"], ""],
    ["Flowing palazzo trousers", 49.9, "trousers", ["ecru", "black"], "s"],
    ["Cropped trousers", 39.9, "trousers", ["navy", "stone"], ""],
    ["Faux leather trousers", 59.9, "trousers", ["black", "chocolate"], "s"],
    ["High waist flared trousers", 49.9, "trousers", ["black", "burgundy"], ""],
    ["Linen blend trousers", 45.9, "trousers", ["white", "sand"], "n"],
  ]),
  ...build("woman", "jeans", APPAREL, [
    ["Straight leg jeans", 49.9, "trousers", ["mid blue", "black"], "nb"],
    ["Wide leg jeans", 49.9, "trousers", ["light blue", "denim"], "n"],
    ["Mom fit jeans", 45.9, "trousers", ["mid blue", "black"], ""],
    ["Skinny jeans", 39.9, "trousers", ["dark blue", "black"], "s"],
    ["Flared jeans", 49.9, "trousers", ["denim", "dark blue"], ""],
    ["Baggy jeans", 49.9, "trousers", ["light blue", "grey"], "n"],
    ["Cropped jeans", 39.9, "trousers", ["mid blue", "white"], "s"],
    ["High rise jeans", 45.9, "trousers", ["dark blue", "black"], "b"],
  ]),
  ...build("woman", "skirts", APPAREL, [
    ["Satin midi skirt", 45.9, "skirt", ["black", "oyster"], "nb"],
    ["Pleated skirt", 39.9, "skirt", ["navy", "ecru"], "n"],
    ["Denim mini skirt", 35.9, "skirt", ["mid blue", "black"], ""],
    ["Pencil skirt", 39.9, "skirt", ["black", "grey"], "s"],
    ["Faux leather skirt", 45.9, "skirt", ["black", "chocolate"], ""],
    ["Wrap skirt", 39.9, "skirt", ["sand", "black"], "s"],
    ["Long flowing skirt", 49.9, "skirt", ["ecru", "olive"], "n"],
    ["Tweed mini skirt", 45.9, "skirt", ["ecru", "black"], "b"],
  ]),
  ...build("woman", "shoes", SHOES_W, [
    ["Leather ballet flats", 69.9, "shoe", ["black", "cream"], "nb"],
    ["Heeled sandals", 59.9, "shoe", ["black", "gold"], "n"],
    ["Ankle boots", 89.9, "shoe", ["black", "chocolate"], "n"],
    ["Loafers", 69.9, "shoe", ["black", "burgundy"], "b"],
    ["Low top sneakers", 49.9, "shoe", ["white", "ecru"], ""],
    ["Kitten heel mules", 49.9, "shoe", ["black", "silver"], "s"],
    ["Knee-high boots", 129, "shoe", ["black", "camel"], ""],
    ["Strappy heeled sandals", 59.9, "shoe", ["gold", "black"], "s"],
    ["Mary Jane shoes", 59.9, "shoe", ["black", "red"], ""],
    ["Platform shoes", 69.9, "shoe", ["black", "cream"], "n"],
  ]),
  ...build("woman", "bags", ONE, [
    ["Shoulder bag", 45.9, "bag", ["black", "camel"], "nb"],
    ["Structured tote bag", 59.9, "bag", ["black", "sand"], "n"],
    ["Crossbody bag", 39.9, "bag", ["chocolate", "black"], ""],
    ["Mini bucket bag", 35.9, "bag", ["ecru", "black"], "s"],
    ["Quilted bag", 49.9, "bag", ["black", "cream"], "b"],
    ["Shopper bag", 45.9, "bag", ["camel", "black"], ""],
    ["Baguette bag", 39.9, "bag", ["burgundy", "black"], "n"],
    ["Clutch bag", 35.9, "bag", ["gold", "silver"], "s"],
  ]),
  ...build("woman", "accessories", ONE, [
    ["Leather effect belt", 22.9, "hat", ["black", "chocolate"], "nb"],
    ["Oval sunglasses", 25.9, "hat", ["black", "camel"], "n"],
    ["Cotton cap", 19.9, "hat", ["black", "ecru"], ""],
    ["Soft scarf", 29.9, "hat", ["camel", "grey", "black"], "s"],
    ["Metal hoop earrings", 15.9, "hat", ["gold", "silver"], "b"],
    ["Chain necklace", 19.9, "hat", ["gold", "silver"], ""],
    ["Hair claw clip", 9.9, "hat", ["black", "taupe"], "s"],
    ["Knit gloves", 17.9, "hat", ["black", "cream"], "n"],
  ]),
  ...build("woman", "perfumes", ML, [
    ["Rose & musk eau de parfum", 29.9, "perfume", ["pink"], "nb"],
    ["Amber wood eau de parfum", 35.9, "perfume", ["camel"], "n"],
    ["White flowers eau de toilette", 25.9, "perfume", ["cream"], ""],
    ["Fig & cedar eau de parfum", 35.9, "perfume", ["olive"], "s"],
    ["Citrus vetiver eau de toilette", 25.9, "perfume", ["sand"], ""],
    ["Vanilla night eau de parfum", 35.9, "perfume", ["chocolate"], "b"],
  ]),

  // ─────────────────────────── MAN ───────────────────────────
  ...build("man", "jackets", APPAREL_M, [
    ["Faux leather jacket", 99.9, "jacket", ["black", "chocolate"], "nb"],
    ["Bomber jacket", 79.9, "jacket", ["navy", "olive"], "n"],
    ["Quilted jacket", 89.9, "jacket", ["black", "khaki"], "n"],
    ["Denim jacket", 59.9, "jacket", ["mid blue", "black"], "b"],
    ["Overshirt with pockets", 49.9, "jacket", ["olive", "charcoal"], ""],
    ["Puffer jacket", 99.9, "jacket", ["black", "navy"], "s"],
    ["Technical jacket", 89.9, "jacket", ["charcoal", "sand"], ""],
    ["Suede effect jacket", 119, "jacket", ["camel", "brown"], "s"],
    ["Harrington jacket", 69.9, "jacket", ["navy", "stone"], "n"],
    ["Workwear jacket", 69.9, "jacket", ["khaki", "black"], ""],
  ]),
  ...build("man", "coats", APPAREL_M, [
    ["Wool blend coat", 169, "coat", ["charcoal", "camel"], "nb"],
    ["Double-breasted coat", 179, "coat", ["navy", "black"], "n"],
    ["Trench coat", 149, "coat", ["sand", "black"], "b"],
    ["Long puffer coat", 149, "coat", ["black", "olive"], "s"],
    ["Oversized wool blend coat", 179, "coat", ["grey", "black"], ""],
    ["Checked coat", 169, "coat", ["taupe", "charcoal"], "s"],
  ]),
  ...build("man", "blazers", APPAREL_M, [
    ["Tailored blazer", 109, "jacket", ["black", "navy", "charcoal"], "nb"],
    ["Linen blend blazer", 99.9, "jacket", ["sand", "olive"], "n"],
    ["Double-breasted blazer", 119, "jacket", ["navy", "black"], ""],
    ["Textured blazer", 109, "jacket", ["grey", "brown"], "s"],
    ["Relaxed fit blazer", 99.9, "jacket", ["charcoal", "ecru"], ""],
    ["Pinstripe suit blazer", 129, "jacket", ["navy", "charcoal"], "b"],
  ]),
  ...build("man", "shirts", APPAREL_M, [
    ["Oxford shirt", 39.9, "shirt", ["white", "light blue"], "nb"],
    ["Linen blend shirt", 45.9, "shirt", ["ecru", "olive", "navy"], "n"],
    ["Striped poplin shirt", 39.9, "shirt", ["light blue", "white"], ""],
    ["Relaxed fit shirt", 39.9, "shirt", ["white", "black"], "n"],
    ["Denim shirt", 49.9, "shirt", ["mid blue", "dark blue"], "b"],
    ["Flannel checked shirt", 45.9, "shirt", ["burgundy", "green"], "s"],
    ["Short sleeve shirt", 35.9, "shirt", ["sand", "black"], ""],
    ["Corduroy overshirt", 49.9, "shirt", ["camel", "charcoal"], "s"],
    ["Textured shirt", 45.9, "shirt", ["white", "ecru"], ""],
    ["Satin finish shirt", 45.9, "shirt", ["black", "navy"], "n"],
  ]),
  ...build("man", "t-shirts", APPAREL_M, [
    ["Basic heavyweight T-shirt", 15.9, "tee", ["white", "black", "grey", "navy"], "nb"],
    ["Oversized T-shirt", 22.9, "tee", ["ecru", "charcoal"], "n"],
    ["Ribbed long sleeve T-shirt", 19.9, "tee", ["black", "cream"], ""],
    ["Striped T-shirt", 19.9, "tee", ["navy", "white"], "s"],
    ["Washed T-shirt", 22.9, "tee", ["grey", "olive"], ""],
    ["Pocket T-shirt", 17.9, "tee", ["white", "khaki"], "n"],
    ["Slim fit T-shirt", 12.9, "tee", ["black", "white"], "b"],
    ["Printed T-shirt", 22.9, "tee", ["white", "black"], "s"],
  ]),
  ...build("man", "sweatshirts", APPAREL_M, [
    ["Basic sweatshirt", 29.9, "knit", ["grey", "black", "navy"], "nb"],
    ["Oversized hoodie", 39.9, "knit", ["charcoal", "ecru"], "n"],
    ["Half-zip sweatshirt", 35.9, "knit", ["navy", "olive"], ""],
    ["Textured sweatshirt", 35.9, "knit", ["stone", "black"], "s"],
    ["Cropped sweatshirt", 29.9, "knit", ["black", "cream"], ""],
    ["Washed hoodie", 39.9, "knit", ["khaki", "grey"], "b"],
  ]),
  ...build("man", "knitwear", APPAREL_M, [
    ["Wool blend sweater", 49.9, "knit", ["navy", "camel", "black"], "nb"],
    ["Cable knit sweater", 59.9, "knit", ["cream", "grey"], "n"],
    ["Turtleneck sweater", 45.9, "knit", ["black", "charcoal"], "n"],
    ["Knit polo shirt", 39.9, "knit", ["olive", "black"], ""],
    ["Cardigan with buttons", 49.9, "knit", ["grey", "navy"], "s"],
    ["Merino wool sweater", 69.9, "knit", ["burgundy", "black"], "b"],
    ["Knit vest", 35.9, "knit", ["ecru", "charcoal"], "s"],
    ["Textured knit sweater", 49.9, "knit", ["sand", "green"], ""],
  ]),
  ...build("man", "trousers", APPAREL_M, [
    ["Tailored trousers", 59.9, "trousers", ["black", "charcoal", "navy"], "nb"],
    ["Pleated wide leg trousers", 59.9, "trousers", ["sand", "grey"], "n"],
    ["Chino trousers", 45.9, "trousers", ["khaki", "navy", "stone"], "b"],
    ["Cargo trousers", 49.9, "trousers", ["olive", "black"], "n"],
    ["Jogger trousers", 39.9, "trousers", ["grey", "black"], "s"],
    ["Linen blend trousers", 49.9, "trousers", ["ecru", "sand"], ""],
    ["Straight fit trousers", 49.9, "trousers", ["charcoal", "brown"], "s"],
    ["Corduroy trousers", 49.9, "trousers", ["camel", "green"], ""],
  ]),
  ...build("man", "jeans", APPAREL_M, [
    ["Straight fit jeans", 49.9, "trousers", ["mid blue", "black"], "nb"],
    ["Relaxed fit jeans", 49.9, "trousers", ["light blue", "dark blue"], "n"],
    ["Slim fit jeans", 45.9, "trousers", ["dark blue", "black"], ""],
    ["Baggy jeans", 49.9, "trousers", ["light blue", "grey"], "n"],
    ["Skinny jeans", 39.9, "trousers", ["black", "dark blue"], "s"],
    ["Carpenter jeans", 49.9, "trousers", ["mid blue", "ecru"], "b"],
  ]),
  ...build("man", "shoes", SHOES_M, [
    ["Leather sneakers", 69.9, "shoe", ["white", "black"], "nb"],
    ["Chelsea boots", 99.9, "shoe", ["black", "chocolate"], "n"],
    ["Loafers", 79.9, "shoe", ["black", "burgundy"], "b"],
    ["Derby shoes", 89.9, "shoe", ["black", "brown"], ""],
    ["Chunky sneakers", 69.9, "shoe", ["white", "grey"], "s"],
    ["Lace-up boots", 109, "shoe", ["black", "camel"], ""],
    ["Suede effect moccasins", 69.9, "shoe", ["sand", "navy"], "s"],
    ["Retro sneakers", 59.9, "shoe", ["ecru", "green"], "n"],
  ]),
  ...build("man", "bags", ONE, [
    ["Crossbody bag", 35.9, "bag", ["black", "olive"], "nb"],
    ["Backpack", 59.9, "bag", ["black", "navy"], "n"],
    ["Tote bag", 45.9, "bag", ["sand", "black"], ""],
    ["Leather effect briefcase", 79.9, "bag", ["chocolate", "black"], "s"],
  ]),
  ...build("man", "accessories", ONE, [
    ["Leather effect belt", 25.9, "hat", ["black", "chocolate"], "nb"],
    ["Wool blend beanie", 17.9, "hat", ["black", "grey", "navy"], "n"],
    ["Rectangular sunglasses", 25.9, "hat", ["black"], ""],
    ["Soft scarf", 29.9, "hat", ["charcoal", "camel"], "s"],
    ["Cotton cap", 19.9, "hat", ["black", "khaki"], "b"],
    ["Card holder", 15.9, "hat", ["black", "brown"], ""],
  ]),
  ...build("man", "perfumes", ML, [
    ["Vetiver & cedar eau de toilette", 29.9, "perfume", ["olive"], "nb"],
    ["Black amber eau de parfum", 35.9, "perfume", ["charcoal"], "n"],
    ["Fresh citrus eau de toilette", 25.9, "perfume", ["sand"], ""],
    ["Smoky leather eau de parfum", 35.9, "perfume", ["chocolate"], "s"],
  ]),

  // ─────────────────────────── KIDS ───────────────────────────
  ...build("kids", "girl", KIDS, [
    ["Knit dress with collar", 29.9, "dress", ["pink", "ecru"], "nb"],
    ["Pleated skirt", 19.9, "skirt", ["navy", "dusty pink"], "n"],
    ["Ribbed T-shirt", 9.9, "tee", ["white", "lilac", "cream"], "n"],
    ["Denim jacket", 35.9, "jacket", ["light blue", "mid blue"], ""],
    ["Printed flowing dress", 25.9, "dress", ["cream", "green"], "s"],
    ["Wide leg trousers", 22.9, "trousers", ["ecru", "black"], "b"],
    ["Soft cardigan", 25.9, "knit", ["pink", "grey"], ""],
    ["Puffer jacket", 45.9, "jacket", ["lilac", "black"], "s"],
    ["Corduroy pinafore dress", 29.9, "dress", ["camel", "burgundy"], "n"],
    ["Sweatshirt with print", 19.9, "knit", ["cream", "pink"], ""],
  ]),
  ...build("kids", "boy", KIDS, [
    ["Basic cotton T-shirt", 8.9, "tee", ["white", "navy", "grey"], "nb"],
    ["Hooded sweatshirt", 22.9, "knit", ["grey", "green"], "n"],
    ["Cargo trousers", 25.9, "trousers", ["khaki", "black"], "n"],
    ["Denim jacket", 35.9, "jacket", ["mid blue", "black"], ""],
    ["Checked shirt", 22.9, "shirt", ["navy", "green"], "s"],
    ["Jogger trousers", 19.9, "trousers", ["grey", "navy"], "b"],
    ["Puffer jacket", 45.9, "jacket", ["navy", "olive"], "s"],
    ["Knit sweater", 25.9, "knit", ["navy", "cream"], ""],
    ["Striped long sleeve T-shirt", 12.9, "tee", ["white", "navy"], "n"],
    ["Straight fit jeans", 25.9, "trousers", ["mid blue", "dark blue"], ""],
  ]),
  ...build("kids", "baby-girl", BABY, [
    ["Ribbed bodysuit", 9.9, "onesie", ["pink", "cream", "lilac"], "nb"],
    ["Knit romper", 22.9, "onesie", ["ecru", "dusty pink"], "n"],
    ["Corduroy dungaree dress", 25.9, "dress", ["camel", "burgundy"], ""],
    ["Soft cardigan", 19.9, "knit", ["pink", "cream"], "s"],
    ["Printed dress", 19.9, "dress", ["cream", "green"], "b"],
    ["Fleece jacket", 25.9, "jacket", ["lilac", "ecru"], "s"],
  ]),
  ...build("kids", "baby-boy", BABY, [
    ["Basic bodysuit", 9.9, "onesie", ["white", "navy", "grey"], "nb"],
    ["Knit romper", 22.9, "onesie", ["navy", "cream"], "n"],
    ["Corduroy dungarees", 25.9, "trousers", ["camel", "green"], ""],
    ["Hooded sweatshirt", 17.9, "knit", ["grey", "navy"], "s"],
    ["Striped T-shirt", 8.9, "tee", ["white", "navy"], "b"],
    ["Quilted jacket", 29.9, "jacket", ["olive", "navy"], "s"],
  ]),
  ...build("kids", "shoes", KIDS_SHOES, [
    ["Sneakers with straps", 29.9, "shoe", ["white", "navy"], "nb"],
    ["Ankle boots", 35.9, "shoe", ["chocolate", "black"], "n"],
    ["Ballet flats", 25.9, "shoe", ["pink", "black"], ""],
    ["Rain boots", 22.9, "shoe", ["navy", "mustard"], "s"],
    ["Slip-on sneakers", 22.9, "shoe", ["grey", "green"], "b"],
    ["Loafers", 29.9, "shoe", ["black", "burgundy"], ""],
  ]),
  ...build("kids", "accessories", ONE, [
    ["Knit beanie", 12.9, "hat", ["cream", "navy", "pink"], "nb"],
    ["Cotton cap", 12.9, "hat", ["navy", "khaki"], "n"],
    ["Backpack", 25.9, "bag", ["navy", "pink"], "b"],
    ["Soft scarf", 15.9, "hat", ["grey", "burgundy"], "s"],
  ]),
];

const BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));
const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

export function getProductBySlug(slug: string): Product | undefined {
  return BY_SLUG.get(slug);
}

export function getProductById(id: string): Product | undefined {
  return BY_ID.get(id);
}

export function getProducts(section: SectionSlug, category: string): Product[] {
  const inSection = PRODUCTS.filter((p) => p.section === section);
  switch (category) {
    case "new-in":
      return inSection.filter((p) => p.isNew);
    case "sale":
      return inSection.filter((p) => p.compareAt !== undefined);
    case "best-sellers":
      return inSection.filter((p) => p.isBestSeller);
    default:
      return inSection.filter((p) => p.category === category);
  }
}

export function getRelated(product: Product, limit = 8): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.section === product.section && p.category === product.category && p.id !== product.id,
  );
  const fill = PRODUCTS.filter(
    (p) => p.section === product.section && p.category !== product.category,
  );
  return [...sameCategory, ...fill].slice(0, limit);
}

export function searchProducts(query: string, section?: SectionSlug | "all"): Product[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return PRODUCTS.filter((p) => {
    if (section && section !== "all" && p.section !== section) return false;
    const haystack = [
      p.name,
      p.category.replace(/-/g, " "),
      p.section,
      ...p.colors.map((c) => c.name),
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}
