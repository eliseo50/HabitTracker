import { Schema, model } from "mongoose";
import type { IHabit } from "@/types/IHabit.js";

const habitSchema = new Schema<IHabit>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "established"],
      default: "active",
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastCompletedDate: {
      type: Date,
    },
    color: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Habit = model<IHabit>("Habit", habitSchema);
