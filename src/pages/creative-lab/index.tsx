import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, FileText, Video, Sparkles, Loader2, Download, Copy as CopyIcon } from "lucide-react";
import { cn } from "@/utils/cn";

type Tab = "image" | "copy" | "video";

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "image", label: "Imagem de Prospecção", icon: ImageIcon },
  { id: "copy", label: "Copy de E-mail", icon: FileText },
  { id: "video", label: "Vídeo Pitch", icon: Video },
];

export function CreativeLab() {
  const [activeTab, setActiveTab] = useState<Tab>("image");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setResult(null);

    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      if (activeTab === "image") {
        setResult("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop");
      } else if (activeTab === "copy") {
        setResult("Olá, notei que sua empresa tem expandido rapidamente. \n\nDesenvolvemos uma solução focada em otimizar processos de vendas com IA que pode aumentar sua conversão em 30%. \n\nPodemos marcar uma breve call na terça?");
      } else {
        setResult("video-placeholder");
      }
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Multimodal Creative Lab</h1>
        <p className="text-slate-500 dark:text-zinc-400">
          Gere ativos de prospecção hiper-personalizados usando IA generativa avançada.
        </p>
      </div>

      <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-2xl w-fit border border-black/5 dark:border-white/10 p-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setResult(null);
                setPrompt("");
              }}
              className={cn(
                "relative px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 outline-none",
                isActive ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="creative-lab-tabs"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-sm border border-black/5 dark:border-white/5 rounded-xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Input Form Section */}
        <div className="glass-card flex flex-col p-6 gap-6 h-full">
          <div>
            <h2 className="text-xl font-semibold mb-1">O que vamos criar?</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Descreva detalhadamente o ativo que deseja gerar para sua campanha.
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                activeTab === "image"
                  ? "Ex: Uma imagem profissional de um dashboard de vendas com gráficos neon, fundo escuro luxuoso..."
                  : activeTab === "copy"
                  ? "Ex: Um email de prospecção curto, tom persuasivo, para diretores de vendas de empresas de tecnologia..."
                  : "Ex: Um script de vídeo de 30 segundos oferecendo nossa solução de IA para reduzir churn..."
              }
              className="flex-1 w-full bg-black/5 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-[var(--color-neon-blue)] transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-zinc-600 shadow-inner"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full relative group overflow-hidden rounded-xl bg-brand-600 dark:bg-zinc-800 text-white font-medium p-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-brand-400 to-brand-600 dark:from-[var(--color-neon-blue)] dark:to-[var(--color-neon-purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="relative bg-brand-600 dark:bg-zinc-900 px-4 py-3 rounded-xl flex items-center justify-center gap-2">
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white dark:text-[var(--color-neon-blue)]" />
                  <span>Sintetizando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-white dark:text-[var(--color-neon-blue)]" />
                  <span>Gerar Ativo</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Preview Section */}
        <div className="glass-card p-6 h-full flex flex-col">
          <h2 className="text-xl font-semibold mb-6">Preview</h2>
          
          <div className="flex-1 bg-black/5 dark:bg-zinc-900/50 rounded-2xl border border-black/10 dark:border-white/5 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-brand-500/30 dark:border-[var(--color-neon-blue)]/30 rounded-full animate-pulse" />
                    <div className="w-16 h-16 border-4 border-brand-500 dark:border-[var(--color-neon-blue)] rounded-full border-t-transparent animate-spin absolute inset-0" />
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 animate-pulse">
                    Processando com IA...
                  </p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full h-full flex flex-col"
                >
                  {activeTab === "image" && (
                    <div className="w-full h-full relative group rounded-xl overflow-hidden">
                      <img src={result} alt="Generated" className="w-full h-full object-cover rounded-xl" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                        <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                  {activeTab === "copy" && (
                    <div className="w-full h-full text-left p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-black/5 dark:border-white/5 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">
                      {result}
                      <button className="absolute top-8 right-8 p-2 bg-slate-100 dark:bg-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-600 rounded-lg text-slate-600 dark:text-zinc-300 transition-colors">
                        <CopyIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {activeTab === "video" && (
                    <div className="w-full h-full flex items-center justify-center bg-black/90 rounded-xl relative">
                      <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center pl-1 backdrop-blur-md border border-brand-500/50 text-brand-500 cursor-pointer hover:scale-110 transition-transform">
                        <Video className="w-8 h-8" />
                      </div>
                      <p className="absolute bottom-6 text-xs font-mono text-brand-500/70">video_render_v1.mp4</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center max-w-sm"
                >
                  <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-black/5 dark:border-white/5">
                    <Sparkles className="w-8 h-8 text-slate-400 dark:text-zinc-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Aguardando instruções</h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-500">
                    Descreva o que você deseja criar no formulário ao lado e deixe a IA fazer a mágica.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
