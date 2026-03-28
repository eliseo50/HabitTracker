import { User } from "#/models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  try {
    if (req.cookies.session_token) {
      // return cookie
      return res.status(200).json({ user: req.user });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" },
    );

    res.cookie("session_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        timezone: user.timezone,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}
