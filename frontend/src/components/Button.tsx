import type { ButtonHTMLAttributes, ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/utils/merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export function Button({
  children,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className = "",
  variant = "primary",
  onClick,
}: ButtonProps) {
  const baseClassName =
    "flex items-center justify-center gap-2 rounded-full px-6 py-2.5 font-medium text-sm transition-all hover:cursor-pointer shadow-lg bg-black hover:bg-black/80 text-white hover:text-white";

  const variantClassName =
    variant === "primary"
      ? "bg-black hover:bg-black/80 text-white hover:text-white"
      : "bg-white hover:bg-white/80 text-black hover:text-black border border-black border-2";
  return (
    <button
      className={cn(baseClassName, variantClassName, className)}
      onClick={onClick}
    >
      {IconLeft && <IconLeft size={18} className="text-inherit" />}
      {children && <span className="text-inherit">{children}</span>}
      {IconRight && <IconRight size={18} className="text-inherit" />}
    </button>
  );
}
