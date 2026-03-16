import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.session_token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const hasUserId = typeof decoded !== "string" && "userId" in decoded;
    if (!hasUserId) throw new Error("Invalid token");

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error: any) {
    return res
      .status(403)
      .json({ message: "Failed to authenticate token", error: error.message });
  }
};
