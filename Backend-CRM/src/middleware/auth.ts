import type {  Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function requireAuth(req: any, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: { code: "NO_TOKEN" } });
  }

  try {
    const token = header.split(" ")[1];
    const payload = verifyToken(token);
    req.userId = payload.sub;
    req.userRole = payload.role;
    next();
  } catch {
    return res.status(401).json({ error: { code: "INVALID_TOKEN" } });
  }
}