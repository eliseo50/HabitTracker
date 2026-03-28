import { Habit } from "../models/Habit.js";
import { getIsOwner } from "../utils/getIsOwner.js";
import type { Request, Response, NextFunction } from "express";

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req;
  const habitId = req.params.id;
  const habit = await Habit.findById(habitId);

  if (!habit) {
    return res.status(404).json({ message: "Habit not found" });
  }

  const habitUserId = habit.userId.toString();

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (typeof habitId !== "string") {
    return res.status(400).json({ message: "Invalid habit ID" });
  }

  if (!getIsOwner(userId, habitUserId)) {
    return res.status(403).json({ message: "Habit not found" });
  }

  req.habitId = habitId;
  req.habit = habit;
  next();
};
