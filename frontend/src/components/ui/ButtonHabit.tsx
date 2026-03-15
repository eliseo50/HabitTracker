import { Check, CheckCircle } from "lucide-react";
import { Button } from "./Button";

interface ButtonHabitProps {
  checked: boolean;
  onClick?: () => void;
}

export function ButtonHabit({ checked, onClick }: ButtonHabitProps) {
  const className = checked
    ? "px-4 py-2 bg-transparent hover:bg-transparent cursor-auto shadow-none text-green-600 hover:text-green-600 border border-green-600 hover:cursor-auto"
    : "px-4 py-2";

  return (
    <Button
      onClick={onClick}
      iconLeft={checked ? CheckCircle : Check}
      className={className}
      disabled={checked}
    >
      {checked ? "Completado" : "Completar"}
    </Button>
  );
}
