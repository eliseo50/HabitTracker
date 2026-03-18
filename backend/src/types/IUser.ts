import type { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  timezone: string;
}
