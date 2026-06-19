'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tiltEnabled?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  tiltEnabled = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/touch device to prevent layout jump and preserve performance
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Framer Motion values for normalized mouse positions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth, organic transitions
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  // Dynamic glare coordinates (percentage based)
  const glareXSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareYSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);
  
  // Make glare appear on hover and disappear on leave
  const glareOpacity = useSpring(isHovered && !isMobile ? 0.35 : 0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile || !tiltEnabled) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalized relative coordinates: -0.5 is left/top, 0.5 is right/bottom
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const shouldTilt = tiltEnabled && !isMobile;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: shouldTilt ? rotateXSpring : 0,
        rotateY: shouldTilt ? rotateYSpring : 0,
        perspective: 1000,
      }}
      className={`relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-[24px] shadow-2xl transition-all duration-300 ${
        isHovered && !isMobile
          ? 'border-white/[0.16] shadow-primary/10 bg-gradient-to-br from-white/[0.12] to-white/[0.04]'
          : 'shadow-black/40'
      } ${className}`}
    >
      {/* Glare/Reflective Layer */}
      {shouldTilt && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareXSpring, glareYSpring],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 50%)`
            ),
          }}
        />
      )}

      {/* Content wrapper with depth offset */}
      <div 
        style={{ 
          transform: shouldTilt ? 'translateZ(15px)' : 'none', 
          transformStyle: 'preserve-3d' 
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
