export interface Habit {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  status: "active" | "established";
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
  color?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}
