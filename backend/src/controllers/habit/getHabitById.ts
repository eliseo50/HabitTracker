import type { Request, Response } from "express";
import type { OwnershipRequest } from "../../types/AuthRequest.js";
import { getHabitWithValidatedStreak } from "../../utils/getIsValidStreak.js";

export const getHabitById = async (req: Request, res: Response) => {
  const habitReq = req as OwnershipRequest;
  try {
    const { habit } = habitReq;
    res.status(200).json(getHabitWithValidatedStreak(habit));
  } catch (error) {
    res.status(500).json({ message: "Error fetching habit", error });
  }
};
