import { useState } from "react";
import { 
  ImageIcon, FileText, Video, Sparkles, Loader2, Download, Copy, Wand2, 
  Cpu, History, Play, Send, Facebook, Instagram, Linkedin, Trash2, CheckCircle2 
} from "lucide-react";
import { cn } from "@/utils/cn";
import { GlassmorphismCard } from "@/components/common/GlassmorphismCard";

type Tab = "image" | "copy" | "video";
type SocialPlatform = "facebook" | "instagram" | "linkedin";

interface HistoryItem {
  id: string;
  type: Tab;
  prompt: string;
  result: string;
  platform?: SocialPlatform;
  timestamp: Date;
}

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "image", label: "Imagem Sniper", icon: ImageIcon, color: "text-blue-400" },
  { id: "copy", label: "Copy Elite", icon: FileText, color: "text-purple-400" },
  { id: "video", label: "Vídeo Pitch", icon: Video, color: "text-rose-400" },
];

const SOCIALS: { id: SocialPlatform; icon: any; color: string; label: string }[] = [
  { id: "instagram", icon: Instagram, color: "hover:text-pink-500", label: "Instagram" },
  { id: "facebook", icon: Facebook, color: "hover:text-blue-500", label: "Facebook" },
  { id: "linkedin", icon: Linkedin, color: "hover:text-blue-600", label: "LinkedIn" },
];

export function CreativeLab() {
  const [activeTab, setActiveTab] = useState<Tab>("image");
  const [prompt, setPrompt] = useState("");
  const [refinement, setRefinement] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [publishingTo, setPublishingTo] = useState<SocialPlatform | null>(null);

  const handleGenerate = (isRefinement = false) => {
    const finalPrompt = isRefinement ? `${prompt} | REFINAMENTO: ${refinement}` : prompt;
    if (!finalPrompt.trim()) return;
    
    setIsGenerating(true);
    // Em produção, isso chama a API que usa o Nero (SDR Hunter)
    setTimeout(() => {
      const mockResult = activeTab === "copy" 
        ? "✨ [VERSÃO ELITE PT-PT]\n\nAssunto: Otimização Estratégica com IA\n\nOlá,\n\nIdentificamos que a CMTecnologia pode escalar sua retenção em 35% com o nosso novo motor de síntese. Gostaria de agendar uma demonstração técnica de 10 minutos?\n\nMelhores cumprimentos,\nEquipe de Operações."
        : "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop";
      
      setResult(mockResult);
      setIsGenerating(false);
      setRefinement("");

      if (!isRefinement) {
        const newItem: HistoryItem = {
          id: Math.random().toString(36).substr(2, 9),
          type: activeTab,
          prompt: prompt,
          result: mockResult,
          timestamp: new Date()
        };
        setHistory([newItem, ...history]);
      }
    }, 2000);
  };

  const handlePublish = (platform: SocialPlatform) => {
    setPublishingTo(platform);
    setTimeout(() => {
      setPublishingTo(null);
      alert(`Publicado com sucesso no ${platform.toUpperCase()} via CMTecnologia Post-Engine.`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 md:gap-10 pb-24 px-2 md:px-0 bg-[#0A0A0A]">
      {/* Header Elite */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--color-neon-purple)] font-black text-[10px] uppercase tracking-[0.3em]">
            <Wand2 className="w-3 h-3" />
            Neural Content Synthesis V8.2
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)]">Lab</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium">Sintetize e publique ativos de alta conversão em Português.</p>
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
                  "flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                  isActive ? "bg-[var(--color-neon-purple)] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "text-zinc-500 hover:text-zinc-300"
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
        {/* LADO ESQUERDO: INPUT E HISTÓRICO */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <GlassmorphismCard className="p-8 border border-white/5 bg-white/[0.01] flex flex-col gap-6 relative overflow-hidden">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 italic">
                <Cpu className="w-3 h-3 text-[var(--color-neon-purple)]" /> Engenharia de Prompt Sniper
              </h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Descreva o ativo (Ex: E-mail curto para CEOs em PT-PT)..."
                className="w-full h-44 bg-black/40 border border-white/10 rounded-2xl p-6 text-sm text-white focus:border-[var(--color-neon-purple)] outline-none resize-none transition-all placeholder:text-zinc-700"
              />
            </div>

            <button
              onClick={() => handleGenerate(false)}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-5 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl shadow-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sintetizando...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar com IA Soberana</span>
                </div>
              )}
            </button>
          </GlassmorphismCard>

          {/* Histórico Real Detalhado */}
          <GlassmorphismCard className="p-6 border border-white/5 bg-white/[0.01] flex-1 flex flex-col min-h-[300px]">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 italic">
                 <History className="w-3 h-3 text-[var(--color-neon-blue)]" /> Log de Sínteses
               </h3>
               {history.length > 0 && (
                 <button onClick={() => setHistory([])} className="text-[8px] text-zinc-700 hover:text-red-500 uppercase font-black transition-colors">
                   <Trash2 className="w-3 h-3" />
                 </button>
               )}
             </div>
             <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/5">
                {history.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-800 gap-3 opacity-30">
                    <History className="w-8 h-8" />
                    <p className="text-[10px] uppercase font-black tracking-widest">Nenhum registro</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-[var(--color-neon-purple)]/30 transition-all">
                       <div className="flex justify-between items-start mb-2">
                         <span className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">{new Date(item.timestamp).toLocaleTimeString()} • {item.type}</span>
                         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-zinc-500 hover:text-white"><Copy className="w-3 h-3" /></button>
                         </div>
                       </div>
                       <p className="text-[10px] text-zinc-400 font-bold truncate italic italic">"{item.prompt}"</p>
                    </div>
                  ))
                )}
             </div>
          </GlassmorphismCard>
        </div>

        {/* LADO DIREITO: PREVIEW, REDES E REFINAMENTO */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="h-full min-h-[500px] bg-black rounded-[2.5rem] border border-white/10 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Window Top Bar */}
            <div className="h-14 bg-white/[0.03] border-b border-white/5 flex items-center px-8 justify-between backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
              </div>
              <div className="text-[10px] font-black text-[var(--color-neon-purple)] uppercase tracking-[0.3em] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Live Rendering Engine
              </div>
              
              {/* Social Selectors */}
              <div className="flex gap-4">
                {result && SOCIALS.map((social) => (
                  <button 
                    key={social.id}
                    onClick={() => handlePublish(social.id)}
                    title={`Publicar no ${social.label}`}
                    className={cn("text-zinc-600 transition-all", social.color, publishingTo === social.id ? "animate-bounce text-white" : "")}
                  >
                    <social.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 p-10 flex flex-col items-center justify-center relative">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 border-[6px] border-purple-500/10 rounded-full" />
                    <div className="w-20 h-20 border-[6px] border-[var(--color-neon-purple)] rounded-full border-t-transparent animate-spin absolute inset-0 shadow-[0_0_20px_rgba(168,85,247,0.3)]" />
                  </div>
                  <p className="text-[11px] font-black text-white uppercase tracking-[0.4em] animate-pulse">Sintetizando Ativo...</p>
                </div>
              ) : result ? (
                <div className="w-full h-full flex flex-col gap-6">
                  <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden relative group">
                    {activeTab === "image" ? (
                      <>
                        <img src={result} className="w-full h-full object-cover" alt="Sintetizado" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                           <button className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-2xl">
                             <Download className="w-6 h-6" />
                           </button>
                        </div>
                      </>
                    ) : activeTab === "copy" ? (
                      <div className="p-8 font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed h-full overflow-y-auto bg-[#0F0F0F] relative">
                         <div className="absolute top-6 right-6 p-2 bg-white/5 rounded-lg border border-white/10 text-zinc-500 hover:text-white cursor-pointer transition-colors">
                           <Copy className="w-4 h-4" />
                         </div>
                         {result}
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-zinc-950/50">
                         <div className="w-20 h-20 bg-[var(--color-neon-purple)]/10 rounded-full flex items-center justify-center border border-[var(--color-neon-purple)]/30 text-[var(--color-neon-purple)] shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                           <Play className="w-8 h-8 fill-current" />
                         </div>
                         <span className="text-[10px] font-black text-white uppercase tracking-widest">Preview Pitch V8 Ready</span>
                      </div>
                    )}
                  </div>

                  {/* Refinement Area */}
                  <div className="bg-white/[0.03] border border-white/5 rounded-[1.5rem] p-4 flex gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="p-2.5 bg-zinc-900 rounded-xl text-[var(--color-neon-blue)]">
                       <Send className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      value={refinement}
                      onChange={(e) => setRefinement(e.target.value)}
                      placeholder="Algo a mudar? (Ex: Trocar logo para CMTecnologia ou tom mais sério...)"
                      className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-zinc-600"
                    />
                    <button 
                      onClick={() => handleGenerate(true)}
                      disabled={!refinement.trim() || isGenerating}
                      className="px-4 py-2 bg-[var(--color-neon-blue)] text-black font-black text-[9px] uppercase tracking-widest rounded-lg hover:brightness-110 transition-all disabled:opacity-20"
                    >
                      Refinar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
                    <Sparkles className="w-10 h-10 text-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] text-zinc-500 font-black uppercase tracking-[0.5em]">Aguardando Ordem</p>
                    <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest max-w-[200px]">Os motores de síntese estão em standby.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
