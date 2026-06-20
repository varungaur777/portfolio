'use client';

import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import NeuralCore from './NeuralCore';

export default function WebGLBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile viewport to degrade quality/deactivate heavy WebGL calculations
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Completely bypass WebGL canvas rendering on mobile to save CPU/GPU overhead and prevent lag
  if (isMobile) {
    return <div className="fixed inset-0 w-full h-full -z-10 bg-[#050505] overflow-hidden select-none" />;
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-[#050505] overflow-hidden select-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          dpr={[1, 1.5]} // Limit pixel ratio to maintain a smooth 60 FPS
          gl={{ antialias: true }}
        >
          {/* Subtle atmospheric ambient lighting */}
          <ambientLight intensity={0.25} />
          
          {/* Main lighting sweeps that give 3D mesh metallic highlights */}
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f2fe" />
          <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#a855f7" />
          <pointLight position={[0, -2, 5]} intensity={0.5} color="#4facfe" />

          {/* Render the core 3D mesh */}
          <NeuralCore />

          {/* Ground shadows underneath the sphere to lock depth perspective */}
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.4}
            scale={8}
            blur={2.5}
            far={4}
          />
        </Canvas>
      </Suspense>
      {/* Background radial gradient overlay that blends WebGL seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
    </div>
  );
}
