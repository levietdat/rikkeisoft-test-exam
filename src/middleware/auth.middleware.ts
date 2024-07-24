import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/token-config";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User);

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header is required" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  try {
    const decoded: any = jwt.decode(token, { complete: true });

    if (
      decoded &&
      decoded.payload.exp &&
      Date.now() >= decoded.payload.exp * 1000
    ) {
      return res.status(401).json({ message: "Token has expired" });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token has expired" });
        } else {
          return res.status(401).json({ message: "Invalid token" });
        }
      }

      const user = await userRepository.findOne({
        where: { id: (decoded as any).userId },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
