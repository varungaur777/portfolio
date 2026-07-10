'use client';

import { useState, useRef, MouseEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Cpu, Clock, Wrench, Copy, Check, ExternalLink, Terminal } from 'lucide-react';
import { Project } from '@/data/projects';
import Navbar from '@/components/Navbar';

interface ProjectDetailsClientProps {
  project: Project;
}

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const detailsRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight movements
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, key: number) => {
    const card = cardRefs.current[key];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseMoveDetails = (e: MouseEvent<HTMLDivElement>) => {
    const card = detailsRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Copy prompt helper
  const handleCopyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const normalizedVideoSrc = project.fullVideoSrc.startsWith('/')
    ? project.fullVideoSrc
    : `/${project.fullVideoSrc}`;

  return (
    <div className="flex flex-col gap-10 w-full relative pt-12">
      <Navbar />
      
      {/* Back Button Navigation */}
      <div className="flex items-center justify-between w-full">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-cyanGlow transition-colors duration-300"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Work
        </Link>
        
        {project.driveLink && (
          <a
            href={project.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted hover:text-cyanGlow transition-colors duration-300"
          >
            Watch Full Res Drive
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      {/* ==========================================
         HERO VIDEO HEADER
         ========================================== */}
      <section className={
        project.aspect === 'portrait'
          ? "relative w-full max-w-[360px] aspect-[9/16] mx-auto rounded-3xl overflow-hidden border border-obsidian-500/10 dark:border-white/5 bg-black shadow-2xl shadow-cyanGlow/5"
          : "relative w-full aspect-video rounded-3xl overflow-hidden border border-obsidian-500/10 dark:border-white/5 bg-black shadow-2xl shadow-cyanGlow/5"
      }>
        <video
          src={normalizedVideoSrc}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Subtle vignette shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
      </section>

      {/* ==========================================
         PROJECT SPECS & HEADER DETAILS
         ========================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Header description */}
        <div className="lg:col-span-2 flex flex-col justify-center gap-4">
          <span className="font-mono text-xs font-bold tracking-widest text-cyanGlow uppercase">
            {project.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {project.title}
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-muted mt-2">
            {project.details.overview}
          </p>
        </div>

        {/* Specs Table Spotlight Card */}
        <div
          ref={detailsRef}
          onMouseMove={handleMouseMoveDetails}
          className="spotlight-card lg:col-span-1 p-6 flex flex-col justify-center gap-4 border border-obsidian-500/10 dark:border-white/5 bg-white/70 dark:bg-[#09090b]/55"
        >
          <div className="flex items-center gap-2 border-b border-obsidian-500/10 dark:border-white/5 pb-3">
            <Terminal size={14} className="text-cyanGlow" />
            <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
              Production Specs
            </span>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between items-center py-0.5 border-b border-obsidian-500/5 dark:border-white/5">
              <span className="text-muted flex items-center gap-1.5"><Cpu size={12} /> Role:</span>
              <span className="font-semibold text-obsidian dark:text-white text-right">{project.details.role}</span>
            </div>
            
            <div className="flex justify-between items-center py-0.5 border-b border-obsidian-500/5 dark:border-white/5">
              <span className="text-muted flex items-center gap-1.5"><Wrench size={12} /> Pipeline:</span>
              <span className="font-semibold text-obsidian dark:text-white text-right">{project.details.tools.join(', ')}</span>
            </div>

            <div className="flex justify-between items-center py-0.5">
              <span className="text-muted flex items-center gap-1.5"><Clock size={12} /> Duration:</span>
              <span className="font-semibold text-obsidian dark:text-white text-right">{project.details.duration}</span>
            </div>
          </div>
        </div>

      </section>

      {/* ==========================================
         PROMPT ENGINEERING BREAKDOWN
         ========================================== */}
      <section className="flex flex-col gap-6 mt-6">
        <div className="flex items-center gap-2">
          <Terminal size={15} className="text-cyanGlow" />
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Prompt Engineering & Logic
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {project.details.promptBreakdown.map((item, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              className="spotlight-card p-6 md:p-8 flex flex-col gap-4 border border-obsidian-500/10 dark:border-white/5 bg-white/70 dark:bg-[#09090b]/55"
            >
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-cyanGlow" />
                {item.title}
              </h4>

              {/* Code Box container */}
              <div className="relative w-full p-4 rounded-xl border border-black/10 dark:border-white/10 bg-slate-900 font-mono text-xs leading-relaxed text-slate-100 flex items-start gap-4 shadow-inner">
                <code className="flex-grow select-all font-mono break-words text-[11px]">
                  {item.prompt}
                </code>
                
                {/* Copy Button */}
                <button
                  onClick={() => handleCopyPrompt(item.prompt, index)}
                  className="flex-shrink-0 p-2 rounded-md border border-white/10 hover:border-cyanGlow text-white hover:text-cyanGlow bg-white/5 transition-all duration-300"
                  title="Copy prompt"
                >
                  {copiedIndex === index ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>

              {/* Explanatory text */}
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-white">Mechanism: </span>
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
         STORYBOARD GRID
         ========================================== */}
      <section className="flex flex-col gap-6 mt-6 pb-10">
        <div className="flex items-center gap-2">
          <Cpu size={15} className="text-cyanGlow" />
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Storyboard & Concept Boards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.details.storyboard.map((frame, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-2xl overflow-hidden border border-obsidian-500/10 dark:border-white/5 bg-black/40 group"
            >
              <Image
                src={`/${frame}`}
                alt={`Storyboard frame ${index + 1}`}
                width={480}
                height={270}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-103"
              />
              <div className="absolute bottom-3 left-3 px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest text-[#a1a1aa] uppercase bg-black/60 rounded-md border border-white/10">
                FRAME 0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
