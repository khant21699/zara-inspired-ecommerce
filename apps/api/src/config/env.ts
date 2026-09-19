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
});

const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv.success) {
  // Throw rather than exit so a serverless host's runtime log shows the reason.
  throw new Error(`Invalid environment variables: ${JSON.stringify(z.treeifyError(parsedEnv.error))}`);
}

export const env = parsedEnv.data;
