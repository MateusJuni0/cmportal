import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, FileText, Video, Sparkles, Loader2, Download, Copy as CopyIcon, Wand2, Cpu, History, Play, Send } from "lucide-react";
import { cn } from "@/utils/cn";
import { useState } from "react";
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
      setResult(activeTab === "copy" ? "Assunto: Proposta de Valor Exclusiva para a [Empresa]\n\nOlá [Nome],\n\nNotei que a sua operação de vendas está a escalar e gostaria de apresentar como a CMTecnologia está a usar IA para triplicar a conversão de leads qualificados..." : "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop");
    }, 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto h-full flex flex-col gap-10 pb-24 px-2 md:px-0"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--color-neon-purple)] font-black text-[10px] uppercase tracking-[0.3em]">
            <Wand2 className="w-3 h-3" />
            Neural Content Synthesis
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)]">Lab</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium max-w-md">Gere ativos de prospecção hiper-personalizados com o poder da IA soberana.</p>
        </div>
        
        <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl w-full md:w-fit backdrop-blur-xl">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                  isActive ? "bg-[var(--color-neon-purple)] text-white shadow-lg shadow-[var(--color-neon-purple)]/20" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : tab.color)} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Input & Control Area */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-8">
          <GlassmorphismCard className="p-8 md:p-10 border border-white/5 bg-white/[0.01] flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-neon-purple)]/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="space-y-4">
              <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-3">
                <Cpu className="w-4 h-4 text-[var(--color-neon-purple)]" /> Engenharia de Prompt
              </h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  activeTab === "image"
                    ? "Ex: Imagem 3D de um dashboard neon com foco em ROI para imobiliárias..."
                    : activeTab === "copy"
                    ? "Ex: Email curto e direto oferecendo automação de leads para CEOs..."
                    : "Ex: Script de 15 segundos impactante sobre redução de custos com IA..."
                }
                className="w-full h-48 bg-black/40 border border-white/10 rounded-3xl p-6 text-sm text-white focus:border-[var(--color-neon-purple)] focus:ring-1 focus:ring-[var(--color-neon-purple)]/30 outline-none transition-all resize-none placeholder:text-zinc-700 shadow-inner leading-relaxed font-medium"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(157, 0, 255, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-5 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-[2rem] shadow-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sintetizando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Gerar com Inteligência</span>
                </>
              )}
            </motion.button>
          </GlassmorphismCard>

          {/* History / Parameters Mini Card */}
          <GlassmorphismCard className="p-6 border border-white/5 bg-white/[0.01]">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                  <History className="w-3 h-3" /> Synthesis History
                </h3>
                <span className="text-[9px] font-black text-zinc-800 uppercase">3 Ativos Salvos</span>
             </div>
             <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-[var(--color-neon-purple)]/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center border border-white/5 group-hover:text-[var(--color-neon-purple)] transition-colors">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div className="text-[10px] font-bold text-zinc-500 truncate max-w-[150px]">Campanha Imobiliária Alpha...</div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-zinc-700 group-hover:text-white transition-colors" />
                  </div>
                ))}
             </div>
          </GlassmorphismCard>
        </motion.div>

        {/* Live Preview Area */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <div className="h-full min-h-[500px] bg-[#050505] rounded-[3rem] border border-white/10 flex flex-col relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
            
            <div className="h-14 bg-white/5 border-b border-white/5 flex items-center px-8 justify-between backdrop-blur-3xl relative z-10">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
              </div>
              <div className="px-4 py-1.5 bg-black/40 rounded-full text-[9px] font-black text-[var(--color-neon-purple)] uppercase tracking-[0.2em] border border-[var(--color-neon-purple)]/20 shadow-[0_0_10px_rgba(157,0,255,0.1)] flex items-center gap-2">
                 <Sparkles className="w-3 h-3 animate-pulse" /> Synthesis Preview Engine
              </div>
              <div className="w-12" />
            </div>

            <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-8 relative z-10"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 border-[8px] border-[var(--color-neon-purple)]/10 rounded-full animate-pulse" />
                      <div className="w-24 h-24 border-[8px] border-[var(--color-neon-purple)] rounded-full border-t-transparent animate-spin absolute inset-0 shadow-[0_0_30px_rgba(157,0,255,0.3)]" />
                      <Sparkles className="w-8 h-8 text-[var(--color-neon-purple)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-xs font-black text-white uppercase tracking-[0.5em] animate-pulse">
                        Sintetizando...
                      </p>
                      <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Aguarde a resposta da rede neural</p>
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full h-full flex flex-col relative z-10"
                  >
                    {activeTab === "image" && (
                      <div className="w-full h-full relative group rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
                        <img src={result} alt="Generated" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm gap-4">
                          <button className="p-4 bg-white text-black rounded-2xl shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 font-black text-xs uppercase tracking-tighter">
                            <Download className="w-5 h-5" /> Download
                          </button>
                        </div>
                      </div>
                    )}
                    {activeTab === "copy" && (
                      <div className="w-full h-full text-left p-10 bg-white/[0.01] rounded-[2rem] border border-white/5 overflow-y-auto font-mono text-sm leading-relaxed text-zinc-300 relative shadow-inner">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-neon-purple)]/5 blur-[50px] rounded-full" />
                        <pre className="whitespace-pre-wrap font-medium">{result}</pre>
                        <div className="mt-10 flex gap-4">
                           <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                              <CopyIcon className="w-3.5 h-3.5" /> Copiar Texto
                           </button>
                           <button className="px-6 py-3 bg-[var(--color-neon-purple)]/20 hover:bg-[var(--color-neon-purple)]/30 border border-[var(--color-neon-purple)]/40 text-[var(--color-neon-purple)] rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                              <Send className="w-3.5 h-3.5" /> Usar em Campanha
                           </button>
                        </div>
                      </div>
                    )}
                    {activeTab === "video" && (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900/50 rounded-[2.5rem] relative border border-white/5 overflow-hidden group">
                        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-28 h-28 bg-[var(--color-neon-purple)]/10 rounded-full flex items-center justify-center border border-[var(--color-neon-purple)]/30 text-[var(--color-neon-purple)] cursor-pointer shadow-[0_0_50px_rgba(157,0,255,0.2)]"
                        >
                          <Play className="w-10 h-10 fill-current" />
                        </motion.div>
                        <div className="absolute bottom-8 text-center space-y-1">
                          <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">RENDER_V8_PITCH.MP4</p>
                          <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Pronto para exportação 4K</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-8 max-w-sm relative z-10"
                  >
                    <div className="w-24 h-24 bg-white/[0.02] rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/10 shadow-inner group hover:border-[var(--color-neon-purple)]/30 transition-colors">
                      <Sparkles className="w-10 h-10 text-zinc-800 group-hover:text-[var(--color-neon-purple)] transition-colors" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter">Synthesis Engine Idle</h3>
                      <p className="text-xs text-zinc-500 font-medium uppercase leading-relaxed tracking-widest opacity-60">
                        O laboratório criativo aguarda os seus parâmetros para sintetizar ativos de prospecção de alta conversão.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
