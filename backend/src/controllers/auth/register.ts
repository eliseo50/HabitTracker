import { User } from "../../models/User.js";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";

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
