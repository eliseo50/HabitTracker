import type { Request, Response } from "express";
import type { OwnershipRequest } from "@/types/AuthRequest.js";
import { getNewStreak } from "@/utils/getNewStreak.js";
import { normalizeDate } from "@/utils/normalizeDate.js";

export const checkInHabit = async (req: Request, res: Response) => {
  const habitReq = req as OwnershipRequest;
  try {
    const { habit } = habitReq;

    const today = normalizeDate(new Date());
    const lastCompleted = habit.lastCompletedDate
      ? normalizeDate(new Date(habit.lastCompletedDate))
      : null;

    if (lastCompleted && lastCompleted.getTime() === today.getTime()) {
      return res.status(400).json({ message: "Habit already completed today" });
    }

    habit.currentStreak = getNewStreak(lastCompleted, habit.currentStreak);

    const isLongestStreak = habit.currentStreak > habit.longestStreak;
    isLongestStreak && (habit.longestStreak = habit.currentStreak);

    habit.lastCompletedDate = new Date();
    await habit.save();

    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ message: "Error during check-in", error });
  }
};
