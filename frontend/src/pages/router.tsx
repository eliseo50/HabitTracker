import { createBrowserRouter, Navigate } from "react-router";
import Home from "./Home";
import NewHabit from "./NewHabit";
import EditHabit from "./EditHabit";
import Login from "./Login";
import Register from "./Register";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/new",
    element: (
      <ProtectedRoute>
        <NewHabit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:id/edit",
    element: (
      <ProtectedRoute>
        <EditHabit />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
