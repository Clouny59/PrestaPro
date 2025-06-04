import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.JWT_SECRET || "monsecretchangele",
    (err: VerifyErrors | null, user: string | JwtPayload | undefined) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
}
