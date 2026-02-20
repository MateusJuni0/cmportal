import React from 'react';
import { Camera, Image, Wand, Layout, Video, UploadCloud, Plus } from 'lucide-react';

const MediaCard = ({ type, title, status, thumbnail }: any) => (
  <div className="relative group cursor-pointer overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-[#00ffc8] transition-all duration-300">
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
    <img src={thumbnail || '/api/placeholder/400/300'} alt={title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
    
    <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#00ffc8] bg-[#00ffc8]/10 px-2 py-1 rounded-full mb-2 inline-block">
            {type}
          </span>
          <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
        </div>
        <div className="p-2 rounded-full bg-white/10 hover:bg-[#00ffc8] hover:text-black transition-colors">
          <Wand className="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
);

export const CreativeLab: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020205] p-8 text-white font-sans">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-light mb-2 flex items-center gap-3">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">Creative</span>
            Lab
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">AI-Generated Assets & Marketing Material</p>
        </div>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
            <UploadCloud className="w-4 h-4" />
            <span>Upload</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all">
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['All Assets', 'Generated Images', 'Video Shorts', 'Ad Copy', '3D Models'].map((filter, i) => (
          <button 
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0 ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <MediaCard type="Image Gen" title="Luxury Penthouse View" status="Ready" thumbnail="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" />
        <MediaCard type="Video" title="Drone Tour - Cascais" status="Processing" thumbnail="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800" />
        <MediaCard type="3D Model" title="Modern Villa Exterior" status="Draft" thumbnail="https://images.unsplash.com/photo-1600596542815-2a4d04799052?auto=format&fit=crop&q=80&w=800" />
        <MediaCard type="Ad Copy" title="Summer Campaign 2026" status="Review" thumbnail="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" />
        
        {/* Placeholder for New Generation */}
        <div className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-8 hover:border-[#00ffc8]/50 hover:bg-[#00ffc8]/5 transition-all cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Wand className="w-8 h-8 text-gray-400 group-hover:text-[#00ffc8]" />
          </div>
          <span className="font-bold text-gray-400 group-hover:text-white">Generate with AI</span>
          <span className="text-xs text-gray-600 mt-2">Text-to-Image / Video</span>
        </div>
      </div>
    </div>
  );
};
