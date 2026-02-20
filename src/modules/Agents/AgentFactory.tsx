import React, { useState } from 'react';
import { Bot, Sparkles, Zap, Cpu, Save } from 'lucide-react';

const AgentCard = ({ name, role, status, model }: any) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00ffc8]/30 transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <Zap className="w-4 h-4 text-[#00ffc8]" />
    </div>
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ffc8]/20 to-[#008f7a]/20 flex items-center justify-center">
        <Bot className="w-6 h-6 text-[#00ffc8]" />
      </div>
      <div>
        <h3 className="font-bold text-white">{name}</h3>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">Model</span>
        <span className="text-gray-300 font-mono">{model}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">Status</span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
          {status}
        </span>
      </div>
    </div>
  </div>
);

export const AgentFactory: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#020205] p-8 text-white font-sans animate-fade-in">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-light mb-1 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-[#00ffc8]" />
            Agent <span className="font-bold">Factory</span>
          </h2>
          <p className="text-gray-500 text-sm tracking-widest uppercase ml-11">Neural Network Management</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00ffc8] text-[#020205] font-bold text-sm hover:shadow-[0_0_20px_rgba(0,255,200,0.4)] transition-all">
          <Sparkles className="w-4 h-4" />
          <span>Deploy New Agent</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
        {['Overview', 'Blueprints', 'Training', 'Deployment'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.toLowerCase() 
                ? 'text-[#00ffc8] border-b-2 border-[#00ffc8]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <AgentCard name="Nero" role="Sales Hunter (Outbound)" status="Active" model="Gemini Pro 1.5" />
        <AgentCard name="Dante" role="Orchestrator (Core)" status="Active" model="Gemini Flash 2.0" />
        <AgentCard name="Lúcio" role="QA & Stability" status="Standby" model="GPT-4o Mini" />
        <AgentCard name="Alfa" role="Intent Sniper" status="Active" model="Llama 3 70B" />
      </div>

      {/* Blueprint Editor Preview */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 h-96 relative overflow-hidden group">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#00ffc8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Sparkles className="w-8 h-8 text-[#00ffc8]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Neural Blueprint Editor</h3>
          <p className="text-gray-400 max-w-md mb-6">Drag & Drop behavior blocks to create custom agents. Connect LLMs, Tools, and Vector Memory visually.</p>
          <button className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm">
            Open Editor
          </button>
        </div>
      </section>
    </div>
  );
};
