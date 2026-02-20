import React, { useRef, useLayoutEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PresentationControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Sub-componente para carregar e animar o modelo 3D
const CoreModel = () => {
  const modelRef = useRef<THREE.Group>(null);
  
  useLayoutEffect(() => {
    if (modelRef.current) {
      // Animação GSAP acionada pelo Scroll
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 2,
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1, // Suavidade na animação reversa
        }
      });
    }
  },[]);

  return (
    <group ref={modelRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        {/* Placeholder 3D Luxuoso */}
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial 
            color="#00ffc8" 
            metalness={0.9} 
            roughness={0.1} 
            clearcoat={1} 
            clearcoatRoughness={0.1}
            wireframe={true}
            emissive="#00ffc8"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
};

export const Hero3D: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', email);
    // Aqui virá a integração com Supabase/Auth
    // Por enquanto, redireciona direto para o Dashboard
    navigate('/dashboard');
  };

  return (
    <section id="hero-section" className="relative h-screen w-full bg-[#020205] overflow-hidden flex items-center justify-center font-sans">
      
      {/* Camada de Fundo Estelar (CSS puro para performance) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a2a44] via-[#020205] to-[#020205] opacity-80 z-0"></div>

      {/* Camada 3D (Canvas) - Fundo Interativo */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f0ff" />
          
          <PresentationControls 
            global 
            config={{ mass: 2, tension: 500 }} 
            snap={{ mass: 4, tension: 1500 }} 
            rotation={[0, 0, 0]} 
            polar={[-Math.PI / 3, Math.PI / 3]} 
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
              
            <CoreModel />
            
          </PresentationControls>
        </Canvas>
      </div>

      {/* Camada de Interface (Glassmorphism Login) */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-fade-in-up">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
              CM<span className="text-[#00ffc8]">TEC</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Sovereign Engine V4</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] uppercase font-bold text-gray-500 tracking-wider ml-1">
                Secure Identity
              </label>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="identidade@empresa.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00ffc8]/50 focus:bg-white/10 transition-all duration-300"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00ffc8]/20 to-transparent opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500" />
              </div>
            </div>

            <button 
              type="submit" 
              className="group w-full bg-gradient-to-r from-[#00ffc8] to-[#008f7a] hover:from-[#00ffc8] hover:to-[#00a896] text-[#020205] font-extrabold uppercase text-xs tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,200,0.4)] hover:-translate-y-1"
            >
              <span>Iniciar Protocolo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[8px] uppercase tracking-widest text-gray-600">
            <Lock className="w-3 h-3" />
            <span>Encryption: Active | Dante OS</span>
          </div>
          
        </div>
      </div>
    </section>
  );
};
