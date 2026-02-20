import { useState } from "react";
import { PanelsTopLeft, Plus, Move, AlignLeft, Image as ImageIcon, MousePointerClick } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ComponentType = "hero" | "features" | "cta";

interface PageComponent {
  id: string;
  type: ComponentType;
  title: string;
}

export function LandingPageBuilder() {
  const [components, setComponents] = useState<PageComponent[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const libraryItems = [
    { type: "hero", label: "Hero Section", icon: AlignLeft },
    { type: "features", label: "Feature Grid", icon: ImageIcon },
    { type: "cta", label: "Call to Action", icon: MousePointerClick },
  ];

  const addComponent = (type: string, label: string) => {
    setComponents([
      ...components,
      { id: Math.random().toString(36).substring(7), type: type as ComponentType, title: label },
    ]);
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter((c) => c.id !== id));
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      alert("Landing Page Publicada!");
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <PanelsTopLeft className="w-8 h-8 text-brand-500" />
            Landing Page Builder
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Arraste e solte blocos para criar novas páginas de vendas de alta conversão.
          </p>
        </div>
        <button
          onClick={handlePublish}
          disabled={components.length === 0 || isPublishing}
          className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-brand-500/20 flex items-center gap-2 disabled:opacity-50 disabled:shadow-none"
        >
          {isPublishing ? "Gerando URL..." : "Gerar Landing Page"}
        </button>
      </div>

      <div className="flex flex-1 min-h-0 gap-6">
        {/* Sidebar Library */}
        <div className="w-72 glass-card p-6 flex flex-col gap-6 overflow-y-auto shrink-0 border-r border-black/5 dark:border-white/10">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-4">Componentes</h2>
            <div className="flex flex-col gap-3">
              {libraryItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => addComponent(item.type, item.label)}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 flex items-center gap-3 cursor-pointer hover:border-brand-500 dark:hover:border-[var(--color-neon-blue)] hover:shadow-md transition-all group"
                  >
                    <div className="p-2 bg-white dark:bg-black rounded-lg group-hover:text-brand-500 dark:group-hover:text-[var(--color-neon-blue)] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">{item.label}</span>
                    <Plus className="w-4 h-4 ml-auto text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 glass-card bg-slate-100/50 dark:bg-black/50 border border-dashed border-slate-300 dark:border-white/20 p-8 overflow-y-auto flex flex-col relative rounded-2xl">
          {components.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-zinc-600">
              <Move className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-medium">Sua página está vazia</p>
              <p className="text-sm mt-1">Clique nos blocos ao lado para adicionar aqui.</p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto w-full pb-20">
              <AnimatePresence>
                {components.map((comp) => (
                  <motion.div
                    key={comp.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative group bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:border-brand-500 dark:hover:border-brand-500 transition-colors"
                  >
                    <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => removeComponent(comp.id)}
                        className="p-1.5 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-md text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-900/50"
                      >
                        Remover
                      </button>
                    </div>

                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-xl">
                      <p className="text-lg font-bold text-slate-300 dark:text-zinc-700">[{comp.title} Placeholder]</p>
                      <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2">Clique para configurar conteúdo</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
