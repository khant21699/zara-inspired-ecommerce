import type { Shape } from "./types";

/** Abstract garment silhouettes drawn in a 200×300 viewBox. */
export const SILHOUETTES: Record<Shape, { body: string; detail?: string; strokeDetail?: boolean }> = {
  dress: {
    body: "M70 44 L88 40 C92 56 108 56 112 40 L130 44 L136 96 L128 120 L152 262 L48 262 L72 120 L64 96 Z",
  },
  top: {
    body: "M62 70 L138 70 L142 120 L138 176 L62 176 L58 120 Z",
    detail: "M62 70 C80 60 120 60 138 70",
    strokeDetail: true,
  },
  tee: {
    body: "M58 58 L86 46 C92 60 108 60 114 46 L142 58 L166 96 L140 108 L136 196 L64 196 L60 108 L34 96 Z",
  },
  shirt: {
    body: "M58 58 L86 46 C92 60 108 60 114 46 L142 58 L176 178 L154 184 L140 122 L138 216 L62 216 L60 122 L46 184 L24 178 Z",
    detail: "M86 46 L100 70 L114 46 M100 70 L100 214",
    strokeDetail: true,
  },
  knit: {
    body: "M58 58 L86 46 C92 60 108 60 114 46 L142 58 L176 178 L154 184 L140 122 L138 216 L62 216 L60 122 L46 184 L24 178 Z",
  },
  jacket: {
    body: "M52 56 L86 44 L100 74 L114 44 L148 56 L180 176 L156 182 L146 130 L146 226 L54 226 L54 130 L44 182 L20 176 Z",
    detail: "M86 44 L100 124 L114 44",
    strokeDetail: true,
  },
  coat: {
    body: "M52 56 L86 44 L100 74 L114 44 L148 56 L182 186 L158 192 L148 136 L156 276 L44 276 L52 136 L42 192 L18 186 Z",
    detail: "M86 44 L100 130 L114 44 M100 130 L100 276",
    strokeDetail: true,
  },
  trousers: {
    body: "M64 40 L136 40 L146 276 L108 276 L100 130 L92 276 L54 276 Z",
  },
  skirt: {
    body: "M70 84 L130 84 L152 244 L48 244 Z",
  },
  shoe: {
    body: "M30 214 C30 194 44 186 62 184 L98 168 C118 158 142 162 160 176 L172 214 L172 226 L30 226 Z",
    detail: "M30 226 L172 226",
    strokeDetail: true,
  },
  bag: {
    body: "M48 128 L152 128 L164 256 L36 256 Z",
    detail: "M76 128 C80 74 120 74 124 128",
    strokeDetail: true,
  },
  hat: {
    body: "M56 168 C56 118 144 118 144 168 L182 172 C182 182 18 182 18 172 Z",
  },
  perfume: {
    body: "M62 120 L138 120 L144 262 L56 262 Z",
    detail: "M86 78 L114 78 L114 120 L86 120 Z",
  },
  onesie: {
    body: "M58 60 L86 48 C92 60 108 60 114 48 L142 60 L164 100 L140 110 L140 176 L118 176 L110 214 L90 214 L82 176 L60 176 L60 110 L36 100 Z",
  },
};

/** Backdrop tones: light set for dark garments, darker set for pale garments. */
export const BACKDROPS_LIGHT = ["#f1efea", "#ebe8e2", "#e6e2da", "#efe9e0", "#e9e6e3"];
export const BACKDROPS_DARK = ["#cfcac1", "#c8c3bb", "#d3cec5", "#c4c0b8", "#cbc6bd"];
