import type { Document, Types } from "mongoose";

export interface IHabit extends Document {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  status: "active" | "established";
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: Date;
  color?: string;
  icon?: string;
}
