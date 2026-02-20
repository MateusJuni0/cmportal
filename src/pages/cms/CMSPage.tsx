import { useState, useRef } from "react";
import { UploadCloud, Save, Globe, Type, Image as ImageIcon, LayoutTemplate } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export function VisualSiteEditor() {
  const [activeTab, setActiveTab] = useState<"text" | "images">("text");
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [siteContent, setSiteContent] = useState({
    heroTitle: "Sovereign Sales Engine",
    heroSubtitle: "A próxima geração de automação de vendas impulsada por IA.",
    ctaText: "Comece Agora",
  });

  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  ]);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImages([url, ...images]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <LayoutTemplate className="w-8 h-8 text-brand-500" />
            Visual Site Editor
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Gerencie o conteúdo do site principal cmtecnologia.pt sem abrir o VS Code.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Salvar Rascunho
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_var(--color-neon-blue)] flex items-center gap-2 disabled:opacity-50"
          >
            <Globe className="w-4 h-4" />
            {isPublishing ? "Publicando..." : "Publicar Alterações"}
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("text")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border",
            activeTab === "text" ? "bg-white dark:bg-zinc-800 border-black/10 dark:border-white/10 text-slate-900 dark:text-white shadow-sm" : "border-transparent text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          )}
        >
          <Type className="w-4 h-4" /> Editar Textos
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border",
            activeTab === "images" ? "bg-white dark:bg-zinc-800 border-black/10 dark:border-white/10 text-slate-900 dark:text-white shadow-sm" : "border-transparent text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          )}
        >
          <ImageIcon className="w-4 h-4" /> Gerenciar Imagens
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Editor Area */}
        <div className="glass-card p-6 flex flex-col gap-6 overflow-y-auto">
          {activeTab === "text" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Título Principal (Hero)</label>
                <textarea
                  value={siteContent.heroTitle}
                  onChange={(e) => setSiteContent({ ...siteContent, heroTitle: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Subtítulo (Hero)</label>
                <textarea
                  value={siteContent.heroSubtitle}
                  onChange={(e) => setSiteContent({ ...siteContent, heroSubtitle: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Texto do Botão (CTA)</label>
                <input
                  type="text"
                  value={siteContent.ctaText}
                  onChange={(e) => setSiteContent({ ...siteContent, ctaText: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div
                className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                <UploadCloud className="w-10 h-10 text-slate-400" />
                <div className="text-center">
                  <p className="font-medium text-slate-700 dark:text-zinc-300">Arraste imagens ou clique para fazer upload</p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group border border-black/10 dark:border-white/10">
                    <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button className="text-xs font-medium text-white px-3 py-1.5 bg-red-500/80 rounded-lg hover:bg-red-500">
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Live Preview Area */}
        <div className="glass-card rounded-2xl overflow-hidden flex flex-col border border-black/10 dark:border-white/10 relative">
          <div className="h-8 bg-slate-200 dark:bg-zinc-900 border-b border-black/10 dark:border-white/10 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-4 px-2 py-0.5 bg-white dark:bg-zinc-800 rounded text-[10px] text-slate-500 font-mono">
              cmtecnologia.pt (Preview)
            </div>
          </div>
          <div className="flex-1 bg-white dark:bg-[#0a0a0a] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Fake 3D / abstract bg for preview */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-500/20 dark:bg-[var(--color-neon-blue)]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 relative z-10">
              {siteContent.heroTitle}
            </h1>
            <p className="text-slate-600 dark:text-zinc-400 max-w-sm mb-8 relative z-10">
              {siteContent.heroSubtitle}
            </p>
            <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold relative z-10 hover:scale-105 transition-transform">
              {siteContent.ctaText}
            </button>
            
            {activeTab === "images" && images[0] && (
              <div className="mt-12 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative z-10">
                 <img src={images[0]} alt="Preview Cover" className="w-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
