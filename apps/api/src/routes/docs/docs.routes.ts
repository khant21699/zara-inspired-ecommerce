import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Router } from "express";
import { asyncHandler } from "../../middleware/error.js";

// ../../../openapi.json from both src/routes/docs/ and dist/routes/docs/.
const SPEC_PATH = fileURLToPath(new URL("../../../openapi.json", import.meta.url));

/** The reference page: renders openapi.json with Scalar, loaded from a CDN. */
const DOCS_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Storefront API</title>
</head>
<body>
  <div id="app"></div>
  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  <script>
    Scalar.createApiReference("#app", { url: "/openapi.json", theme: "default", hideModels: false });
  </script>
</body>
</html>`;

export const docsRouter = Router();

docsRouter.get(
  "/openapi.json",
  asyncHandler(async (_req, res) => {
    res.type("application/json").send(await readFile(SPEC_PATH, "utf8"));
  }),
);

docsRouter.get("/docs", (_req, res) => {
  res.type("html").send(DOCS_HTML);
});
