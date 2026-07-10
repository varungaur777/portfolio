'use client';

import { useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Terminal, Film, Wand2 } from 'lucide-react';

export default function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight border tracking
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full pt-16 pb-12"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-cyanGlow/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -z-10 h-80 w-80 rounded-full bg-purpleGlow/10 blur-[130px] pointer-events-none" />

      {/* Main Glassmorphic Hero Bento Card */}
      <motion.div
        variants={itemVariants}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#09090b]/60 p-8 md:p-12 backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:border-black/[0.15] dark:hover:border-white/[0.14]"
      >
        {/* Spotlight Radial Hover Border Effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 242, 254, 0.12), transparent 40%)`,
          }}
        />

        {/* Left Column: Title & Proposition (8 Spans) */}
        <div className="lg:col-span-8 flex flex-col justify-center gap-6 z-10">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 w-fit rounded-full border border-cyanGlow/25 bg-cyanGlow/10 px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyanGlow opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyanGlow" />
            </span>
            <span className="font-mono text-[10px] font-bold tracking-widest text-cyanGlow uppercase">
              Available for Global Campaigns
            </span>
          </div>

          {/* Main Headline */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
              Varun Gaur
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow via-blueGlow to-purpleGlow">
              AI Creative Director & Visual Storyteller
            </p>
          </div>

          {/* Value Proposition */}
          <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-zinc-400 max-w-2xl">
            Specializing in cinematic AI production, generative video workflows, commercial advertisements, and high-fidelity creative campaigns. I bridge the gap between creative storytelling and cutting-edge machine learning pipelines.
          </p>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#work"
              className="group/btn relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyanGlow via-blueGlow to-purpleGlow px-7 py-3.5 text-xs font-bold tracking-wider text-black uppercase shadow-lg shadow-cyanGlow/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-cyanGlow/40 active:scale-[0.98]"
            >
              Explore Case Studies
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] px-7 py-3.5 text-xs font-bold tracking-wider text-slate-800 dark:text-white uppercase transition-all duration-300 hover:border-cyanGlow/50 hover:bg-black/[0.08] dark:hover:bg-white/[0.08] hover:text-cyanGlow"
            >
              Let&apos;s Collaborate
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Execution Pipeline Card (4 Spans) */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.06] bg-slate-100/80 dark:bg-black/40 p-6 backdrop-blur-md z-10">
          <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-3.5">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyanGlow" />
              <span className="font-mono text-[11px] font-bold tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
                Creative Pipeline
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 dark:text-zinc-500">v2.4 AI</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyanGlow/10 text-cyanGlow">
                <Film className="h-3.5 w-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Generative Directing
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Multi-frame consistency, motion control seeds, and cinematic lighting across Kling AI & Luma.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purpleGlow/10 text-purpleGlow">
                <Wand2 className="h-3.5 w-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  VFX & Fluid Plating
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  High-scale physical simulations, liquid dynamics, and post-processing color grading.
                </p>
              </div>
            </div>
          </div>

          {/* Stack Chips */}
          <div className="mt-2 pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-wrap gap-1.5">
            {['Kling AI', 'Midjourney v6', 'Next.js 14', 'WebGL'].map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-slate-600 dark:text-zinc-400"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
