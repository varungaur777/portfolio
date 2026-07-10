'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import ArtworkMasonry from '@/components/ArtworkMasonry';
import TimelineSection from '@/components/TimelineSection';
import ContactSection from '@/components/ContactSection';

// Dynamically import WebGL canvas so it never blocks main thread rendering
const WebGLBackground = dynamic(() => import('@/components/WebGLBackground'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-cyanGlow/30 selection:text-cyanGlow overflow-x-hidden">
      {/* Dynamic 3D WebGL Background */}
      <WebGLBackground />

      {/* Floating Glassmorphic Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 pt-8 pb-24">
        {/* Interactive Cyber-Cinematic Hero */}
        <HeroSection />

        {/* Bento Grid Case Studies Showcase */}
        <ShowcaseSection />

        {/* Concept Art & Poster Masonry */}
        <ArtworkMasonry />

        {/* Interactive Career Timeline */}
        <TimelineSection />

        {/* High-Conversion Contact & Collaboration */}
        <ContactSection />
      </main>

      {/* Minimalist Glassmorphic Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#09090b]/80 backdrop-blur-xl py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <span>© {new Date().getFullYear()} Varun Gaur. All rights reserved.</span>
          <span className="flex items-center gap-2">
            Engineered with Next.js 14 App Router & Framer Motion
          </span>
        </div>
      </footer>
    </div>
  );
}
