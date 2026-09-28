// src/routes/me/me.routes.ts
import { Router } from "express";
import { requireSession } from "../../middleware/auth.js";

/** Routes about the signed-in user. Everything here needs a session. */
export const meRouter = Router();

meRouter.use(requireSession);

/** The caller's profile and the session it is using. */
meRouter.get("/", (req, res) => {
  const { user, session } = req.session!;
  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image ?? null,
      createdAt: user.createdAt,
    },
    session: {
      id: session.id,
      expiresAt: session.expiresAt,
    },
  });
});
