import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      return data.user as User;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error de conexión",
      );
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    userData: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Error al registrarse");
      }

      return data.user as User;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error de conexión",
      );
    }
  },
);

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/session`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        return rejectWithValue("No session found");
      }

      const data = await response.json();
      return data.user as User;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error de conexión",
      );
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        return rejectWithValue("Error al cerrar sesión");
      }

      return null;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error de conexión",
      );
    }
  },
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        initializeAuth.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
        },
      )
      .addCase(initializeAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
