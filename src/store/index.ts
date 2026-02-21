import { create } from 'zustand';
import { AgentsSlice, createAgentsSlice } from './slices/agentsSlice';
import { TrainingSlice, createTrainingSlice } from './slices/trainingSlice';
import { CreativeSlice, createCreativeSlice } from './slices/creativeSlice';
import { CRMSlice, createCRMSlice } from './slices/crmSlice';
import { SystemSlice, createSystemSlice } from './slices/systemSlice';

export type AppState = AgentsSlice & TrainingSlice & CreativeSlice & CRMSlice & SystemSlice;

export const useAppStore = create<AppState>()((...a) => ({
  ...createAgentsSlice(...a),
  ...createTrainingSlice(...a),
  ...createCreativeSlice(...a),
  ...createCRMSlice(...a),
  ...createSystemSlice(...a),
}));
