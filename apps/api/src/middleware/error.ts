// src/middleware/error.ts
import type { Request, Response, NextFunction, RequestHandler } from "express";
import { env } from "../config/env.js";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code = "APP_ERROR",
  ) {
    super(message);
  }
}

export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `No route ${req.method} ${req.path}`,
    },
  });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { code: err.code, message: err.message },
    });
  }

  console.error(err);

  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message:
        env.NODE_ENV === "production" ? "Something went wrong" : String(err),
    },
  });
}
