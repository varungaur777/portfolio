'use client';

import { useRef, useState, MouseEvent } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Intelligent Preloading: Only mount video streaming when within 200px of viewport
  const isInView = useInView(cardRef, {
    once: false,
    margin: '200px 0px 200px 0px',
  });

  // Mouse spotlight tracker
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Hover-to-Play video stream handler
  const handleMouseEnter = () => {
    setIsPlaying(true);
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Silently catch autoplay policies
      });
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };

  const normalizedVideoSrc = project.videoSrc.startsWith('/') ? project.videoSrc : `/${project.videoSrc}`;

  return (
    <Link href={`/projects/${project.slug}`} className={`block group ${className}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor-playable="true"
        data-cursor-label="VIEW CASE"
        className="spotlight-card h-full flex flex-col justify-between p-6 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyanGlow/5"
      >
        {/* Media Container */}
        <div className={
          project.slug === 'kaal-bhairav'
            ? "relative w-full max-w-[280px] aspect-[9/16] mx-auto rounded-xl overflow-hidden border border-obsidian-500/10 dark:border-white/5 bg-black/40"
            : project.aspect === 'portrait'
            ? "relative w-full aspect-[9/16] rounded-xl overflow-hidden border border-obsidian-500/10 dark:border-white/5 bg-black/40"
            : "relative w-full aspect-video rounded-xl overflow-hidden border border-obsidian-500/10 dark:border-white/5 bg-black/40"
        }>
          {/* Render Video Player only when near viewport to conserve browser memory & prevent tab crash */}
          {isInView ? (
            <video
              ref={videoRef}
              src={normalizedVideoSrc}
              loop
              muted
              playsInline
              preload="none"
              className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            />
          ) : (
            /* Fallback placeholder while out of viewport */
            <div className="w-full h-full bg-black/40 animate-pulse" />
          )}
          
          {/* Visual Overlays */}
          <div className="video-overlay absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            {/* Play Button Glow */}
            <div className={`w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center transition-all duration-500 ease-smooth ${
              isPlaying ? 'opacity-0 scale-90' : 'opacity-0 group-hover:opacity-100 group-hover:scale-110'
            }`}>
              <Play size={16} fill="white" className="text-white ml-0.5" />
            </div>
          </div>
          
          {/* Top Tag */}
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-black/60 dark:bg-[#050505]/70 text-white border border-white/10">
            {project.category}
          </div>
        </div>

        {/* Text Details */}
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight text-obsidian dark:text-white group-hover:text-cyanGlow transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono font-semibold tracking-wider text-obsidian/40 dark:text-white/30 uppercase">
              {project.details.duration}
            </span>
          </div>
          
          <p className="text-xs leading-relaxed text-muted line-clamp-2">
            {project.description}
          </p>

          {/* Tags Chips */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[9px] font-mono font-semibold tracking-wider rounded-md border border-obsidian-500/5 dark:border-white/5 bg-obsidian-500/5 dark:bg-white/5 text-muted hover:border-cyanGlow/25 hover:text-cyanGlow transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </Link>
  );
}
