import { Schema, model } from "mongoose";
import type { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  timezone: string;
}

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
