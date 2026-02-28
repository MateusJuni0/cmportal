import { useState } from "react";
import { Box, Sun, Move, Palette, Save, Zap, RefreshCcw, Layout, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { GlassmorphismCard } from "@/components/common/GlassmorphismCard";

export function SceneCustomizer() {
  const [color, setColor] = useState("#00f3ff");
  const [intensity, setIntensity] = useState(70);
  const [rotation, setRotation] = useState(15);
  const [activePreset, setActivePreset] = useState("cyber");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto h-full flex flex-col gap-10 pb-24 px-2 md:px-0"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--color-neon-blue)] font-black text-[10px] uppercase tracking-[0.3em]">
            <Layers className="w-3 h-3" />
            Visual Trust Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            3D <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">Customizer</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium max-w-md">Controle a atmosfera tridimensional do seu portal em tempo real.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 md:flex-none p-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all"
          >
            <RefreshCcw className="w-5 h-5" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 243, 255, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 md:flex-none px-8 py-4 bg-[var(--color-neon-blue)] text-black rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl"
          >
            <Save className="w-5 h-5" />
            DEPLOY CENA
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Controls Panel */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <GlassmorphismCard className="p-8 border border-white/5 space-y-10 bg-white/[0.01]">
            <div className="space-y-4">
              <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-3">
                <Palette className="w-4 h-4 text-[var(--color-neon-blue)]" /> Matriz de Cor
              </h2>
              <div className="flex items-center gap-6 p-4 bg-black/40 rounded-2xl border border-white/5 shadow-inner">
                <div className="relative group cursor-pointer">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-16 rounded-xl cursor-pointer border-none p-0 outline-none bg-transparent relative z-10"
                  />
                  <div className="absolute inset-0 rounded-xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: color }} />
                </div>
                <div className="space-y-1">
                   <div className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">HEX CODE</div>
                   <div className="font-mono text-xl font-black text-white">{color.toUpperCase()}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-3">
                   <Sun className="w-4 h-4 text-amber-400" /> Intensidade
                 </h2>
                 <span className="font-mono text-xs font-bold text-zinc-400 bg-white/5 px-2 py-0.5 rounded">{intensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-[var(--color-neon-blue)]"
              />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-3">
                   <Move className="w-4 h-4 text-[var(--color-neon-purple)]" /> Rotação Orbital
                 </h2>
                 <span className="font-mono text-xs font-bold text-zinc-400 bg-white/5 px-2 py-0.5 rounded">{rotation}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-[var(--color-neon-purple)]"
              />
            </div>

            <div className="pt-4 space-y-4">
               <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Presets Rápidos</h2>
               <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'cyber', label: 'Cyberpunk', icon: Zap },
                    { id: 'minimal', label: 'Glass', icon: Layout }
                  ].map(p => (
                    <button 
                      key={p.id}
                      onClick={() => setActivePreset(p.id)}
                      className={cn(
                        "px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                        activePreset === p.id ? "bg-white/10 border-white/20 text-white" : "bg-black/40 border-white/5 text-zinc-600 hover:text-zinc-400"
                      )}
                    >
                      <p.icon className="w-3 h-3" />
                      {p.label}
                    </button>
                  ))}
               </div>
            </div>
          </GlassmorphismCard>
        </motion.div>

        {/* 3D Preview Canvas */}
        <motion.div variants={itemVariants} className="lg:col-span-8">
          <div className="h-full min-h-[500px] bg-[#050505] rounded-[2.5rem] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            
            <div className="absolute top-8 left-8 px-5 py-2 bg-black/40 backdrop-blur-2xl rounded-2xl text-[10px] font-black tracking-widest text-white flex items-center gap-3 border border-white/10 z-20 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              RENDER_ENGINE: ACTIVE
            </div>

            <div className="absolute bottom-8 right-8 flex gap-3 z-20">
               <div className="p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                  <Move className="w-4 h-4" />
               </div>
               <div className="p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                  <RefreshCcw className="w-4 h-4" />
               </div>
            </div>
            
            {/* Simulated 3D Object Effect */}
            <motion.div
              animate={{ 
                rotateY: rotation,
                rotateX: 15,
                boxShadow: `0 0 ${intensity * 1.5}px ${color}, inset 0 0 ${intensity}px ${color}`,
                borderColor: color
              }}
              className="w-64 h-64 md:w-80 md:h-80 border-[2px] relative z-10 rounded-[3rem] backdrop-blur-3xl bg-white/[0.03] flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent rounded-[3rem]" />
              <div className="relative z-20 text-white/10 group-hover:text-white/20 transition-colors">
                 <Box className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl" />
              </div>
            </motion.div>

            {/* Ambient Lighting based on intensity and color */}
            <motion.div
              animate={{ 
                backgroundColor: color,
                opacity: intensity / 150,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full blur-[180px] pointer-events-none"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
