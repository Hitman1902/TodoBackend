import jwt from "jsonwebtoken";
import {JwtPayload} from '../types/jwt';

export const generateToken = (
  id: string | number,
  name: string,
  email: string
): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const payload: JwtPayload = { id, name, email };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "520h",
  });
};
