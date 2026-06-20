'use client';

import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, ChevronRight, Mail, Sparkles, Terminal, Code2, Film } from 'lucide-react';
import dynamic from 'next/dynamic';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

// Dynamically import heavy interactive elements to optimize bundle and SSR
const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });
const MasonryGallery = dynamic(() => import('@/components/MasonryGallery'), { ssr: false });
const Lightbox = dynamic(() => import('@/components/Lightbox'), { ssr: false });

// Animated statistics counter widget
function StatsCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / target), 12);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div 
      ref={ref} 
      className="spotlight-card flex flex-col p-6 items-center text-center justify-center border border-obsidian-500/10 dark:border-white/5 bg-white/70 dark:bg-[#09090b]/50"
    >
      <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow via-blueGlow to-purpleGlow">
        {isInView ? count : 0}
        {suffix}
      </span>
      <span className="text-[10px] font-mono tracking-widest text-muted uppercase mt-2">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<'all' | 'commercial' | 'storytelling'>('all');
  
  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<{
    type: 'image' | 'video' | null;
    src: string;
    title: string;
  }>({ type: null, src: '', title: '' });

  const heroCardRef = useRef<HTMLDivElement>(null);
  const techCardRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight movements
  const handleMouseMoveSpotlight = (e: MouseEvent<HTMLElement>, ref: typeof heroCardRef) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleSelectMedia = (type: 'image' | 'video', src: string, title: string) => {
    setLightboxMedia({ type, src, title });
    setLightboxOpen(true);
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(proj => proj.category === filter);

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
  };

  return (
    <>
      {/* Preloading Screen */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Main content displays stagger-reveal once preload resolves */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="flex flex-col gap-12 w-full"
          >
            {/* ==========================================
               HERO ROW
               ========================================== */}
            <motion.section 
              variants={itemVariants}
              ref={heroCardRef}
              onMouseMove={(e) => handleMouseMoveSpotlight(e, heroCardRef)}
              className="spotlight-card grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 md:p-12 bg-white/70 dark:bg-[#09090b]/55 border border-obsidian-500/10 dark:border-white/5"
            >
              <div className="lg:col-span-2 flex flex-col justify-center gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyanGlow/10 text-cyanGlow">
                    <Sparkles size={12} className="animate-pulse" />
                  </div>
                  <span className="font-mono text-xs tracking-widest text-cyanGlow uppercase">
                    Available for Freelance & Campaigns
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-obsidian dark:text-white">
                  Varun Gaur
                </h1>
                
                <p className="text-lg md:text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow via-blueGlow to-purpleGlow">
                  AI Creative Director & Visual Storyteller
                </p>

                <p className="text-sm md:text-base leading-relaxed text-muted max-w-xl">
                  Specializing in cinematic AI production, generative video workflows, commercial advertisements, and creative campaigns. I bridge the gap between creative concepts and cutting-edge machine learning pipelines.
                </p>

                <div className="flex flex-wrap gap-4 mt-2">
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-wider uppercase rounded-full text-white bg-gradient-to-r from-cyanGlow via-blueGlow to-purpleGlow shadow-lg shadow-cyanGlow/25 hover:shadow-cyanGlow/40 hover:scale-103 transition-all duration-300"
                  >
                    Let&apos;s Collaborate
                    <ArrowRight size={14} />
                  </button>
                  
                  <button
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1.5 px-5 py-3 text-xs font-bold tracking-wider uppercase rounded-full border border-obsidian-500/15 dark:border-white/10 bg-obsidian-500/5 dark:bg-white/5 text-obsidian dark:text-white hover:border-cyanGlow hover:text-cyanGlow transition-all duration-300"
                  >
                    View Portfolios
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Creative focus cards */}
              <div className="lg:col-span-1 flex flex-col justify-center gap-4 p-6 rounded-2xl border border-obsidian-500/10 dark:border-white/5 bg-obsidian-500/5 dark:bg-[#0c0c0e]/30 backdrop-blur-md">
                <div className="flex items-center gap-2 border-b border-obsidian-500/10 dark:border-white/5 pb-3">
                  <Terminal size={14} className="text-cyanGlow" />
                  <span className="font-mono text-[10px] tracking-wider text-[#a1a1aa] uppercase">
                    Execution Pipeline
                  </span>
                </div>
                
                <div className="flex flex-col gap-3.5 text-xs text-muted">
                  <div className="flex gap-2.5">
                    <span className="text-cyanGlow font-mono font-bold">01/</span>
                    <div>
                      <h5 className="font-bold text-obsidian dark:text-white">Generative Directing</h5>
                      <p className="text-[11px] leading-normal text-muted mt-0.5">Directing video engines using advanced seed control and multi-frame consistency.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="text-cyanGlow font-mono font-bold">02/</span>
                    <div>
                      <h5 className="font-bold text-obsidian dark:text-white">Fluid & VFX Plating</h5>
                      <p className="text-[11px] leading-normal text-muted mt-0.5">Creating complex fluid and scale simulations combining AI tools with timeline editing.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="text-cyanGlow font-mono font-bold">03/</span>
                    <div>
                      <h5 className="font-bold text-obsidian dark:text-white">Prompt Engineering</h5>
                      <p className="text-[11px] leading-normal text-muted mt-0.5">Custom NLP modeling to generate highly predictable camera lens outputs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ==========================================
               SNAPSHOTS COUNTERS GRID
               ========================================== */}
            <motion.section variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCounter value="50+" label="AI Visuals Engineered" />
              <StatsCounter value="10+" label="Video Productions" />
              <StatsCounter value="3+" label="Commercial Concepts" />
              <StatsCounter value="60" label="Cinematic Framerate FPS" />
            </motion.section>

            {/* ==========================================
               TECH STACK SECTION
               ========================================== */}
            <motion.section 
              variants={itemVariants}
              ref={techCardRef}
              onMouseMove={(e) => handleMouseMoveSpotlight(e, techCardRef)}
              className="spotlight-card flex flex-col md:flex-row items-center justify-between p-8 gap-8 border border-obsidian-500/10 dark:border-white/5 bg-white/70 dark:bg-[#09090b]/55"
            >
              <div className="flex flex-col gap-2 max-w-sm">
                <div className="flex items-center gap-2">
                  <Code2 size={15} className="text-cyanGlow" />
                  <span className="font-mono text-xs tracking-wider text-muted uppercase">
                    AI & Creative Tools
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-obsidian dark:text-white">
                  The Tech-Art Pipeline
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Combining modern AI video engines and LLMs with traditional editing software and front-end development tools.
                </p>
              </div>

              {/* Tags grid */}
              <div className="flex flex-wrap gap-2.5 max-w-lg justify-center md:justify-end">
                {['Kling AI', 'Luma Dream Machine', 'Midjourney', 'Canva', 'CapCut', 'ChatGPT', 'Gemini', 'Claude', 'HTML/CSS/JS', 'Next.js', 'WebGL', 'Three.js'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-xs font-semibold rounded-full border border-obsidian-500/10 dark:border-white/5 bg-obsidian-500/5 dark:bg-[#0d0d0e]/40 text-obsidian dark:text-white hover:border-[#00f2fe]/40 hover:text-cyanGlow transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* ==========================================
               CASE STUDIES / WORK SECTION
               ========================================== */}
            <section id="work" className="flex flex-col gap-8 py-10">
              
              {/* Grid Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Film size={15} className="text-cyanGlow" />
                    <span className="font-mono text-xs tracking-widest text-[#a1a1aa] uppercase">
                      Cinematic Portfolio
                    </span>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-obsidian dark:text-white">
                    Featured Case Studies
                  </h2>
                </div>

                {/* Filter buttons */}
                <div className="flex gap-2">
                  {(['all', 'commercial', 'storytelling'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                        filter === cat
                          ? 'bg-gradient-to-r from-cyanGlow to-blueGlow text-white shadow-lg shadow-cyanGlow/25'
                          : 'border border-obsidian-500/10 dark:border-white/5 bg-obsidian-500/5 dark:bg-white/5 text-muted hover:border-cyanGlow/30 hover:text-cyanGlow'
                      }`}
                    >
                      {cat === 'all' ? 'All Work' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                {filteredProjects.map((project) => {
                  // Make Kaal Bhairav, Titanfall, and The Order larger bento cards (col-span-2)
                  const isLarge = project.slug === 'titan-clash' || project.slug === 'the-order' || project.slug === 'kaal-bhairav';
                  return (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      className={isLarge ? 'col-span-1 md:col-span-2' : 'col-span-1'}
                    />
                  );
                })}
              </div>

            </section>

            {/* ==========================================
               MASONRY GRAPHIC GALLERY
               ========================================== */}
            <MasonryGallery onSelectMedia={handleSelectMedia} />

            {/* ==========================================
               ABOUT TIMELINE SECTION
               ========================================== */}
            <section id="about" className="py-16 border-t border-obsidian-500/10 dark:border-white/5 flex flex-col gap-10">
              
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs tracking-widest text-[#a1a1aa] uppercase">
                  BACKGROUND & PATH
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-obsidian dark:text-white">
                  Creative Direction Timeline
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-4 relative">
                
                {/* Visual Timeline vertical line */}
                <div className="hidden lg:block absolute left-[33%] top-4 bottom-4 w-[1px] bg-obsidian-500/10 dark:bg-white/5" />

                {/* Card 1 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyanGlow/10 text-cyanGlow">
                      2025 - PRESENT
                    </span>
                    <span className="text-[10px] font-mono tracking-wide text-muted">AI PRODUCTION</span>
                  </div>
                  <h4 className="text-lg font-bold text-obsidian dark:text-white">Creative AI Architect</h4>
                  <p className="text-xs leading-relaxed text-muted">
                    Directing cinematic campaigns, commercial ads, and short-form storytelling reels using Stable Diffusion, Kling AI, and Midjourney. Building automated scripts to solve character face consistency and fluid physics generation.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyanGlow/10 text-cyanGlow">
                      2024 - 2025
                    </span>
                    <span className="text-[10px] font-mono tracking-wide text-muted">MOTION DESIGN</span>
                  </div>
                  <h4 className="text-lg font-bold text-obsidian dark:text-white">Visual Journalist & HUD Editor</h4>
                  <p className="text-xs leading-relaxed text-muted">
                    Engineered GIS map HUD designs and geopolitics animation overlays for digital news networks. Developed high-density vector layout models explaining border dynamics and infrastructure developments.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyanGlow/10 text-cyanGlow">
                      2023 - 2024
                    </span>
                    <span className="text-[10px] font-mono tracking-wide text-muted">COMMERCIALS</span>
                  </div>
                  <h4 className="text-lg font-bold text-obsidian dark:text-white">Product Advertising Director</h4>
                  <p className="text-xs leading-relaxed text-muted">
                    Directed apparel, tea brands, and car wash CGI campaigns. Specialized in micro-narratives, product integration sequences, emotional visual pacing, and high-conversion content frameworks.
                  </p>
                </div>

              </div>

            </section>

            {/* ==========================================
               CONTACT & FOOTER
               ========================================== */}
            <motion.section 
              variants={itemVariants}
              id="contact"
              ref={contactCardRef}
              onMouseMove={(e) => handleMouseMoveSpotlight(e, contactCardRef)}
              className="spotlight-card p-8 md:p-12 border border-obsidian-500/10 dark:border-white/5 bg-gradient-to-br from-white/70 to-white/50 dark:from-[#09090b]/55 dark:to-[#0c0c0e]/30 flex flex-col lg:flex-row items-center justify-between gap-8 mt-10"
            >
              <div className="flex flex-col gap-4 max-w-xl">
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-cyanGlow" />
                  <span className="font-mono text-xs tracking-wider text-muted uppercase">
                    COLLABORATION
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight text-obsidian dark:text-white">
                  Available for Commercial Projects
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  Let&apos;s craft the future of visual content. I can help establish your AI creative strategy, direct promotional videos, engineer custom prompts, or implement interactive web experiences.
                </p>
              </div>

              {/* Contact Button Group */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">
                <a
                  href="mailto:vgaur2003@gmail.com"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyanGlow via-blueGlow to-purpleGlow hover:scale-103 shadow-lg shadow-cyanGlow/25 transition-all duration-300 w-full sm:w-auto text-center"
                >
                  <Mail size={14} />
                  Email Me
                </a>
                
                <a
                  href="https://www.linkedin.com/in/varungaur777/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-obsidian-500/15 dark:border-white/10 bg-obsidian-500/5 dark:bg-white/5 text-obsidian dark:text-white hover:border-cyanGlow hover:text-cyanGlow transition-all duration-300 w-full sm:w-auto text-center"
                >
                  LinkedIn
                </a>
                
                <a
                  href="https://github.com/varungaur777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-obsidian-500/15 dark:border-white/10 bg-obsidian-500/5 dark:bg-white/5 text-obsidian dark:text-white hover:border-cyanGlow hover:text-cyanGlow transition-all duration-300 w-full sm:w-auto text-center"
                >
                  GitHub
                </a>
                
                <a
                  href="https://wa.me/919899380254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-obsidian-500/15 dark:border-white/10 bg-obsidian-500/5 dark:bg-white/5 text-obsidian dark:text-white hover:border-cyanGlow hover:text-cyanGlow transition-all duration-300 w-full sm:w-auto text-center"
                >
                  WhatsApp
                </a>
              </div>
            </motion.section>

            {/* Bottom Credits */}
            <footer className="w-full text-center text-xs font-mono text-muted py-6 border-t border-obsidian-500/5 dark:border-white/5 mt-10">
              <div>© {new Date().getFullYear()} VARUN GAUR. BUILT WITH NEXT.JS, WEBGL & GSAP.</div>
            </footer>

            {/* Global Lightbox Modal */}
            <Lightbox
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
              mediaType={lightboxMedia.type}
              mediaSrc={lightboxMedia.src}
              title={lightboxMedia.title}
            />

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
