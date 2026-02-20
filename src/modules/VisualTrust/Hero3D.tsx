import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

// Modelo da Esfera Wireframe Gigante
const SphereWireframe = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002; // Rotação lenta e constante
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1; // Leve oscilação
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={[2.8, 2.8, 2.8]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial 
          color="#00f0ff" 
          wireframe={true} 
          transparent={true} 
          opacity={0.3}
        />
      </mesh>
      {/* Esfera interna para dar profundidade */}
      <mesh scale={[2.78, 2.78, 2.78]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#0088ff" 
          wireframe={true} 
          transparent={true} 
          opacity={0.1}
        />
      </mesh>
    </Float>
  );
};

export const Hero3D: React.FC = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    // Animação de entrada poderia ser adicionada aqui
    navigate('/dashboard');
  };

  return (
    <section className="relative h-screen w-full bg-[#020205] overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* Fundo Gradiente Sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0a1a2f] via-[#020205] to-[#020205] opacity-60 z-0"></div>

      {/* Camada 3D (Canvas) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <SphereWireframe />
        </Canvas>
      </div>

      {/* Interface UI Sobreposta */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full py-20 pointer-events-none">
        
        {/* Header / Título */}
        <div className="text-center mt-10">
          <h1 className="text-5xl md:text-6xl font-light text-white tracking-tighter mb-2">
            CM Tecnologia
          </h1>
          <h2 className="text-5xl md:text-6xl font-black text-[#00f0ff] tracking-tight uppercase drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            Portal
          </h2>
          <p className="text-gray-500 text-[10px] tracking-[0.5em] uppercase mt-4">
            Private Access Joint-Venture
          </p>
        </div>

        {/* Botão Central (Pointer events reativados) */}
        <div className="pointer-events-auto mt-8">
          <button 
            onClick={handleEnter}
            className="group relative px-12 py-4 bg-transparent border border-[#00f0ff]/50 text-[#00f0ff] font-bold text-sm tracking-[0.2em] uppercase rounded-full hover:bg-[#00f0ff]/10 hover:border-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 backdrop-blur-sm"
          >
            <span className="relative z-10">Initialize Engine</span>
            <div className="absolute inset-0 rounded-full bg-[#00f0ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mb-10">
          <p className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">
            Security Protocol V3.0
          </p>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto mt-4 rounded-full"></div>
        </div>

      </div>
    </section>
  );
};
