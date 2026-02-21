import { StateCreator } from 'zustand';
import { GeneratedContent } from '../../types';
import { AppState } from '../index';

export interface CreativeSlice {
  creativeLab: {
    activeTab: 'image' | 'copy' | 'video';
    prompt: string;
    isGenerating: boolean;
    result: string | null;
    history: GeneratedContent[];
  };
  setCreativeTab: (tab: 'image' | 'copy' | 'video') => void;
  setCreativePrompt: (prompt: string) => void;
  generateCreativeAsset: () => void;
  clearCreativeHistory: () => void;
}

export const createCreativeSlice: StateCreator<AppState, [], [], CreativeSlice> = (set, get) => ({
  creativeLab: {
    activeTab: 'image',
    prompt: '',
    isGenerating: false,
    result: null,
    history: [],
  },
  setCreativeTab: (tab) => set((state) => ({ 
    creativeLab: { ...state.creativeLab, activeTab: tab, result: null } 
  })),
  setCreativePrompt: (prompt) => set((state) => ({ 
    creativeLab: { ...state.creativeLab, prompt } 
  })),
  generateCreativeAsset: () => {
    const { activeTab, prompt, history } = get().creativeLab;
    if (!prompt.trim()) return;

    set((state) => ({ creativeLab: { ...state.creativeLab, isGenerating: true, result: null } }));
    get().addLog(`Iniciando síntese de ${activeTab} via GLM 4.7...`, 'info');

    setTimeout(() => {
      let result = '';
      if (activeTab === "image") {
        result = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";
      } else if (activeTab === "copy") {
        result = `✨ Assunto: Transforme o potencial da sua empresa com IA\n\nOlá,\n\nNotei que sua empresa tem expandido rapidamente. \n\nDesenvolvemos uma solução focada em otimizar processos de vendas com IA (GLM 4.7 Engine) que pode aumentar sua conversão em 147%.\n\nPodemos marcar uma breve call na terça?\n\nAbraços,\nEquipe CMTecnologia`;
      } else {
        result = "video-placeholder";
      }

      const newContent: GeneratedContent = {
        id: Math.random().toString(36).substr(2, 9),
        type: activeTab,
        prompt,
        result,
        status: 'completed',
        createdAt: new Date(),
      };

      set((state) => ({ 
        creativeLab: { 
          ...state.creativeLab, 
          isGenerating: false, 
          result,
          history: [newContent, ...state.creativeLab.history]
        } 
      }));
      get().addLog(`Síntese de ${activeTab} concluída. Ativo salvo no histórico.`, 'success');
    }, 2500);
  },
  clearCreativeHistory: () => set((state) => ({
    creativeLab: { ...state.creativeLab, history: [] }
  })),
});
