import type { Request } from "express";
import type { IHabit } from "./IHabit.js";
import type { IUser } from "./IUser.js";

export interface AuthRequest extends Request {
  user: IUser;
  userId: string;
}

export interface OwnershipRequest extends AuthRequest {
  habit: IHabit;
  habitId: string;
}
