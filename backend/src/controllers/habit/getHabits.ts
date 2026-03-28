import type { Request, Response } from "express";
import type { AuthRequest } from "../../types/AuthRequest.js";
import { Habit } from "../../models/Habit.js";
import { getHabitWithValidatedStreak } from "../../utils/getIsValidStreak.js";

export const getHabits = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const { userId } = authReq;
    const habits = await Habit.find({ userId });
    const habitsWithValidatedStreak = habits.map(getHabitWithValidatedStreak);

    res.status(200).json(habitsWithValidatedStreak);
  } catch (error) {
    res.status(500).json({ message: "Error fetching habits", error });
  }
};
