// src/middleware/auth.ts
import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth, type Session } from "../auth/auth.js";
import { AppError, asyncHandler } from "./error.js";

declare module "express-serve-static-core" {
  interface Request {
    /** Present on routes behind `requireSession`. */
    session?: Session;
  }
}

/**
 * Resolves the caller's session from the request (session cookie or
 * `Authorization: Bearer <token>`) and rejects with 401 when there is none.
 * Attaches `req.session` (`{ session, user }`) for the handler.
 */
export const requireSession = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (!session) throw new AppError(401, "Sign in to continue", "UNAUTHENTICATED");
  req.session = session;
  next();
});
