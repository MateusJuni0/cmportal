import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bot, FileText, User, Command } from "lucide-react";
import { cn } from "@/utils/cn";

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const mockResults = [
    { type: "agent", title: "Alpha", subtitle: "SDR Focado em Tech", icon: Bot },
    { type: "agent", title: "Bravo", subtitle: "Nutrição de Leads", icon: Bot },
    { type: "lead", title: "João Silva", subtitle: "CEO @ TechCorp", icon: User },
    { type: "file", title: "Proposta_Comercial_Q3.pdf", subtitle: "Base de Conhecimento", icon: FileText },
  ].filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.subtitle.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="w-full max-w-xl bg-white dark:bg-zinc-900/90 shadow-2xl rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden backdrop-blur-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center px-4 py-4 border-b border-black/5 dark:border-white/5 gap-3">
                <Search className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Buscar agentes, leads, arquivos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-lg"
                />
                <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-zinc-500 font-mono bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                  <Command className="w-3 h-3" /> K
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {query.trim() === "" ? (
                  <div className="p-8 text-center text-slate-500 dark:text-zinc-400 text-sm">
                    Comece a digitar para pesquisar em todo o sistema.
                  </div>
                ) : mockResults.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 dark:text-zinc-400 text-sm">
                    Nenhum resultado encontrado para "{query}".
                  </div>
                ) : (
                  <div className="space-y-1">
                    {mockResults.map((result, idx) => {
                      const Icon = result.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 px-3 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl cursor-pointer group transition-colors"
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center border",
                            result.type === 'agent' ? "bg-brand-50 border-brand-200 text-brand-600 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-400" :
                            result.type === 'lead' ? "bg-green-50 border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400" :
                            "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-900 dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-[var(--color-neon-blue)] transition-colors">
                              {result.title}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-zinc-400">{result.subtitle}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
