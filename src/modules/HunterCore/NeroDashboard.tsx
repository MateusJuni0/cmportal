import React from 'react';

// Molécula: Card Glassmorphic
const GlassCard = ({ title, value, status, metric }: any) => (
  <div className="relative p-6 rounded-3xl bg-glass-gradient backdrop-blur-xl border border-white/10 shadow-glass-glow hover:border-white/20 transition-all duration-300">
    <h3 className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-2">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-light text-white">{value}</span>
      <span className={`text-sm ${status === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {metric}
      </span>
    </div>
  </div>
);

// Molécula: Lead Scoring (Prime Indicator)
const PrimeLeadItem = ({ name, score, company }: any) => (
  <div className="flex items-center justify-between p-4 mb-3 rounded-2xl bg-cm-panel shadow-neu-dark border border-white/5">
    <div>
      <h4 className="text-white font-medium">{name}</h4>
      <p className="text-xs text-gray-500">{company}</p>
    </div>
    <div className="relative flex items-center justify-center w-12 h-12 rounded-full shadow-neu-dark-inset">
      <span className={`font-bold ${score >= 90 ? 'text-cm-gold drop-shadow-md' : 'text-gray-300'}`}>
        {score}
      </span>
    </div>
  </div>
);

export const NeroDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-cm-dark p-8 font-sans">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light text-white mb-1">Agente <span className="font-bold">Nero</span></h2>
          <p className="text-cm-accent text-sm tracking-widest uppercase">Sistema de Prospecção Autônomo</p>
        </div>
        {/* Botão Neumórfico */}
        <button className="px-6 py-2 rounded-full bg-cm-panel text-white text-sm font-medium shadow-neu-dark hover:shadow-neu-dark-inset transition-all">
          Parar Operação
        </button>
      </header>

      {/* Grid de Métricas (Glassmorphism) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <GlassCard title="ROI Estimado" value="€ 42.5K" status="up" metric="+12.5%" />
        <GlassCard title="Custo de Aquisição (CAC)" value="€ 124" status="down" metric="-5.2%" />
        <GlassCard title="Abordagens Hoje" value="1,204" status="up" metric="+42" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lista de Leads Qualificados */}
        <section>
          <h3 className="text-lg text-white font-light mb-6 border-b border-white/10 pb-2">Leads "Prime" Recentes</h3>
          <PrimeLeadItem name="CEO, TechLogis" score={98} company="TechLogis Portugal" />
          <PrimeLeadItem name="Diretor de Inovação" score={94} company="Vanguard Real Estate" />
          <PrimeLeadItem name="Fundador" score={88} company="Apex SaaS" />
        </section>

        {/* Espaço para Visualização 3D de Dados */}
        <section className="relative h-64 rounded-3xl bg-glass-gradient backdrop-blur-md border border-white/5 flex items-center justify-center overflow-hidden">
           {/* Aqui entraria um gráfico 3D via Drei/Threejs mapeando os Leads geolocalizados */}
           <div className="absolute text-center z-10">
              <span className="text-gray-500 text-sm tracking-widest uppercase">Mapa de Intenção 3D</span>
              <p className="text-xs text-gray-600 mt-2">Renderização de Satélite Ativa...</p>
           </div>
        </section>
      </div>
    </div>
  );
};