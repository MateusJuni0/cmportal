import { useState, useRef, useEffect } from "react";
import { UploadCloud, Save, Globe, Type, Image as ImageIcon, LayoutTemplate, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export function VisualSiteEditor() {
  const [activeTab, setActiveTab] = useState<"text" | "images">("text");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bypass tRPC para evitar travamentos
  const isFetching = false;
  const remoteContent: any[] = [];
  const publishMutation = trpc.cms.create.useMutation({
    onSuccess: () => {
      // @ts-ignore
      toast.success("Site atualizado com sucesso!");
    }
  });

  const [siteContent, setSiteContent] = useState({
    heroTitle: "Sovereign Sales Engine",
    heroSubtitle: "A próxima geração de automação de vendas impulsionada por IA.",
    ctaText: "Comece Agora",
  });

  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  ]);

  const handlePublish = async () => {
    toast.info("Publicando alterações...");
    setTimeout(() => toast.success("Publicado com sucesso (Simulado)"), 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImages([url, ...images]);
      toast.success("Imagem carregada!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 md:gap-10 pb-20 px-2 md:px-0">
      {/* Header com Mobile Awareness */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--color-neon-blue)]/20 to-[var(--color-neon-purple)]/20 border border-white/10 shadow-[0_0_20px_rgba(0,243,255,0.15)]">
              <LayoutTemplate className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-neon-blue)]" />
            </div>
            Visual Editor
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-medium max-w-md leading-relaxed">
            Personalize a sua presença digital com precisão cirúrgica e <span className="text-[var(--color-neon-blue)]">feedback instantâneo</span>.
          </p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePublish}
            className="flex-1 md:flex-none px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs md:text-sm font-bold text-zinc-300 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Save className="w-4 h-4" /> Rascunho
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(0, 243, 255, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePublish}
            className="flex-1 md:flex-none px-6 py-3 bg-[var(--color-neon-blue)] hover:bg-cyan-400 text-black rounded-2xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.2)]"
          >
            <Globe className="w-4 h-4" /> Publicar
          </motion.button>
        </div>
      </motion.div>

      {/* Tabs Estilizadas */}
      <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl w-full md:w-fit backdrop-blur-xl">
        <button
          onClick={() => setActiveTab("text")}
          className={cn(
            "flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2",
            activeTab === "text" ? "bg-[var(--color-neon-blue)] text-black shadow-lg" : "text-zinc-500 hover:text-zinc-200"
          )}
        >
          <Type className="w-4 h-4" /> Textos
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={cn(
            "flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2",
            activeTab === "images" ? "bg-[var(--color-neon-blue)] text-black shadow-lg" : "text-zinc-500 hover:text-zinc-200"
          )}
        >
          <ImageIcon className="w-4 h-4" /> Imagens
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 flex-1">
        {/* Editor Area (8 Colunas no Desktop) */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "text" ? (
              <motion.div 
                key="text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6 bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-md"
              >
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Título de Impacto</label>
                  <textarea
                    value={siteContent.heroTitle}
                    onChange={(e) => setSiteContent({ ...siteContent, heroTitle: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm md:text-base text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)]/50 transition-all min-h-[100px] shadow-inner"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Descrição Auxiliar</label>
                  <textarea
                    value={siteContent.heroSubtitle}
                    onChange={(e) => setSiteContent({ ...siteContent, heroSubtitle: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-zinc-400 focus:outline-none focus:border-[var(--color-neon-blue)] transition-all min-h-[120px] shadow-inner leading-relaxed"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Texto do CTA</label>
                  <input
                    type="text"
                    value={siteContent.ctaText}
                    onChange={(e) => setSiteContent({ ...siteContent, ctaText: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-[var(--color-neon-blue)] focus:outline-none focus:border-[var(--color-neon-blue)] transition-all shadow-inner"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="images"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div
                  className="group relative border-2 border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[var(--color-neon-blue)]/50 hover:bg-[var(--color-neon-blue)]/[0.02] transition-all overflow-hidden"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-[var(--color-neon-blue)]" />
                  </div>
                  <div className="text-center relative z-10">
                    <p className="font-bold text-white text-sm">Upload de Mídia</p>
                    <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest font-black">PNG, JPG, WEBP • Max 5MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {images.map((img, idx) => (
                    <motion.div 
                      layout
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={idx} 
                      className="relative aspect-video rounded-2xl overflow-hidden group border border-white/10 shadow-2xl"
                    >
                      <img src={img} alt="Uploaded" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setImages(images.filter((_, i) => i !== idx)); }}
                          className="text-[10px] font-black uppercase tracking-tighter text-white px-4 py-2 bg-rose-500/80 rounded-full hover:bg-rose-600 transition-colors shadow-lg"
                        >
                          Eliminar
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Preview Area (7 Colunas no Desktop) */}
        <div className="lg:col-span-7 h-full min-h-[400px]">
          <div className="h-full bg-[#050505] rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-blue)]/5 via-transparent to-[var(--color-neon-purple)]/5 pointer-events-none" />
            
            {/* Browser Header Simulado */}
            <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2 justify-between backdrop-blur-xl">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <div className="px-4 py-1 bg-black/40 rounded-full text-[9px] text-zinc-500 font-black uppercase tracking-widest border border-white/5 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[var(--color-neon-blue)]" />
                cmtecnologia.pt • LIVE PREVIEW
              </div>
              <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Preview Content */}
            <div className="flex-1 p-8 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden bg-grid-white/[0.02]">
              {/* Glows de fundo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--color-neon-blue)]/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
              
              <motion.div
                initial={false}
                animate={{ scale: [0.98, 1] }}
                className="relative z-10 space-y-6 md:space-y-10"
              >
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] drop-shadow-2xl">
                  {siteContent.heroTitle}
                </h1>
                <p className="text-sm md:text-xl text-zinc-400 max-w-lg mx-auto leading-relaxed font-medium">
                  {siteContent.heroSubtitle}
                </p>
                <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-6">
                  <button className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black text-sm md:text-base hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                    {siteContent.ctaText}
                  </button>
                  <button className="text-xs md:text-sm font-bold text-zinc-500 hover:text-white transition-colors underline underline-offset-8 decoration-zinc-800 hover:decoration-[var(--color-neon-blue)]">
                    Saber mais sobre a CMTec
                  </button>
                </div>
              </motion.div>
              
              {activeTab === "images" && images[0] && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-16 w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/10 relative z-10 group"
                >
                   <img src={images[0]} alt="Preview Cover" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
