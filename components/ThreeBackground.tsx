"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Particles setup
    const particleCount = 700;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: {x: number, y: number, z: number}[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 100;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05,
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x9d4edd,
      size: 0.2,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Lines setup
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7b2cbf,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    let lineGeometry = new THREE.BufferGeometry();
    let lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const onDocumentMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.05;
      mouseY = (event.clientY - windowHalfY) * 0.05;
    };

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    // Resize handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Camera movement
      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (-mouseY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      const linePositions: number[] = [];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3 + 2] += particleVelocities[i].z;

        if (Math.abs(positions[i * 3]) > 50) particleVelocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 50) particleVelocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 25) particleVelocities[i].z *= -1;

        for (let j = i + 1; j < particleCount; j += 4) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          if (dist < 8) {
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            );
          }
        }
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;
      
      lineMesh.geometry.dispose();
      lineMesh.geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      particleSystem.rotation.y += 0.001;
      lineMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
