import { Schema, model } from "mongoose";
import type { IUser } from "../types/IUser.js";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      default: "UTC",
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", userSchema);
