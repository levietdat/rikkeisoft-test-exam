import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/token-config";
import { AppDataSource } from "../data-source";
import { compare } from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userRepository.findOne({
    where: { email },
    relations: ["role", "role.permissions"],
  });
  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const { password: _, ...userWithoutPassword } = user;
  return res.json({ user: userWithoutPassword, token });
};

export const logout = async (req: Request, res: Response) => {
  return res.json({ message: "Logged out successfully" });
};

export const getMe = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
