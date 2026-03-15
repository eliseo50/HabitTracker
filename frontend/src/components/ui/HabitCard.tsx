import { File } from "lucide-react";
import { ButtonHabit } from "./ButtonHabit";

import type { Habit } from "../../types/habit";
import { useEffect, useState } from "react";

interface HabitCardProps {
  habit: Habit;
  onComplete?: () => void;
}

export function HabitCard({ habit, onComplete }: HabitCardProps) {
  // Use habit.icon if provided and valid in lucide, otherwise default to File
  const Icon = File; // For now default to File as dynamic icon loading requires a map
  const [checked, setChecked] = useState(isChecked(habit));

  useEffect(() => {
    setChecked(isChecked(habit));
  }, [habit]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow max-w-sm w-full">
      <div className="flex items-start gap-4">
        <div
          className="p-3 rounded-xl flex-shrink-0"
          style={{
            backgroundColor: habit.color ? `${habit.color}20` : "#f1f5f9",
          }}
        >
          <Icon
            size={24}
            className="text-slate-900"
            style={{ color: habit.color || "inherit" }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-lg truncate">
            {habit.name}
          </h3>
          {habit.description && (
            <p className="text-slate-500 text-sm mt-0.5 line-clamp-2">
              {habit.description}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Racha:{" "}
              <span className="text-slate-900">{habit.currentStreak} días</span>
            </div>
            <ButtonHabit checked={checked} onClick={onComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}

const isChecked = (habit: Habit) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastCompletedDate = habit.lastCompletedDate
    ? new Date(habit.lastCompletedDate)
    : null;
  if (!lastCompletedDate) return false;
  lastCompletedDate.setHours(0, 0, 0, 0);
  return today.getTime() === lastCompletedDate.getTime();
};
