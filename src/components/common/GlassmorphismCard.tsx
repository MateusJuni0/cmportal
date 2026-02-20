import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassmorphismCard({ children, className }: GlassmorphismCardProps) {
  return (
    <div className={cn(
      "bg-white/5 dark:bg-[#1A1A1A]/40 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-2xl p-6",
      className
    )}>
      {children}
    </div>
  );
}
