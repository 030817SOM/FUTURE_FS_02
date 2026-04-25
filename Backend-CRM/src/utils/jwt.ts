import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function signToken(payload: { sub: string; role: string }) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
    issuer: "lumen-crm",
    audience: "lumen-users"
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET, {
    issuer: "lumen-crm",
    audience: "lumen-users"
  }) as any;
}
