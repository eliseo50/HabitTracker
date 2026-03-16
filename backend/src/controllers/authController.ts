import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export async function register(req: Request, res: Response) {
  try {
    const { username, password, timezone } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      timezone: timezone || "UTC",
    });

    await newUser.save();

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser._id,
        username: newUser.username,
        timezone: newUser.timezone,
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    if (req.cookies.session_token) {
      return res.status(400).json({ message: "Already logged in" });
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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

export async function getSession(req: Request, res: Response) {
  const user = req.user;

  res.status(200).json({
    user: {
      id: user._id,
      username: user.username,
      timezone: user.timezone,
    },
  });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("session_token");
  res.status(200).json({ message: "Logged out" });
}
