import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Habit } from "../../types/habit";
import type { HabitState } from "./HabitState";

const API_URL = import.meta.env.VITE_API_URL;

export const loadHabits = createAsyncThunk("habits/loadHabits", async () => {
  const response = await fetch(`${API_URL}/habits/`);
  if (!response.ok) {
    throw new Error("Failed to load habits");
  }
  return (await response.json()) as Habit[];
});

export const addHabit = createAsyncThunk(
  "habits/addHabit",
  async (habit: Omit<Habit, "_id" | "userId" | "createdAt" | "updatedAt" | "isChecked">) => {
    const response = await fetch(`${API_URL}/habits/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habit),
    });
    if (!response.ok) {
      throw new Error("Failed to add habit");
    }
    return (await response.json()) as Habit;
  }
);

export const checkHabit = createAsyncThunk(
  "habits/checkHabit",
  async (id: string) => {
    const response = await fetch(`${API_URL}/habits/${id}/checkin`, {
      method: "POST",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to check habit");
    }
    return (await response.json()) as Habit;
  }
);

const initialState: HabitState = {
  habits: [],
  loading: false,
  error: null,
};

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load Habits
      .addCase(loadHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(loadHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar los hábitos";
      })
      // Add Habit
      .addCase(addHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload);
      })
      // Check Habit
      .addCase(checkHabit.fulfilled, (state, action) => {
        const index = state.habits.findIndex((h) => h._id === action.payload._id);
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      });
  },
});

export const { setHabits } = habitSlice.actions;

export default habitSlice.reducer;
