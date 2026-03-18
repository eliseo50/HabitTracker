import { useParams } from "react-router";
import { useAppSelector } from "@/store/hooks";
import HabitForm from "@/components/HabitForm";

function EditHabit() {
  const { id } = useParams();
  const habits = useAppSelector((state) => state.habits.habits);
  const habit = habits.find((h) => h._id === id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-8 gap-8">
      <h1 className="text-4xl font-bold text-slate-950">Habit Tracker</h1>
      <HabitForm title="Edit Habit" initialData={habit} />
    </div>
  );
}

export default EditHabit;
