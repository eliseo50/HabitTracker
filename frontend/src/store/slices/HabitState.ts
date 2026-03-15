import type { Habit } from "../../types/habit";


export interface HabitState {
  habits: Habit[];
  loading: boolean;
  error: string | null;
}
