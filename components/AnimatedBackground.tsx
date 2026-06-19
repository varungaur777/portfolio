'use client';

import React, { useEffect, useRef, useState } from 'react';

const AnimatedBackground = () => {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile to disable high-overhead event listeners and styling
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Scroll parallax effect
    let scrollRequestId: number;
    const handleScroll = () => {
      const scroll = window.pageYOffset;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;

        // Apply scroll offset on top of default keyframe animations using a CSS variable
        const scrollFactor = 0.2 + index * 0.1;
        const yOffset = scroll * scrollFactor;
        blob.style.setProperty('--scroll-y', `${yOffset}px`);
      });

      scrollRequestId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Mouse movement tracker for the refractive glass glow (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current || window.innerWidth < 768) return;

      const x = e.clientX;
      const y = e.clientY + window.scrollY;

      // Centered offset translation
      glowRef.current.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(scrollRequestId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#030206]">
      {/* Colored Liquid Blobs */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen filter blur-[100px] md:blur-[130px]">
        {/* Blob 1: Electric Purple (Top Left) */}
        <div
          ref={(ref) => {
            blobRefs.current[0] = ref;
          }}
          className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-tr from-[#7B2CBF] to-[#9D4EDD] opacity-45 top-[-10%] left-[-10%] animate-liquid-slow"
          style={{
            animationDelay: '0s',
            animationDuration: '22s',
          }}
        />

        {/* Blob 2: Cyber Magenta (Top Right) */}
        <div
          ref={(ref) => {
            blobRefs.current[1] = ref;
          }}
          className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-[#FF007F] to-[#E20074] opacity-35 top-[15%] right-[-5%] animate-liquid-slow"
          style={{
            animationDelay: '-4s',
            animationDuration: '18s',
          }}
        />

        {/* Blob 3: Electric Cyan (Bottom Left) */}
        <div
          ref={(ref) => {
            blobRefs.current[2] = ref;
          }}
          className="absolute w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-tr from-[#00F0FF] to-[#0072FF] opacity-30 bottom-[10%] left-[-15%] animate-liquid-slow"
          style={{
            animationDelay: '-8s',
            animationDuration: '26s',
          }}
        />

        {/* Blob 4: Deep Violet (Bottom Right) */}
        <div
          ref={(ref) => {
            blobRefs.current[3] = ref;
          }}
          className="absolute w-[250px] h-[250px] md:w-[380px] md:h-[380px] rounded-full bg-gradient-to-tr from-[#3C096C] to-[#7B2CBF] opacity-40 bottom-[-10%] right-[-5%] animate-liquid-slow"
          style={{
            animationDelay: '-12s',
            animationDuration: '20s',
          }}
        />
      </div>

      {/* Refractive Mouse Glow Layer (Behind glass panels) */}
      {!isMobile && (
        <div
          ref={glowRef}
          className="absolute w-[300px] h-[300px] rounded-full bg-radial-glow opacity-25 blur-[60px] mix-blend-screen pointer-events-none transition-transform duration-[400ms] ease-out will-change-transform"
        />
      )}

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Dark Vignette for depth contrast */}
      <div className="absolute inset-0 bg-radial-vignette" />
    </div>
  );
};

export default AnimatedBackground;