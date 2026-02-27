import { useState, useRef } from "react";
import { Plus, Layout, Eye, MousePointer2, Type, Image as ImageIcon, Send, Upload, Settings, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { toast } from "sonner";

export function LandingPageBuilder() {
  const [activeSection, setActiveSection] = useState("geral");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Estado do Conteúdo da Página
  const [content, setContent] = useState({
    title: "",
    description: "",
    buttonText: "Comprar Agora",
    buttonLink: "#",
    showLeadForm: false
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(url);
      toast.success("Imagem carregada com sucesso!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white flex items-center gap-3">
            <Layout className="w-8 h-8 text-[#22d3ee]" />
            Construtor de Landing Pages
          </h1>
          <p className="text-zinc-400">Crie páginas de alta conversão para os seus clientes. 100% Visual.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all border border-white/10">
            <Eye className="w-4 h-4" /> Pré-visualizar
          </button>
          <button 
            onClick={() => toast.success("Página publicada! O link está disponível.")}
            className="flex items-center gap-2 px-6 py-2 bg-[#22d3ee] hover:bg-[#0891b2] text-black rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]"
          >
            <Send className="w-4 h-4" /> Publicar Site
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Menu Lateral de Ferramentas */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-2 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 py-2 mb-1">Editor</span>
            {[
              { id: "geral", label: "Textos Principais", icon: Type },
              { id: "visual", label: "Imagens e Design", icon: ImageIcon },
              { id: "botao", label: "Botão de Ação (CTA)", icon: MousePointer2 },
              { id: "leads", label: "Captura de Leads", icon: Plus },
              { id: "seo", label: "Configuração SEO", icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  activeSection === item.id 
                    ? "bg-[#22d3ee]/10 text-[#22d3ee] shadow-inner" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Área de Edição Central */}
        <div className="lg:col-span-5 bg-[#121212] border border-white/10 rounded-2xl p-6 overflow-y-auto custom-scrollbar">
          
          {/* Seção Geral: Textos */}
          {activeSection === "geral" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
               <div className="flex items-center gap-2 mb-4 text-[#22d3ee]">
                 <Type className="w-5 h-5" />
                 <h2 className="text-lg font-bold">Conteúdo Principal</h2>
               </div>
               <div className="space-y-3">
                 <label className="text-xs font-bold text-zinc-500 uppercase">Título de Impacto (H1)</label>
                 <input 
                    value={content.title}
                    onChange={(e) => setContent({...content, title: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#22d3ee] outline-none transition-all placeholder:text-zinc-700" 
                    placeholder="Ex: Aumente as suas vendas em 300%" 
                 />
               </div>
               <div className="space-y-3">
                 <label className="text-xs font-bold text-zinc-500 uppercase">Subtítulo Persuasivo</label>
                 <textarea 
                    value={content.description}
                    onChange={(e) => setContent({...content, description: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#22d3ee] outline-none h-32 transition-all placeholder:text-zinc-700 resize-none" 
                    placeholder="Descreva o valor do seu produto em poucas linhas..." 
                 />
               </div>
            </div>
          )}

          {/* Seção Visual: Upload de Imagens */}
          {activeSection === "visual" && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
               <div className="flex items-center gap-2 mb-4 text-[#22d3ee]">
                 <ImageIcon className="w-5 h-5" />
                 <h2 className="text-lg font-bold">Multimédia</h2>
               </div>
               
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-12 text-zinc-500 hover:border-[#22d3ee]/50 hover:bg-[#22d3ee]/5 transition-all cursor-pointer group"
               >
                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                 <Upload className="w-12 h-12 mb-4 opacity-30 group-hover:opacity-100 group-hover:text-[#22d3ee] transition-all" />
                 <p className="font-medium group-hover:text-white transition-colors">Clique para carregar imagem</p>
                 <p className="text-xs mt-2 opacity-50">PNG, JPG ou WEBP (Max 5MB)</p>
               </div>

               {previewImage && (
                 <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                   <img src={previewImage} alt="Preview" className="w-full h-48 object-cover" />
                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => setPreviewImage(null)} className="text-xs bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-1.5 rounded-lg">Remover Imagem</button>
                   </div>
                 </div>
               )}
             </div>
          )}

          {/* Seção Botão: CTA */}
          {activeSection === "botao" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
               <div className="flex items-center gap-2 mb-4 text-[#22d3ee]">
                 <MousePointer2 className="w-5 h-5" />
                 <h2 className="text-lg font-bold">Chamada para Ação (CTA)</h2>
               </div>
               <div className="space-y-3">
                 <label className="text-xs font-bold text-zinc-500 uppercase">Texto do Botão</label>
                 <input 
                    value={content.buttonText}
                    onChange={(e) => setContent({...content, buttonText: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#22d3ee] outline-none transition-all" 
                 />
               </div>
               <div className="space-y-3">
                 <label className="text-xs font-bold text-zinc-500 uppercase">Link de Destino</label>
                 <input 
                    value={content.buttonLink}
                    onChange={(e) => setContent({...content, buttonLink: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#22d3ee] outline-none transition-all" 
                    placeholder="https://..."
                 />
               </div>
            </div>
          )}

          {/* Seção Leads: Formulário */}
          {activeSection === "leads" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
               <div className="flex items-center gap-2 mb-4 text-[#22d3ee]">
                 <Plus className="w-5 h-5" />
                 <h2 className="text-lg font-bold">Captura de Leads</h2>
               </div>
               
               <div 
                 onClick={() => setContent({...content, showLeadForm: !content.showLeadForm})}
                 className={cn(
                   "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between",
                   content.showLeadForm 
                    ? "bg-[#22d3ee]/10 border-[#22d3ee] text-white" 
                    : "bg-black/20 border-white/10 text-zinc-400 hover:border-white/30"
                 )}
               >
                 <div className="flex items-center gap-3">
                   <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", content.showLeadForm ? "border-[#22d3ee]" : "border-zinc-600")}>
                     {content.showLeadForm && <div className="w-3 h-3 bg-[#22d3ee] rounded-full" />}
                   </div>
                   <span className="font-medium">Ativar Formulário de Captura</span>
                 </div>
               </div>
               
               {content.showLeadForm && (
                 <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-2">
                   <p className="text-xs text-zinc-400">Campos ativos:</p>
                   <div className="flex gap-2">
                     <span className="px-2 py-1 bg-white/5 rounded text-xs border border-white/10">Nome</span>
                     <span className="px-2 py-1 bg-white/5 rounded text-xs border border-white/10">Email</span>
                     <span className="px-2 py-1 bg-white/5 rounded text-xs border border-white/10">Telemóvel</span>
                   </div>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Live Preview (iPhone/Desktop Mode) */}
        <div className="lg:col-span-4 bg-black rounded-3xl border-4 border-[#2A2A2A] overflow-hidden shadow-2xl relative h-[600px]">
          <div className="absolute top-0 left-0 right-0 h-6 bg-[#2A2A2A] z-20 flex justify-center items-center">
            <div className="w-16 h-1 bg-black/50 rounded-full" />
          </div>
          
          {/* Preview Content */}
          <div className="h-full overflow-y-auto bg-white text-black p-6 pt-12 text-center flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4 leading-tight">{content.title || "O Seu Título Aqui"}</h1>
            
            {previewImage ? (
              <img src={previewImage} className="w-full h-48 object-cover rounded-lg mb-6 shadow-lg" alt="Hero" />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center text-gray-400 text-sm">
                Sem Imagem
              </div>
            )}

            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              {content.description || "A descrição do seu produto aparecerá aqui. Destaque os benefícios e resolva dores."}
            </p>

            {content.showLeadForm ? (
              <div className="w-full space-y-3 mb-6 bg-gray-50 p-4 rounded-xl">
                <input disabled placeholder="Seu Nome" className="w-full p-2 bg-white border rounded text-sm" />
                <input disabled placeholder="Seu Email" className="w-full p-2 bg-white border rounded text-sm" />
                <button className="w-full py-3 bg-[#22d3ee] text-black font-bold rounded-lg shadow-md opacity-75">
                  {content.buttonText}
                </button>
              </div>
            ) : (
              <button className="w-full py-3 bg-[#22d3ee] text-black font-bold rounded-lg shadow-md transform hover:scale-105 transition-transform">
                {content.buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
