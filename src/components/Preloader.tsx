'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Disable scrolling while preloading
    document.documentElement.classList.add('lenis-stopped');

    const loaderData = { value: 0 };
    // Fast loading simulation that feels energetic and high-tech
    const tl = gsap.timeline({
      onComplete: () => {
        setIsCompleted(true);
        // Delay complete callback slightly for smooth exit dissolve transition
        setTimeout(() => {
          document.documentElement.classList.remove('lenis-stopped');
          onComplete();
        }, 800);
      },
    });

    tl.to(loaderData, {
      value: 100,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => {
        setCount(Math.floor(loaderData.value));
      },
    });

    // Fade out preloader elements
    tl.to('.preloader-content', {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power3.in',
    });

    // Dissolve entire overlay
    tl.to('.preloader-bg', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    return () => {
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [onComplete]);

  if (isCompleted && count === 100) return null;

  return (
    <div className="preloader-bg fixed inset-0 bg-[#020202] z-[99999] flex flex-col justify-between p-8 md:p-16 select-none pointer-events-none">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-repeat pointer-events-none bg-center"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
           }}
      />

      {/* Top Section */}
      <div className="preloader-content flex justify-between items-center text-xs font-mono tracking-widest text-[#a1a1aa] z-10">
        <div>VARUN GAUR — PORTFOLIO</div>
        <div>EST. 2026</div>
      </div>

      {/* Center Section: Main Text & Progress */}
      <div className="preloader-content flex flex-col justify-center items-start gap-4 z-10 my-auto">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-cyanGlow animate-ping" />
          <span className="font-mono text-xs tracking-[0.25em] text-[#a1a1aa] uppercase">
            System Initializing
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white flex flex-wrap items-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2fe] to-[#a855f7]">
            @vgaur2003
          </span>
        </h1>
        
        {/* Progress Bar Container */}
        <div className="w-full max-w-md h-[2px] bg-white/5 rounded-full overflow-hidden mt-4 relative">
          <div 
            className="h-full bg-gradient-to-r from-cyanGlow to-purpleGlow rounded-full transition-all duration-75"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="preloader-content flex justify-between items-end text-xs font-mono text-[#a1a1aa] z-10">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-white/40 tracking-wider">CREATIVE PIPELINE</span>
          <span className="tracking-wider">AI VIDEO & VISUAL STORYTELLER</span>
        </div>
        <div className="text-right flex flex-col gap-1">
          <span className="text-[10px] text-white/40 tracking-wider">BUFFERING RESUMES</span>
          <span className="text-2xl md:text-4xl font-extrabold text-white leading-none tracking-tighter">
            {String(count).padStart(3, '0')}%
          </span>
        </div>
      </div>
    </div>
  );
}
