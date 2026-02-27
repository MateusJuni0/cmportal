import { useState } from "react";
import { Plus, Layout, Save, Eye, MousePointer2, Type, Image as ImageIcon, Send } from "lucide-react";
import { cn } from "@/utils/cn";
import { toast } from "sonner";

export function LandingPageBuilder() {
  const [activeSection, setActiveSection] = useState("geral");

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white flex items-center gap-3">
            <Layout className="w-8 h-8 text-[#22d3ee]" />
            Construtor de Páginas de Elite
          </h1>
          <p className="text-zinc-400">Crie páginas de alta conversão para os seus clientes sem tocar em código.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all border border-white/10">
            <Eye className="w-4 h-4" /> Visualizar
          </button>
          <button 
            onClick={() => toast.success("Página guardada com sucesso!")}
            className="flex items-center gap-2 px-6 py-2 bg-[#22d3ee] hover:bg-[#0891b2] text-black rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          >
            <Send className="w-4 h-4" /> Publicar Site
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Menu de Ferramentas */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="glass-card p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2">Estrutura do Site</span>
            {[
              { id: "geral", label: "Título e Subtítulo", icon: Type },
              { id: "visual", label: "Imagens e Estilo", icon: ImageIcon },
              { id: "botao", label: "Botão de Compra", icon: MousePointer2 },
              { id: "leads", label: "Captura de Leads", icon: Plus },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border",
                  activeSection === item.id 
                    ? "bg-[#22d3ee]/10 border-[#22d3ee]/30 text-[#22d3ee]" 
                    : "bg-transparent border-transparent text-zinc-400 hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editor Central */}
        <div className="lg:col-span-9 glass-card p-8 flex flex-col gap-8 overflow-y-auto">
          {activeSection === "geral" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-zinc-500 uppercase">Título de Impacto</label>
                 <input className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#22d3ee] outline-none" placeholder="Ex: Transforme o seu negócio com IA" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-zinc-500 uppercase">Descrição Detalhada</label>
                 <textarea className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#22d3ee] outline-none h-32" placeholder="Explique como o seu produto ajuda o cliente..." />
               </div>
            </div>
          )}

          {activeSection === " visual" && (
             <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-12 text-zinc-500">
               <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
               <p>Arraste a imagem do produto para aqui</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
