import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface NeumorphismButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function NeumorphismButton({ children, className, variant = "primary", ...props }: NeumorphismButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2",
        "bg-[#1A1A1A] border border-transparent",
        "shadow-[5px_5px_10px_#050505,-5px_-5px_10px_#2f2f2f]",
        "hover:shadow-[inset_5px_5px_10px_#050505,inset_-5px_-5px_10px_#2f2f2f]",
        variant === "primary" ? "text-[var(--color-neon-blue)]" : "text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
