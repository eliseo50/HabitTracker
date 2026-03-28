import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./Button";
import { cn } from "@/utils/merge";
import type { Habit } from "@/types/habit";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addHabit, updateHabit } from "@/store/slices/habitSlice";
import { COLORS, ICONS } from "@/utils/constants";

interface HabitFormProps {
  initialData?: Partial<Habit>;
  title: string;
}

function HabitForm({ initialData, title }: HabitFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [selectedColor, setSelectedColor] = useState(
    initialData?.color || COLORS.Blue.value,
  );
  const [selectedIcon, setSelectedIcon] = useState(
    initialData?.icon || "Dumbbell",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    console.log(user);
    const habitData = {
      name,
      description,
      color: selectedColor,
      icon: selectedIcon,
      userId: user.id,
    };

    try {
      if (initialData?._id) {
        await dispatch(
          updateHabit({ id: initialData._id, updates: habitData }),
        ).unwrap();
      } else {
        await dispatch(addHabit(habitData)).unwrap();
      }
      navigate("/");
    } catch {
      console.error("Failed to save habit:");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-8"
    >
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

      <div className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-slate-700"
          >
            Hábito
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ej: Meditar todas las mañanas"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-slate-900"
            defaultValue={initialData?.name}
            required
          />
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-slate-700"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Añade una descripción para mantenerte motivado..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all resize-none font-medium text-slate-900"
            defaultValue={initialData?.description}
          />
        </div>

        {/* Color Picker */}
        <div className="space-y-4">
          <span className="text-sm font-semibold text-slate-700">Color</span>
          <div className="flex gap-3">
            {Object.values(COLORS).map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                className={cn(
                  "w-10 h-10 rounded-full border-2 transition-all",
                  color.class,
                  selectedColor === color.value
                    ? "border-slate-900 scale-110 shadow-md outline-offset-2"
                    : "border-transparent hover:scale-105",
                )}
                title={color.value}
              />
            ))}
          </div>
        </div>

        {/* Icon Selector */}
        <div className="space-y-4">
          <span className="text-sm font-semibold text-slate-700">Icono</span>
          <div className="flex gap-3">
            {Object.keys(ICONS).map((iconName) => {
              const IconComponent = ICONS[iconName as keyof typeof ICONS];
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setSelectedIcon(iconName)}
                  className={cn(
                    "w-12 h-12 rounded-xl border-2 transition-all flex items-center justify-center",
                    selectedIcon === iconName
                      ? "border-slate-900 bg-slate-50 text-slate-900 scale-110 shadow-sm"
                      : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-300 hover:text-slate-600",
                  )}
                >
                  <IconComponent size={24} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => navigate("/")}
        >
          Cancelar
        </Button>
        <Button className="flex-1" type="submit">
          Guardar Hábito
        </Button>
      </div>
    </form>
  );
}

export default HabitForm;
