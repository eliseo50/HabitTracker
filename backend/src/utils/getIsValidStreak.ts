import { normalizeDate } from "./normalizeDate.js";

export const getIsValidStreak = (lastCompleted: Date | null): boolean => {
  const today = normalizeDate(new Date());
  if (!lastCompleted) return false;
  if (lastCompleted.getTime() === today.getTime()) return true;
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return lastCompleted.getTime() === yesterday.getTime();
};
