import { useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "./components/ui/Button";
import { HabitCard } from "./components/ui/HabitCard";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { loadHabits, checkHabit } from "./store/slices/habitSlice";

function App() {
  const dispatch = useAppDispatch();
  const { habits, loading, error } = useAppSelector((state) => state.habits);

  useEffect(() => {
    dispatch(loadHabits());
  }, [dispatch]);

  const handleComplete = (id: string) => {
    dispatch(checkHabit(id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-8 gap-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-slate-950">Habit Tracker</h1>
        <Button iconRight={Plus}>Crear Hábito</Button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-slate-500 mt-8">
          <Loader2 className="animate-spin" />
          <span>Cargando hábitos...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mt-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-4">
        {habits.map((habit) => (
          <HabitCard
            key={habit._id}
            habit={habit}
            onComplete={() => handleComplete(habit._id)}
          />
        ))}
      </div>

      {!loading && habits.length === 0 && !error && (
        <div className="text-center mt-12 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md">
          <p className="text-slate-500">
            No hay hábitos guardados. ¡Crea uno nuevo para empezar a trackear tu
            progreso!
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
