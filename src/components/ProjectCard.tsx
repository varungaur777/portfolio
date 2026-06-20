'use client';

import { useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Video hover controller
  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Handle auto-play blockers gracefully
      });
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      // Keep it simple, or reset it
      // video.currentTime = 0;
    }
  };

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
          <video
            ref={videoRef}
            src={project.videoSrc}
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
          />
          
          {/* Visual Overlays */}
          <div className="video-overlay absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            {/* Play Button Glow */}
            <div className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-smooth">
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
