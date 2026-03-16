import type { Request, Response } from "express";
import { Habit } from "../models/Habit.js";
import { normalizeDate } from "../utils/normalizeDate.js";
import { getNewStreak } from "../utils/getNewStreak.js";
import { getIsValidStreak } from "../utils/getIsValidStreak.js";
import type { IHabit } from "../models/Habit.js";

const getHabitWithValidatedStreak = (habit: IHabit) => {
  const habitObj = habit.toObject();
  const normalizedLastCompletedDate = habitObj.lastCompletedDate
    ? normalizeDate(new Date(habitObj.lastCompletedDate))
    : null;

  if (!getIsValidStreak(normalizedLastCompletedDate)) {
    habitObj.currentStreak = 0;
  }

  return habitObj;
};

const checkIfIsOwner = (habitId: string, userId: string) => {
  if (habitId === "" || userId === "") {
    return false;
  }

  return habitId === userId;
};

export const createHabit = async (req: Request, res: Response) => {
  try {
    const { userId, name, description, color, icon } = req.body;

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

export const getHabits = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const habits = userId ? await Habit.find({ userId }) : [];
    const habitsWithValidatedStreak = habits.map(getHabitWithValidatedStreak);

    res.status(200).json(habitsWithValidatedStreak);
  } catch (error) {
    res.status(500).json({ message: "Error fetching habits", error });
  }
};

export const getHabitById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id || "";
    const { id } = req.params;
    const habit = await Habit.findById(id);

    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid habit ID" });
    }

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const isOwner = checkIfIsOwner(id, userId);
    if (!isOwner) {
      return res.status(403).json({ message: "Habit not found" });
    }

    res.status(200).json(getHabitWithValidatedStreak(habit));
  } catch (error) {
    res.status(500).json({ message: "Error fetching habit", error });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedHabit = await Habit.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
    });

    if (!updatedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: "Error updating habit", error });
  }
};

export const checkInHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

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

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedHabit = await Habit.findByIdAndDelete(id);

    if (!deletedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json(deletedHabit);
  } catch (error) {
    res.status(500).json({ message: "Error deleting habit", error });
  }
};
