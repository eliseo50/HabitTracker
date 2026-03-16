import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./pages/router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { initializeAuth } from "./store/slices/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
