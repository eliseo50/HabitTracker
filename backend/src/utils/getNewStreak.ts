import { normalizeDate } from './normalizeDate.js';

export const getNewStreak = (lastCompleted: Date | null, streak: number, today: Date = normalizeDate(new Date())): number => {
  if (!lastCompleted) return 1;

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return lastCompleted.getTime() === yesterday.getTime() ?
    streak + 1
    : 1;
};
