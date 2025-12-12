import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config";

const auth = (...role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }
      const decoded = Jwt.verify(token, config.jwt_secret_key as string) as Jwt.JwtPayload;
      req.user = decoded;

      if (role.length && !role.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: You don't have enough permission" });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
};

export default auth;
