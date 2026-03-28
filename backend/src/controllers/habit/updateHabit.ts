import type { Request, Response } from "express";
import { Habit } from "../../models/Habit.js";
import type { OwnershipRequest } from "../../types/AuthRequest.js";

export const updateHabit = async (req: Request, res: Response) => {
  const habitReq = req as OwnershipRequest;
  try {
    const { habitId } = habitReq;
    const updatedHabit = await Habit.findByIdAndUpdate(habitId, req.body, {
      returnDocument: "after",
    });

    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: "Error updating habit", error });
  }
};
