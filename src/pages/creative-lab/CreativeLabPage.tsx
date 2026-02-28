import { useState } from "react";
import { ImageIcon, FileText, Video, Sparkles, Loader2, Download, Copy, Wand2, Cpu, History, Play, Send } from "lucide-react";
import { cn } from "@/utils/cn";
import { GlassmorphismCard } from "@/components/common/GlassmorphismCard";

type Tab = "image" | "copy" | "video";

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "image", label: "Imagem Sniper", icon: ImageIcon, color: "text-blue-400" },
  { id: "copy", label: "Copy Elite", icon: FileText, color: "text-purple-400" },
  { id: "video", label: "Vídeo Pitch", icon: Video, color: "text-rose-400" },
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
    setTimeout(() => {
      setIsGenerating(false);
      setResult(activeTab === "copy" ? "Assunto: Proposta de Valor Exclusiva...\n\nOlá,\n\nNotei que a sua operação..." : "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 md:gap-10 pb-24 px-2 md:px-0 bg-[#0A0A0A]">
      {/* Header Minimalist (Removido Framer Motion para teste de estabilidade) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--color-neon-purple)] font-black text-[10px] uppercase tracking-[0.3em]">
            <Wand2 className="w-3 h-3" />
            Neural Content Synthesis
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)]">Lab</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium">Gere ativos de prospecção com IA soberana.</p>
        </div>
        
        <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl w-full md:w-fit backdrop-blur-xl">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setResult(null); }}
                className={cn(
                  "flex-1 md:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                  isActive ? "bg-[var(--color-neon-purple)] text-white" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : tab.color)} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <GlassmorphismCard className="p-6 md:p-8 border border-white/5 bg-white/[0.01] flex flex-col gap-6 relative overflow-hidden">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Cpu className="w-3 h-3 text-[var(--color-neon-purple)]" /> Engenharia de Prompt
              </h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Descreva o que deseja gerar..."
                className="w-full h-40 bg-black border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-[var(--color-neon-purple)] outline-none resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl disabled:opacity-50"
            >
              {isGenerating ? "Sintetizando..." : "Gerar com Inteligência"}
            </button>
          </GlassmorphismCard>

          <GlassmorphismCard className="p-4 border border-white/5 bg-white/[0.01]">
             <h3 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-2">
               <History className="w-3 h-3" /> History
             </h3>
             <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[9px] text-zinc-500 font-bold uppercase">Nenhum registro recente</div>
             </div>
          </GlassmorphismCard>
        </div>

        <div className="lg:col-span-7">
          <div className="h-full min-h-[400px] bg-black rounded-[2rem] border border-white/10 flex flex-col relative overflow-hidden shadow-2xl">
            <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 justify-between">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
              <div className="text-[9px] font-black text-[var(--color-neon-purple)] uppercase tracking-widest">Preview Engine</div>
              <div className="w-8" />
            </div>

            <div className="flex-1 p-6 flex items-center justify-center relative">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-[var(--color-neon-purple)]" />
                  <p className="text-[10px] font-black text-white uppercase tracking-widest animate-pulse">Sintetizando...</p>
                </div>
              ) : result ? (
                <div className="w-full h-full">
                  {activeTab === "image" ? (
                    <img src={result} className="w-full h-full object-cover rounded-xl" />
                  ) : activeTab === "copy" ? (
                    <div className="p-6 bg-white/5 rounded-xl font-mono text-xs text-zinc-300 whitespace-pre-wrap h-full border border-white/10 overflow-y-auto">
                       {result}
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-zinc-900 rounded-xl">
                       <Play className="w-12 h-12 text-[var(--color-neon-purple)]" />
                       <span className="text-[10px] font-black text-white uppercase">Vídeo Pitch Pronto</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Sparkles className="w-8 h-8 text-zinc-800 mx-auto" />
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Aguardando Parâmetros</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
