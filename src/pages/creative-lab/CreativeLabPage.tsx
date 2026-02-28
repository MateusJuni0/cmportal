import { motion, AnimatePresence } from "framer-motion";
import { 
  ImageIcon, FileText, Video, Sparkles, Loader2, Download, Copy, Wand2, 
  Cpu, History, Play, Send, Facebook, Instagram, Linkedin, Trash2, Globe, Monitor, Upload, Settings2, CheckCircle2
} from "lucide-react";
import { cn } from "@/utils/cn";
import { GlassmorphismCard } from "@/components/common/GlassmorphismCard";
import { useAppStore } from "@/store";
import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";

type Tab = "website" | "image" | "copy";
type SocialPlatform = "facebook" | "instagram" | "linkedin";

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "website", label: "Editor Live Web", icon: Globe, color: "text-emerald-400" },
  { id: "image", label: "Imagem Sniper", icon: ImageIcon, color: "text-blue-400" },
  { id: "copy", label: "Copy Elite", icon: FileText, color: "text-purple-400" },
];

export function CreativeLab() {
  const { creativeLab, setCreativeTab, setCreativePrompt, setCreativeResult, setIsGenerating, addHistoryItem, clearCreativeHistory, addLog } = useAppStore();
  const { activeTab, prompt, isGenerating, result, history } = creativeLab;
  
  const [siteUrl, setSiteUrl] = useState("https://cmtecnologia.pt");
  const [refinement, setRefinement] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateMutation = trpc.creative.generate.useMutation({
    onSuccess: (data) => {
      setCreativeResult(data.result || '');
      setIsGenerating(false);
      setRefinement("");
      addHistoryItem(data);
      addLog(`Alteração aplicada com sucesso ao ${activeTab}.`, 'success');
    },
    onError: (err) => {
      setIsGenerating(false);
      addLog(`Erro na edição: ${err.message}`, 'error');
    }
  });

  const handleApplyChanges = () => {
    if (!refinement.trim()) return;
    setIsGenerating(true);
    addLog(`Dante orquestrando alteração via PixelPerfect & Vulkan...`, 'info');
    
    generateMutation.mutate({
      type: activeTab,
      prompt: `[SITE: ${siteUrl}] COMANDO: ${refinement}`
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      addLog(`Ativo recebido: ${file.name}. Analisando para integração...`, 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 md:gap-10 pb-24 px-2 md:px-0 bg-[#0A0A0A]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--color-neon-emerald)] font-black text-[10px] uppercase tracking-[0.3em]">
            <Settings2 className="w-3 h-3" />
            Autonomous Web Refinement Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
            Creative <span className="text-[var(--color-neon-emerald)]">Lab</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium ml-1">Edite seu site, imagens e textos em tempo real com IA.</p>
        </div>
        
        <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl w-full md:w-fit backdrop-blur-xl">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCreativeTab(tab.id)}
              className={cn(
                "flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                activeTab === tab.id ? "bg-white text-black shadow-white/20 shadow-lg" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <tab.icon className={cn("w-3.5 h-3.5", activeTab === tab.id ? "text-black" : tab.color)} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <GlassmorphismCard className="p-8 border border-white/5 bg-white/[0.01] flex flex-col gap-6 relative overflow-hidden">
            <div className="space-y-4">
               {activeTab === "website" && (
                 <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest italic">URL do seu Projeto</label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white flex items-center gap-3">
                        <Globe className="w-3.5 h-3.5 text-zinc-600" />
                        <input 
                          type="text" 
                          value={siteUrl} 
                          onChange={(e) => setSiteUrl(e.target.value)}
                          className="bg-transparent outline-none flex-1"
                        />
                      </div>
                    </div>
                 </div>
               )}

              <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 italic">
                <Cpu className="w-3 h-3 text-[var(--color-neon-purple)]" /> Comandos de Edição
              </h2>
              <textarea
                value={refinement}
                onChange={(e) => setRefinement(e.target.value)}
                placeholder={activeTab === "website" ? "Ex: Mude o fundo para azul neon e centralize o título..." : "Descreva as alterações..."}
                className="w-full h-44 bg-black/40 border border-white/10 rounded-2xl p-6 text-sm text-white focus:border-[var(--color-neon-blue)] outline-none resize-none transition-all placeholder:text-zinc-700 leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-3">
               <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
               <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-[9px] font-black uppercase text-zinc-500 hover:border-[var(--color-neon-blue)] hover:text-white transition-all flex items-center justify-center gap-2"
               >
                 <Upload className="w-3.5 h-3.5" /> Carregar Ativo (Imagem/Logo)
               </button>

               <button
                onClick={handleApplyChanges}
                disabled={!refinement.trim() || isGenerating}
                className="w-full py-5 bg-[var(--color-neon-blue)] text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isGenerating ? "Processando Ordem..." : "Aplicar na Live"}
              </button>
            </div>
          </GlassmorphismCard>

          <GlassmorphismCard className="p-6 border border-white/5 bg-white/[0.01] flex-1">
             <h3 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-2">
               <History className="w-3 h-3 text-[var(--color-neon-emerald)]" /> Live Synthesis Feed
             </h3>
             <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2 scrollbar-thin scrollbar-thumb-white/5">
                {history.map((item) => (
                  <div key={item.id} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                     <div className="flex justify-between items-center mb-1">
                       <span className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">{new Date(item.createdAt).toLocaleTimeString()}</span>
                       <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                     </div>
                     <p className="text-[9px] text-zinc-400 font-bold truncate">"{item.prompt}"</p>
                  </div>
                ))}
             </div>
          </GlassmorphismCard>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="h-full min-h-[600px] bg-zinc-950 rounded-[2.5rem] border border-white/10 flex flex-col relative overflow-hidden shadow-2xl group">
            <div className="h-12 bg-white/[0.03] border-b border-white/5 flex items-center px-8 justify-between backdrop-blur-md relative z-10">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-white/5 text-[9px] font-bold text-zinc-500">
                    <Monitor className="w-3 h-3" /> LIVE VIEW
                 </div>
                 <div className="text-[9px] font-black text-[var(--color-neon-emerald)] uppercase tracking-[0.3em]">
                   {isGenerating ? "RE-RENDERING..." : "STABLE"}
                 </div>
              </div>
              <div className="flex gap-3">
                 <button className="p-2 bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors"><Download className="w-3.5 h-3.5" /></button>
                 <button className="p-2 bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors"><Copy className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="flex-1 relative">
              <AnimatePresence>
                {isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-6"
                  >
                    <div className="w-24 h-24 border-t-2 border-[var(--color-neon-emerald)] rounded-full animate-spin" />
                    <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">PixelPerfect Refactoring Website...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeTab === "website" ? (
                <iframe 
                  src={siteUrl} 
                  className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity" 
                  title="Live Preview"
                />
              ) : result ? (
                <div className="w-full h-full p-10 flex items-center justify-center">
                   {activeTab === "image" ? (
                     <img src={result} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" />
                   ) : (
                     <div className="p-10 bg-zinc-900/50 rounded-3xl border border-white/5 font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed w-full max-w-2xl h-full overflow-y-auto">
                        {result}
                     </div>
                   )}
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6 opacity-20">
                   <Sparkles className="w-16 h-16 text-zinc-500" />
                   <p className="text-xs font-black uppercase tracking-[0.5em]">Aguardando Ordem Técnica</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
