-- ===================================================================
-- Product zone: categories, products, colours, variants.
--
-- Model (mirrors how the storefront sells):
--   product         one price, one description, one reference number
--   product_colours images and hex live here; a colour is what you pick first
--   variants        stock lives here; a variant is one colour in one size
--
-- Sections (WOMAN / MAN / KIDS) are the root rows of `categories`; real
-- categories hang under them by `parent_id` and carry a `path` such as
-- 'woman/knitwear'. NEW IN, SPECIAL PRICES and BEST SELLERS are not
-- categories: they are the flags is_new, compare_at_cents and is_best_seller.
-- ===================================================================

-- The scaffold table from the first API draft (id, name, price) is
-- incompatible with this model and holds no real data.
DROP TABLE IF EXISTS products CASCADE;

CREATE TYPE product_status AS ENUM ('draft', 'live', 'archived');
CREATE TYPE section        AS ENUM ('woman', 'man', 'kids');

-- -------------------------------------------------------------------
-- categories
-- -------------------------------------------------------------------
CREATE TABLE categories (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id  uuid REFERENCES categories(id) ON DELETE SET NULL,
  slug       text NOT NULL,                 -- 'knitwear'
  name       text NOT NULL,                 -- 'KNITWEAR'
  path       text NOT NULL,                 -- 'woman/knitwear'; root rows are 'woman', 'man', 'kids'
  position   integer NOT NULL DEFAULT 0,
  is_active  boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- `path` is the natural key. Slugs repeat across sections (woman/shoes,
-- man/shoes, kids/shoes), so they are unique only under one parent.
CREATE UNIQUE INDEX categories_path_key        ON categories (path);
CREATE UNIQUE INDEX categories_parent_slug_key ON categories (coalesce(parent_id, '00000000-0000-0000-0000-000000000000'::uuid), slug);
CREATE INDEX        categories_parent_idx      ON categories (parent_id);

-- -------------------------------------------------------------------
-- products
-- -------------------------------------------------------------------
CREATE TABLE products (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             text NOT NULL,           -- 'linen-blend-mini-dress-p40004535'
  name             text NOT NULL,           -- 'LINEN BLEND MINI DRESS'
  ref              text NOT NULL,           -- '1185/165', shown as COLOUR | REF
  description      text NOT NULL DEFAULT '',
  composition      text NOT NULL DEFAULT '',-- 'OUTER SHELL\n95% viscose, 5% elastane\n\nLINING\n100% polyester'
  section          section NOT NULL,        -- denormalised from the category path for cheap section-wide queries
  category_id      uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  price_cents      integer NOT NULL,
  compare_at_cents integer,                 -- set = SPECIAL PRICES
  is_new           boolean NOT NULL DEFAULT false,   -- NEW IN
  is_best_seller   boolean NOT NULL DEFAULT false,   -- BEST SELLERS
  season           text,
  status           product_status NOT NULL DEFAULT 'draft',

  -- Kept in sync by Postgres on every write; the app never touches it.
  search_tsv       tsvector GENERATED ALWAYS AS (
                     to_tsvector('english',
                       coalesce(name, '') || ' ' || coalesce(description, ''))
                   ) STORED,

  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT products_price_positive
    CHECK (price_cents > 0),
  CONSTRAINT products_compare_at_higher
    CHECK (compare_at_cents IS NULL OR compare_at_cents > price_cents)
);

CREATE UNIQUE INDEX products_slug_key    ON products (slug);
CREATE INDEX        products_browse_idx  ON products (status, category_id, created_at DESC);
CREATE INDEX        products_section_idx ON products (status, section) WHERE status = 'live';
CREATE INDEX        products_search_idx  ON products USING GIN (search_tsv);

-- -------------------------------------------------------------------
-- product_colours: what the shopper picks first; images belong here
-- -------------------------------------------------------------------
CREATE TABLE product_colours (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name       text NOT NULL,                 -- 'SAND'
  hex        char(7) NOT NULL,              -- '#c9b58f'
  images     jsonb NOT NULL DEFAULT '[]'::jsonb,   -- ["https://…/front.jpg", "https://…/detail.jpg"]
  position   integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT product_colours_hex_format
    CHECK (hex ~ '^#[0-9a-f]{6}$'),
  CONSTRAINT product_colours_images_array
    CHECK (jsonb_typeof(images) = 'array')
);

CREATE UNIQUE INDEX product_colours_product_name_key ON product_colours (product_id, name);
CREATE INDEX        product_colours_product_idx      ON product_colours (product_id, position);

-- -------------------------------------------------------------------
-- variants: one colour in one size; stock lives here
-- -------------------------------------------------------------------
CREATE TABLE variants (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  colour_id  uuid NOT NULL REFERENCES product_colours(id) ON DELETE CASCADE,
  sku        text NOT NULL,                 -- '1185/165-SAND-M'
  size       text NOT NULL,                 -- 'M', '38', '3-4 Y', 'ONE SIZE', '100 ML'
  stock_qty  integer NOT NULL DEFAULT 0,
  is_active  boolean NOT NULL DEFAULT true,
  position   integer NOT NULL DEFAULT 0,    -- size order as displayed
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT variants_stock_non_negative
    CHECK (stock_qty >= 0)
);

CREATE UNIQUE INDEX variants_sku_key         ON variants (sku);
CREATE UNIQUE INDEX variants_colour_size_key ON variants (colour_id, size);
CREATE INDEX        variants_colour_idx      ON variants (colour_id) WHERE is_active;

-- -------------------------------------------------------------------
-- updated_at trigger for the two tables that change after launch
-- -------------------------------------------------------------------
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_touch_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE TRIGGER variants_touch_updated_at
  BEFORE UPDATE ON variants
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- -------------------------------------------------------------------
-- The listing query this schema is built for (view 2 shows 5-card cycles,
-- so page in multiples of 5):
--
--   SELECT p.*
--   FROM products p
--   WHERE p.status = 'live' AND p.category_id = $1
--   ORDER BY p.created_at DESC
--   LIMIT 30 OFFSET $2;
--
-- Section-wide virtual categories use products_section_idx:
--
--   WHERE p.status = 'live' AND p.section = 'woman' AND p.compare_at_cents IS NOT NULL
--
-- Colour and size filters join through product_colours / variants; with a
-- catalogue this size they need no further indexes.
-- -------------------------------------------------------------------
