import React, { useRef, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PresentationControls, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sub-componente para carregar e animar o modelo 3D
const CoreModel = () => {
  const modelRef = useRef<THREE.Group>(null);
  
  // Exemplo de como carregar um .glb (Descomentar quando tiver o ficheiro)
  // const { scene } = useGLTF('/models/core-chip.glb');

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
        {/* Usando uma geometria primitiva como Placeholder luxuoso caso não haja GLB */}
        <mesh>
          <icosahedronGeometry args={} />
          <meshPhysicalMaterial 
            color="#000000" 
            metalness={0.9} 
            roughness={0.1} 
            clearcoat={1} 
            clearcoatRoughness={0.1}
            wireframe={true} // Estilo tecnológico
          />
        </mesh>
      </Float>
    </group>
  );
};

export const Hero3D: React.FC = () => {
  return (
    <section id="hero-section" className="relative h-screen w-full bg-cm-dark overflow-hidden flex items-center justify-center">
      
      {/* Camada de Texto (UI) */}
      <div className="absolute z-10 text-center pointer-events-none px-4">
        <h1 className="text-6xl md:text-8xl font-light text-white tracking-tighter mb-4">
          Sovereign <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cm-accent to-blue-600">Engine</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide">
          Design Sells Trust. AI Executes Wealth.
        </p>
      </div>

      {/* Camada 3D (Canvas) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position:, fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={} intensity={1.5} color="#00f0ff" />
          
          <PresentationControls 
            global 
            config={{ mass: 2, tension: 500 }} 
            snap={{ mass: 4, tension: 1500 }} 
            rotation={} 
            polar={} 
            azimuth={}>
              
            <CoreModel />
            
          </PresentationControls>
        </Canvas>
      </div>
    </section>
  );
};