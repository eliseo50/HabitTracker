import type { Request, Response } from "express";
import type { OwnershipRequest } from "@/types/AuthRequest.js";
import { Habit } from "@/models/Habit.js";

export const deleteHabit = async (req: Request, res: Response) => {
  const habitReq = req as OwnershipRequest;
  try {
    const { habitId } = habitReq;
    const deletedHabit = await Habit.findByIdAndDelete(habitId);

    if (!deletedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json(deletedHabit);
  } catch (error) {
    res.status(500).json({ message: "Error deleting habit", error });
  }
};
