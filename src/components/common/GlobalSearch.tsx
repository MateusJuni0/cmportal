import { Search, Command, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 dark:text-zinc-400 hover:border-indigo-500/50 transition-all w-64 group"
      >
        <Search className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
        <span className="text-xs font-medium flex-1 text-left">Busca Inteligente...</span>
        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded-md text-[10px] font-bold">
          <Command className="w-2.5 h-2.5" />
          <span>K</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4 border-b border-slate-100 dark:border-white/5">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  autoFocus
                  placeholder="Pesquise agentes, módulos, leads ou logs..."
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-500 text-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="p-2">
                <div className="px-3 py-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sugestões Rápidas</span>
                </div>
                <div className="space-y-1">
                  {[
                    { label: "Criar Novo Agente", shortcut: "N", category: "Ação" },
                    { label: "Ver Logs do Nero", shortcut: "L", category: "Guardian" },
                    { label: "Dashboard Financeira", shortcut: "F", category: "Treasury" },
                    { label: "Configurações de API", shortcut: "S", category: "Geral" },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-indigo-500/10 rounded-xl transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:border-indigo-500/30">
                           <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-slate-700 dark:text-zinc-300 group-hover:text-indigo-500">{item.label}</p>
                          <p className="text-[10px] text-slate-400">{item.category}</p>
                        </div>
                      </div>
                      <div className="px-1.5 py-0.5 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded-md text-[10px] font-bold text-slate-500">
                        {item.shortcut}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
