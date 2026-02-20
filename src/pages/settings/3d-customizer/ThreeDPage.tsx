import { useState } from "react";
import { Box, Sun, Move, Palette } from "lucide-react";

export function SceneCustomizer() {
  const [color, setColor] = useState("#00f3ff");
  const [intensity, setIntensity] = useState(50);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Box className="w-8 h-8 text-brand-500" />
            3D Scene Customizer
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Ajuste a cena 3D interativa do site (integração com Spline).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        {/* Controls Panel */}
        <div className="lg:col-span-1 neumorph dark:neumorph p-8 flex flex-col gap-8 overflow-y-auto rounded-2xl border border-black/5 dark:border-white/5">
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-brand-500" /> Cor Principal (Neon)
            </h2>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border-none p-0 outline-none bg-transparent"
              />
              <span className="font-mono text-sm text-slate-500 dark:text-zinc-400">{color.toUpperCase()}</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5 text-brand-500" /> Intensidade da Luz
            </h2>
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
              <span>0%</span>
              <span>{intensity}%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Move className="w-5 h-5 text-brand-500" /> Rotação do Objeto (Y-Axis)
            </h2>
            <input
              type="range"
              min="-180"
              max="180"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
              <span>-180°</span>
              <span>{rotation}°</span>
              <span>180°</span>
            </div>
          </div>
          
          <button className="mt-auto py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-brand-500/20 w-full">
            Salvar Configurações
          </button>
        </div>

        {/* 3D Preview Canvas */}
        <div className="lg:col-span-2 glass-card rounded-2xl bg-black flex items-center justify-center relative overflow-hidden border border-black/10 dark:border-white/10">
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-mono text-white flex items-center gap-2 border border-white/10 z-20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            SPLINE_VIEWER_ACTIVE
          </div>
          
          {/* Simulated 3D Object Effect */}
          <div
            className="w-64 h-64 border-[4px] relative transition-transform duration-100 ease-out z-10 rounded-3xl backdrop-blur-3xl bg-white/5"
            style={{
              borderColor: color,
              boxShadow: `0 0 ${intensity}px ${color}, inset 0 0 ${intensity/2}px ${color}`,
              transform: `rotateY(${rotation}deg) rotateX(15deg)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent rounded-3xl" />
          </div>

          {/* Ambient Lighting based on intensity and color */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full blur-[150px] pointer-events-none transition-all duration-300"
            style={{
              backgroundColor: color,
              opacity: intensity / 200,
            }}
          />
        </div>
      </div>
    </div>
  );
}
