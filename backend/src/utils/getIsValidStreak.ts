import type { IHabit } from "#/types/IHabit.js";
import { normalizeDate } from "./normalizeDate.js";

export const getIsValidStreak = (lastCompleted: Date | null): boolean => {
  const today = normalizeDate(new Date());
  if (!lastCompleted) return false;
  if (lastCompleted.getTime() === today.getTime()) return true;
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return lastCompleted.getTime() === yesterday.getTime();
};
export const getHabitWithValidatedStreak = (habit: IHabit) => {
  const habitObj = habit.toObject();
  const normalizedLastCompletedDate = habitObj.lastCompletedDate
    ? normalizeDate(new Date(habitObj.lastCompletedDate))
    : null;

  if (!getIsValidStreak(normalizedLastCompletedDate)) {
    habitObj.currentStreak = 0;
  }

  return habitObj;
};
