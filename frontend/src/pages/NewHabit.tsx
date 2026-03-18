import HabitForm from "@/components/HabitForm";

function NewHabit() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-8 gap-8">
      <h1 className="text-4xl font-bold text-slate-950">Habit Tracker</h1>
      <HabitForm title="New Habit" />
    </div>
  );
}

export default NewHabit;
