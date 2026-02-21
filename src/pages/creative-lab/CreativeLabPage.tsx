import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, FileText, Video, Sparkles, Loader2, Download, Copy as CopyIcon, Wand2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAppStore } from "@/store";

type Tab = "image" | "copy" | "video";

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "image", label: "Imagem de Prospecção", icon: ImageIcon },
  { id: "copy", label: "Copy de E-mail", icon: FileText },
  { id: "video", label: "Vídeo Pitch", icon: Video },
];

export function CreativeLab() {
  const { creativeLab, setCreativeTab, setCreativePrompt, generateCreativeAsset, clearCreativeHistory } = useAppStore();
  const { activeTab, prompt, isGenerating, result, history } = creativeLab;

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
              <Wand2 className="w-6 h-6 text-purple-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
              Creative <span className="text-purple-500">Lab</span>
            </h1>
          </div>
          <p className="text-zinc-500 font-medium ml-12">Geração de ativos de prospecção hiper-personalizados.</p>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-[#1A1A1A] rounded-2xl w-fit border border-white/5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setCreativeTab(tab.id)}
              className={cn(
                "relative px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 outline-none",
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="creative-lab-tabs"
                  className="absolute inset-0 bg-zinc-800 rounded-xl z-0 border border-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Input Form Section */}
        <div className="flex flex-col gap-8">
          <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] shadow-2xl flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full" />
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight italic mb-2">Engenharia de Prompt</h2>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Defina o ativo que deseja sintetizar</p>
            </div>

            <div className="flex-1 flex flex-col gap-4 relative z-10">
              <textarea
                value={prompt}
                onChange={(e) => setCreativePrompt(e.target.value)}
                placeholder={
                  activeTab === "image"
                    ? "Ex: Uma imagem profissional de um dashboard de vendas com gráficos neon..."
                    : activeTab === "copy"
                    ? "Ex: Um email de prospecção curto, tom persuasivo..."
                    : "Ex: Um script de vídeo de 30 segundos oferecendo nossa solução..."
                }
                className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-6 text-sm text-white focus:border-purple-500 outline-none transition-all resize-none placeholder:text-zinc-700 shadow-inner leading-relaxed"
              />
            </div>

            <button
              onClick={generateCreativeAsset}
              disabled={!prompt.trim() || isGenerating}
              className="w-full py-5 bg-purple-600 hover:bg-purple-500 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-purple-500/10 flex items-center justify-center gap-3 transition-all active:scale-[0.98] relative z-10 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sintetizando Ativo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Gerar Ativo com IA</span>
                </>
              )}
            </button>
          </div>

          {/* History Section */}
          <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[2rem] shadow-2xl flex-1 flex flex-col gap-4 relative overflow-hidden min-h-[300px]">
             <div className="flex justify-between items-center relative z-10">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest italic">Histórico de Síntese</h3>
                <button 
                  onClick={clearCreativeHistory}
                  className="text-[9px] text-zinc-600 hover:text-zinc-400 uppercase font-black tracking-tighter transition-colors"
                >
                  Limpar Tudo
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto space-y-3 pr-2 relative z-10">
                {history.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-800 gap-2">
                    <FileText className="w-8 h-8 opacity-20" />
                    <p className="text-[10px] uppercase font-bold tracking-widest">Nenhum registro</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div 
                      key={item.id}
                      className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between group hover:border-purple-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-zinc-900 rounded-lg text-purple-400">
                          {item.type === 'image' ? <ImageIcon className="w-3.5 h-3.5" /> : 
                           item.type === 'video' ? <Video className="w-3.5 h-3.5" /> : 
                           <FileText className="w-3.5 h-3.5" />}
                        </div>
                        <div className="truncate">
                          <p className="text-[10px] font-bold text-zinc-300 truncate italic">"{item.prompt}"</p>
                          <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">
                            {new Date(item.createdAt).toLocaleTimeString()} • {item.type}
                          </p>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 hover:text-white transition-all">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] shadow-2xl flex flex-col relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full" />
          <h2 className="text-xl font-bold text-white uppercase tracking-tight italic mb-8 relative z-10">Live Preview</h2>
          
          <div className="flex-1 bg-black rounded-3xl border border-white/5 flex items-center justify-center p-6 relative overflow-hidden shadow-2xl z-10">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-[6px] border-purple-500/20 rounded-full animate-pulse" />
                    <div className="w-20 h-20 border-[6px] border-purple-500 rounded-full border-t-transparent animate-spin absolute inset-0 shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
                  </div>
                  <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] animate-pulse">
                    Generating...
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
                    <div className="w-full h-full relative group rounded-2xl overflow-hidden">
                      <img src={result} alt="Generated" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button className="p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform">
                          <Download className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  )}
                  {activeTab === "copy" && (
                    <div className="w-full h-full text-left p-8 bg-[#121212] rounded-2xl border border-white/5 overflow-y-auto font-mono text-xs leading-relaxed text-zinc-300 relative">
                      {result}
                      <button className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors">
                        <CopyIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {activeTab === "video" && (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-2xl relative border border-white/5">
                      <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 text-purple-500 cursor-pointer hover:scale-110 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <Video className="w-8 h-8" />
                      </div>
                      <p className="absolute bottom-6 text-[9px] font-black text-purple-500/60 uppercase tracking-widest font-mono">render_preview_v8.mp4</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-6 max-w-xs"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto border border-white/10">
                    <Sparkles className="w-8 h-8 text-zinc-700" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Sistemas em Espera</h3>
                    <p className="text-[10px] text-zinc-600 font-medium uppercase leading-relaxed tracking-wider">
                      Defina os parâmetros do ativo ao lado para iniciar a síntese.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
