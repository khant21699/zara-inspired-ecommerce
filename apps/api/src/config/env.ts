import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  // Comma-separated list of allowed browser origins (the web app's URLs).
  FRONTEND_ORIGIN: z
    .string()
    .default("http://localhost:3000")
    .transform((v) => v.split(",").map((s) => s.trim()).filter(Boolean)),
  // Better Auth: signs session cookies and tokens; generate with `npx @better-auth/cli secret`.
  BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
  // The API's own public URL (e.g. https://zara-inspired-ecommerce-api.vercel.app); auth routes hang off it.
  BETTER_AUTH_URL: z.url(),
});

const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv.success) {
  // Throw rather than exit so a serverless host's runtime log shows the reason.
  throw new Error(`Invalid environment variables: ${JSON.stringify(z.treeifyError(parsedEnv.error))}`);
}

export const env = parsedEnv.data;
