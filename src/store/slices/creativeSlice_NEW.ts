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
  setCreativeResult: (result: string | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  addHistoryItem: (item: GeneratedContent) => void;
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
  setCreativeResult: (result) => set((state) => ({
    creativeLab: { ...state.creativeLab, result }
  })),
  setIsGenerating: (isGenerating) => set((state) => ({
    creativeLab: { ...state.creativeLab, isGenerating }
  })),
  addHistoryItem: (item) => set((state) => ({
    creativeLab: { ...state.creativeLab, history: [item, ...state.creativeLab.history] }
  })),
  // Removido o generateCreativeAsset mockado daqui, será tratado no componente via tRPC
  clearCreativeHistory: () => set((state) => ({
    creativeLab: { ...state.creativeLab, history: [] }
  })),
});