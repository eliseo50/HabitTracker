import { Pencil, Trash2 } from "lucide-react";
import { ButtonHabit } from "./ButtonHabit";
import { ProgressBar } from "./ProgressBar";

import type { Habit } from "@/types/habit";
import { useEffect, useState } from "react";
import { ICONS } from "@/utils/constants";

interface HabitCardProps {
  habit: Habit;
  onComplete?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  icon: string;
}

const DEFAULT_PROGRESS = {
  max: 66,
  targets: [21, 66],
};

export function HabitCard({
  habit,
  onComplete,
  onDelete,
  onEdit,
  icon,
}: HabitCardProps) {
  const [checked, setChecked] = useState(isChecked(habit));

  useEffect(() => {
    setChecked(isChecked(habit));
  }, [habit]);

  const Icon = ICONS[icon as keyof typeof ICONS] || ICONS.Dumbbell;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow max-w-sm w-full relative group">
      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          title="Editar"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Eliminar"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-start gap-4">
        <div
          className="p-3 rounded-xl flex-shrink-0"
          style={{
            backgroundColor: habit.color ? `${habit.color}20` : "#f1f5f9",
          }}
        >
          <Icon size={24} style={{ color: habit.color || "#64748b" }} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-lg truncate pr-16">
            {habit.name}
          </h3>
          {habit.description && (
            <p className="text-slate-500 text-sm mt-0.5 line-clamp-2">
              {habit.description}
            </p>
          )}

          <ProgressBar
            value={habit.currentStreak}
            max={DEFAULT_PROGRESS.max}
            targets={DEFAULT_PROGRESS.targets}
          />

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
