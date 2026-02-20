import { useState } from "react";
import { GitCommit, History, RotateCcw, CheckCircle2, User, Clock } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface Commit {
  id: string;
  hash: string;
  message: string;
  author: string;
  date: string;
  status: "current" | "previous";
}

const INITIAL_COMMITS: Commit[] = [
  { id: "1", hash: "a1b2c3d", message: "Atualização da imagem do Hero", author: "Admin", date: "Há 10 minutos", status: "current" },
  { id: "2", hash: "e4f5g6h", message: "Ajuste na copy da seção de features", author: "Clara (IA)", date: "Ontem, 14:30", status: "previous" },
  { id: "3", hash: "i7j8k9l", message: "Novo CTA na Landing Page principal", author: "Admin", date: "Ontem, 09:15", status: "previous" },
  { id: "4", hash: "m0n1o2p", message: "Correção de responsividade (Mobile)", author: "System", date: "3 dias atrás", status: "previous" },
];

export function GitSyncTool() {
  const [commits, setCommits] = useState(INITIAL_COMMITS);
  const [revertingId, setRevertingId] = useState<string | null>(null);

  const handleRevert = (id: string) => {
    setRevertingId(id);
    setTimeout(() => {
      const updatedCommits = commits.map(c => ({
        ...c,
        status: c.id === id ? "current" : "previous" as "current" | "previous"
      }));
      // Move the reverted one to top as a new commit
      const targetCommit = updatedCommits.find(c => c.id === id);
      if (targetCommit) {
         setCommits([{
           ...targetCommit,
           id: Math.random().toString(36).substr(2, 9),
           hash: Math.random().toString(16).substr(2, 7),
           message: `Revert to: ${targetCommit.message}`,
           date: "Agora",
           status: "current"
         }, ...updatedCommits.map(c => ({...c, status: "previous" as "current"}))]);
      }
      setRevertingId(null);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-end border-b border-black/5 dark:border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <GitCommit className="w-8 h-8 text-brand-500" />
            Git Sync & Versionamento
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Controle de versão do site cmtecnologia.pt. Reverta alterações em um clique.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        <AnimatePresence>
          {commits.map((commit, index) => (
            <motion.div
              key={commit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border transition-colors",
                commit.status === "current" 
                  ? "border-brand-500/50 dark:border-[var(--color-neon-blue)]/50 shadow-[0_0_20px_var(--color-brand-500)_10%] dark:shadow-[0_0_20px_var(--color-neon-blue)_10%]" 
                  : "border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-3 rounded-xl flex items-center justify-center border",
                  commit.status === "current"
                    ? "bg-brand-50 border-brand-200 text-brand-600 dark:bg-brand-900/20 dark:border-[var(--color-neon-blue)]/30 dark:text-[var(--color-neon-blue)]"
                    : "bg-slate-50 border-slate-200 text-slate-500 dark:bg-zinc-800/50 dark:border-white/10 dark:text-zinc-400"
                )}>
                  {commit.status === "current" ? <CheckCircle2 className="w-6 h-6" /> : <History className="w-6 h-6" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 rounded text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-white/5">
                      {commit.hash}
                    </span>
                    {commit.status === "current" && (
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-600 dark:text-[var(--color-neon-blue)]">
                        Versão Atual
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                    {commit.message}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {commit.author}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {commit.date}</span>
                  </div>
                </div>
              </div>

              {commit.status === "previous" && (
                <button
                  onClick={() => handleRevert(commit.id)}
                  disabled={revertingId !== null}
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-medium hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 min-w-[140px] disabled:opacity-50"
                >
                  {revertingId === commit.id ? (
                    <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <RotateCcw className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      Reverter
                    </>
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
