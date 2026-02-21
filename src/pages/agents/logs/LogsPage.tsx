import { LiveLogTerminal } from "@/components/common/LiveLogTerminal";
import { Activity, Terminal } from "lucide-react";
import { useAppStore } from "@/store";

export function LiveLogTerminalPage() {
  const { logs } = useAppStore();

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex items-end justify-between px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
               <Terminal className="w-6 h-6 text-cyan-400" />
             </div>
             <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
               Live <span className="text-cyan-500">Logs</span>
             </h1>
          </div>
          <p className="text-zinc-500 font-medium ml-14">Monitoramento de execução em tempo real da rede neural de agentes.</p>
        </div>
        
        <div className="px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-2">
           <Activity className="w-3 h-3 animate-pulse" /> Stream: Active
        </div>
      </div>

      <div className="flex-1 min-h-[600px] relative rounded-[2.5rem] overflow-hidden bg-black border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
        <LiveLogTerminal logs={logs} />
      </div>
    </div>
  );
}
