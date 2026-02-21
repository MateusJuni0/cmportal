import { StateCreator } from 'zustand';
import { TrainingFile } from '../../types';
import { AppState } from '../index';

export interface TrainingSlice {
  trainingFiles: TrainingFile[];
  trainingStatus: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  trainingProgress: number;
  addTrainingFile: (file: Omit<TrainingFile, "id" | "uploadedAt" | "status">) => void;
  removeTrainingFile: (id: string) => void;
  startTraining: () => void;
}

export const createTrainingSlice: StateCreator<AppState, [], [], TrainingSlice> = (set, get) => ({
  trainingFiles: [],
  trainingStatus: 'idle',
  trainingProgress: 0,
  addTrainingFile: (file) => set((state) => ({
    trainingFiles: [...state.trainingFiles, { 
      ...file, 
      id: Math.random().toString(36).substr(2, 9), 
      uploadedAt: new Date(), 
      status: 'pending',
      progress: 0 
    }]
  })),
  removeTrainingFile: (id) => set((state) => ({
    trainingFiles: state.trainingFiles.filter(f => f.id !== id)
  })),
  startTraining: () => {
    if (get().trainingFiles.length === 0) return;
    set({ trainingStatus: 'uploading', trainingProgress: 0 });

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        set((state) => ({ 
          trainingStatus: 'success', 
          trainingProgress: 100,
          trainingFiles: state.trainingFiles.map(f => ({ ...f, status: 'completed', progress: 100 }))
        }));
        get().addLog('Treinamento de IA concluído com sucesso.', 'success');
      } else {
        const status = currentProgress > 40 ? 'processing' : 'uploading';
        set((state) => ({ 
          trainingProgress: Math.floor(currentProgress),
          trainingStatus: status,
          trainingFiles: state.trainingFiles.map(f => ({ 
            ...f, 
            status: currentProgress > 40 ? 'processing' : 'pending',
            progress: Math.floor(currentProgress)
          }))
        }));
      }
    }, 400);
  },
});
