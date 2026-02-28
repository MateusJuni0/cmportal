import { Activity, Terminal, Shield, Zap, Search, Download, Trash2, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useState } from "react";

// Mock de logs para visualização imediata de elite
const mockLogs = [
  { id: '1', timestamp: '11:42:01', level: 'info', agent: 'NEURO-SDR', message: 'Iniciando varredura de leads no LinkedIn...' },
  { id: '2', timestamp: '11:42:05', level: 'success', agent: 'NEURO-SDR', message: 'Conexão estabelecida com 12 prospects de alta intenção.' },
  { id: '3', timestamp: '11:42:10', level: 'warn', agent: 'VULKAN-CODE', message: 'Latência detectada no endpoint da VPS (72.60.88.137).' },
  { id: '4', timestamp: '11:42:15', level: 'error', agent: 'SYSTEM', message: 'Tentativa de acesso não autorizado bloqueada pelo Firewall Sovereign.' },
  { id: '5', timestamp: '11:42:20', level: 'info', agent: 'PIXEL-PERFECT', message: 'Renderizando nova UI Elite no portal cmtecnologia.pt.' },
];

export function LiveLogTerminalPage() {
  const [filter, setFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-24 px-2 md:px-0"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">
            <Cpu className="w-3 h-3" />
            Neural Network Monitoring
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Terminal</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium">Fluxo de dados bruto da inteligência operacional da CMTec.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 md:flex-none p-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all"
          >
            <Download className="w-5 h-5" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 md:flex-none p-4 rounded-2xl bg-white/5 border border-white/10 text-rose-500/50 hover:text-rose-500 transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
          <div className="flex-1 md:flex-none px-6 py-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
             <Activity className="w-4 h-4 animate-pulse" /> STREAMING ACTIVE
          </div>
        </div>
      </motion.div>

      {/* Terminal UI */}
      <motion.div 
        variants={itemVariants}
        className="flex-1 min-h-[500px] bg-[#050505] rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
      >
        <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/[0.03] to-transparent pointer-events-none" />

        {/* Terminal Header */}
        <div className="h-14 bg-white/5 border-b border-white/5 flex items-center px-8 justify-between backdrop-blur-3xl relative z-10">
          <div className="flex gap-2">
            {['all', 'error', 'warn', 'success'].map(l => (
              <button 
                key={l}
                onClick={() => setFilter(l)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border",
                  filter === l 
                    ? "bg-white text-black border-white" 
                    : "text-zinc-500 border-white/5 hover:border-white/20"
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600">
               <Shield className="w-3 h-3 text-cyan-500" /> ENCRYPTED
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="text-[10px] font-mono text-zinc-500">TTY: /dev/sovereign-os</div>
          </div>
        </div>

        {/* Logs Feed */}
        <div className="flex-1 overflow-y-auto p-8 font-mono space-y-3 relative z-10 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {mockLogs.map((log) => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={log.id}
                className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6 group py-1"
              >
                <span className="text-zinc-700 text-[10px] font-bold mt-1 shrink-0">[{log.timestamp}]</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter shrink-0 w-fit",
                  log.level === 'error' && "bg-rose-500/10 text-rose-500",
                  log.level === 'warn' && "bg-amber-500/10 text-amber-500",
                  log.level === 'success' && "bg-emerald-500/10 text-emerald-500",
                  log.level === 'info' && "bg-cyan-500/10 text-cyan-500",
                )}>
                  {log.level}
                </span>
                <span className="text-[var(--color-neon-purple)] font-black text-[10px] uppercase tracking-widest mt-1 shrink-0">
                  {log.agent}
                </span>
                <span className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed group-hover:text-white transition-colors">
                  {log.message}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Cursor Blinker */}
          <div className="flex items-center gap-2 pt-4">
             <div className="w-2 h-4 bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
             <span className="text-zinc-800 text-xs uppercase font-black tracking-widest">Aguardando novos pacotes de dados...</span>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-black/40 border-t border-white/5 backdrop-blur-xl relative z-10">
          <div className="relative flex items-center group">
            <Terminal className="absolute left-5 w-4 h-4 text-zinc-600 group-focus-within:text-cyan-500 transition-colors" />
            <input 
              placeholder="Enviar comando direto para a rede neural..."
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-14 py-4 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/30 transition-all font-mono"
            />
            <div className="absolute right-5 flex gap-2">
              <span className="px-2 py-1 bg-white/5 rounded text-[9px] font-black text-zinc-600">CMD</span>
              <span className="px-2 py-1 bg-white/5 rounded text-[9px] font-black text-zinc-600">ENTER</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
