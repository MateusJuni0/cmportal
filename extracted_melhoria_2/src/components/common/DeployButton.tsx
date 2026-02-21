import { useState } from "react";
import { Rocket, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export function DeployButton() {
  const [status, setStatus] = useState<"idle" | "deploying" | "success">("idle");
  const [progress, setProgress] = useState(0);

  const handleDeploy = () => {
    if (status !== "idle") return;
    setStatus("deploying");
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 20;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setProgress(0);
        }, 3000);
      }
      setProgress(Math.min(current, 100));
    }, 400);
  };

  return (
    <div className="relative">
      <button
        onClick={handleDeploy}
        disabled={status !== "idle"}
        className={cn(
          "relative overflow-hidden group rounded-xl px-4 py-2 font-medium transition-all duration-300 flex items-center gap-2",
          status === "idle" 
            ? "bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_15px_var(--color-neon-purple)] dark:shadow-[0_0_15px_var(--color-neon-blue)]" 
            : status === "success"
            ? "bg-green-500 text-white shadow-[0_0_15px_var(--color-neon-green)]"
            : "bg-slate-800 text-slate-300"
        )}
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              <span className="text-sm">Deploy Now</span>
            </motion.div>
          )}
          {status === "deploying" && (
            <motion.div key="deploying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--color-neon-blue)]" />
              <span className="text-sm">{Math.floor(progress)}%</span>
            </motion.div>
          )}
          {status === "success" && (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Live!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar background for deploying state */}
        {status === "deploying" && (
          <div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        )}
      </button>
    </div>
  );
}
