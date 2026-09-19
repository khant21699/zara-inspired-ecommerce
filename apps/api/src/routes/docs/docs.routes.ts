import { Router } from "express";
import spec from "../../openapi.json" with { type: "json" };

/** The reference page: renders the OpenAPI document with Scalar, loaded from a CDN. */
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

// Imported rather than read from disk so serverless bundlers ship it with the function.
docsRouter.get("/openapi.json", (_req, res) => {
  res.json(spec);
});

docsRouter.get("/docs", (_req, res) => {
  res.type("html").send(DOCS_HTML);
});
