import type { ZodType } from "zod";
import { AppError } from "./error.js";

/** Parses with a zod schema; a failure becomes a 400 that names the first bad field. */
export function parse<T>(schema: ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (result.success) return result.data;
  const issue = result.error.issues[0];
  const where = issue?.path.length ? `${issue.path.join(".")}: ` : "";
  throw new AppError(400, `${where}${issue?.message ?? "Invalid request"}`, "VALIDATION_ERROR");
}
