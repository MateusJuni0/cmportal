import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#020205] text-white font-sans overflow-hidden">
      {/* Sidebar Fixa */}
      <Sidebar />
      
      {/* Conteúdo Principal Scrollável */}
      <main className="flex-1 overflow-y-auto ml-64 p-8 bg-[#0a0a0c] relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
