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
        className="flex items-center gap-3 px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-xl text-zinc-400 hover:border-indigo-500/50 transition-all w-64 group"
      >
        <Search className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
        <span className="text-xs font-medium flex-1 text-left">Busca Inteligente...</span>
        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-zinc-800 border border-white/10 rounded-md text-[10px] font-bold">
          <Command className="w-2.5 h-2.5" />
          <span>K</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[15vh] p-4 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4 border-b border-white/5">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  autoFocus
                  placeholder="Pesquise agentes, módulos ou logs..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500 text-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>

              <div className="p-4 text-center py-12 text-zinc-500 text-sm">
                Nenhum resultado para "{query}"
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
