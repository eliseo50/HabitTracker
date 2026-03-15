import { createBrowserRouter } from "react-router";
import Home from "./Home";
import NewHabit from "./NewHabit";
import EditHabit from "./EditHabit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new",
    element: <NewHabit />,
  },
  {
    path: "/:id/edit",
    element: <EditHabit />,
  },
]);
