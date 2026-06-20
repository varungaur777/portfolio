'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Disable on touch screens (coarse pointer)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    // Set initial position out of view
    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e: MouseEvent) => {
      // Ring lags slightly for smooth, cinematic fluid movement
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power3.out',
      });
      // Dot is snappy and follows mouse immediately
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Dynamic hover states
    const handleMouseEnterLink = () => {
      gsap.to(ring, {
        scale: 1.8,
        backgroundColor: 'rgba(0, 242, 254, 0.1)',
        borderColor: '#00f2fe',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: 0.3,
        backgroundColor: '#00f2fe',
        duration: 0.3,
      });
    };

    const handleMouseLeaveLink = () => {
      setCursorText('');
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#00f2fe',
        duration: 0.3,
      });
    };

    const handleMouseEnterCard = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const label = target.getAttribute('data-cursor-label') || 'VIEW';
      setCursorText(label);
      gsap.to(ring, {
        scale: 2.2,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#00f2fe',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
      });
    };

    const handleMouseLeaveCard = () => {
      setCursorText('');
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        opacity: 1,
        scale: 1,
        backgroundColor: '#00f2fe',
        duration: 0.3,
      });
    };

    // Attach listeners to interactive elements
    const updateListeners = () => {
      const links = document.querySelectorAll('a, button, input, textarea, select');
      links.forEach((link) => {
        link.addEventListener('mouseenter', handleMouseEnterLink);
        link.addEventListener('mouseleave', handleMouseLeaveLink);
      });

      const cards = document.querySelectorAll('[data-cursor-playable]');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', handleMouseEnterCard);
        card.addEventListener('mouseleave', handleMouseLeaveCard);
      });
    };

    updateListeners();

    // Re-bind listeners on DOM updates (useful for dynamic routes or client state changes)
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      const links = document.querySelectorAll('a, button, input, textarea, select');
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnterLink);
        link.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
      const cards = document.querySelectorAll('[data-cursor-playable]');
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', handleMouseEnterCard);
        card.removeEventListener('mouseleave', handleMouseLeaveCard);
      });
    };
  }, []);

  return (
    <>
      {/* Outer circular ring with smooth lag */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[9999] hidden md:flex items-center justify-center text-[8px] font-bold text-cyanGlow tracking-wider transition-transform select-none"
      >
        <span className="opacity-100 font-sans">{cursorText}</span>
      </div>
      {/*Snappy center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyanGlow pointer-events-none z-[9999] hidden md:block"
      />
    </>
  );
}
