import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Habit } from "@/types/habit";
import type { HabitState } from "./HabitState";

const API_URL = import.meta.env.VITE_API_URL;

export const loadHabits = createAsyncThunk("habits/loadHabits", async () => {
  const response = await fetch(`${API_URL}/habits/`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to load habits");
  }
  return (await response.json()) as Habit[];
});

export const addHabit = createAsyncThunk(
  "habits/addHabit",
  async (
    habit: Pick<Habit, "name" | "description" | "color" | "icon" | "userId">,
  ) => {
    const response = await fetch(`${API_URL}/habits/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habit),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to add habit");
    }
    return (await response.json()) as Habit;
  },
);

export const checkHabit = createAsyncThunk(
  "habits/checkHabit",
  async (id: string) => {
    const response = await fetch(`${API_URL}/habits/${id}/checkin`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to check habit");
    }
    return (await response.json()) as Habit;
  },
);

export const deleteHabit = createAsyncThunk(
  "habits/deleteHabit",
  async (id: string) => {
    const response = await fetch(`${API_URL}/habits/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete habit");
    }
    return id;
  },
);

export const updateHabit = createAsyncThunk(
  "habits/updateHabit",
  async ({ id, updates }: { id: string; updates: Partial<Habit> }) => {
    const response = await fetch(`${API_URL}/habits/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to update habit");
    }
    return (await response.json()) as Habit;
  },
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
      .addCase(addHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload);
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        const index = state.habits.findIndex(
          (h) => h._id === action.payload._id,
        );
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      .addCase(checkHabit.fulfilled, (state, action) => {
        const index = state.habits.findIndex(
          (h) => h._id === action.payload._id,
        );
        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.habits = state.habits.filter((h) => h._id !== action.payload);
      })
      .addMatcher(
        (action) => action.type === "auth/logout/fulfilled",
        (state) => {
          state.habits = [];
          state.loading = false;
          state.error = null;
        },
      );
  },
});

export const { setHabits } = habitSlice.actions;

export default habitSlice.reducer;
