import { LiveLogTerminal } from "@/components/common/LiveLogTerminal";
import { Activity } from "lucide-react";

export function LiveLogTerminalPage() {
  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            Terminal de Logs
            <span className="px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-[var(--color-neon-green)] text-xs font-semibold flex items-center gap-1.5 border border-green-200 dark:border-green-800/50">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Real-Time
            </span>
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Acompanhe as ações, pensamentos e decisões dos seus agentes de forma transparente.
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-purple-500/5 dark:from-[var(--color-neon-blue)]/5 dark:to-[var(--color-neon-purple)]/5 rounded-2xl pointer-events-none" />
        <LiveLogTerminal />
      </div>
    </div>
  );
}
