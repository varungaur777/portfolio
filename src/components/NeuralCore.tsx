'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function NeuralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

    // Normal mouse pointer coordinates are in range [-1, 1]
    const { x, y } = state.pointer;

    // Slowly rotate the sphere relative to cursor location
    mesh.rotation.y += 0.005;
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, y * 0.4, 0.05);
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, x * 0.4, 0.05);

    // Gently float up and down
    const time = state.clock.getElapsedTime();
    mesh.position.y = THREE.MathUtils.lerp(
      mesh.position.y,
      Math.sin(time) * 0.15,
      0.05
    );

    // Modulate distortion speed and intensity based on pointer distance
    const pointerDist = Math.sqrt(x * x + y * y);
    material.distort = THREE.MathUtils.lerp(material.distort ?? 0.4, 0.35 + pointerDist * 0.3, 0.05);
    material.speed = THREE.MathUtils.lerp(material.speed ?? 1.5, 1.2 + pointerDist * 1.5, 0.05);
  });

  return (
    <mesh ref={meshRef} scale={1.8}>
      <sphereGeometry args={[1, 64, 64]} />
      {/* MeshDistortMaterial creates a fluid, organic distortion effect */}
      <MeshDistortMaterial
        ref={materialRef}
        color="#00f2fe"
        attach="material"
        distort={0.4} // Strength of distortion
        speed={1.5}  // Speed of distortion
        roughness={0.15}
        metalness={0.9}
        clearcoat={1}
        clearcoatRoughness={0.1}
        wireframe={true} // High-tech grid visualization
      />
    </mesh>
  );
}
