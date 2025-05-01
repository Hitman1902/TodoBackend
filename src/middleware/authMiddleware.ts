import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access Denied. No token provided." });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.status(403).json({ error: "Invalid token" });
      return;
    }

    req.user = user as JwtPayload;
    next();
  });
};

export default authenticateToken;
