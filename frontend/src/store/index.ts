import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./slices/habitSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    habits: habitReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
