import "express";
import { IUser } from "./IUser.ts";
import { IHabit } from "./IHabit.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userId?: string;
      habit?: IHabit;
      habitId?: string;
    }
  }
}
