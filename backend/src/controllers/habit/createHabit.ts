import type { Request, Response } from "express";
import type { AuthRequest } from "#/types/AuthRequest.js";
import { Habit } from "#/models/Habit.js";

export const createHabit = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const { userId } = authReq;
    const { name, description, color, icon } = req.body;

    const newHabit = new Habit({
      userId,
      name,
      description,
      color,
      icon,
    });

    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    res.status(500).json({ message: "Error creating habit", error });
  }
};
