'use client';

import { useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import { posters } from '@/data/projects';

interface MasonryGalleryProps {
  onSelectMedia: (type: 'image' | 'video', src: string, title: string) => void;
}

export default function MasonryGallery({ onSelectMedia }: MasonryGalleryProps) {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Mouse spotlight tracker
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, id: string) => {
    const card = cardRefs.current[id];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="artwork" className="w-full flex flex-col gap-8 py-16 border-t border-obsidian-500/10 dark:border-white/5">
      
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyanGlow" />
          <span className="font-mono text-xs tracking-widest text-[#a1a1aa] uppercase">
            Visual Design
          </span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-obsidian dark:text-white">
          Concept Artwork & Posters
        </h2>
      </div>

      {/* Masonry Columns Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] w-full mt-4">
        <AnimatePresence mode="popLayout">
          {posters.map((poster) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              key={poster.id}
              ref={el => { cardRefs.current[poster.id] = el; }}
              onMouseMove={(e) => handleMouseMove(e, poster.id)}
              onClick={() => onSelectMedia('image', poster.imageSrc, poster.title)}
              data-cursor-playable="true"
              data-cursor-label="ZOOM"
              className="spotlight-card mb-6 break-inside-avoid flex flex-col group cursor-pointer border border-obsidian-500/10 dark:border-white/5 bg-white/70 dark:bg-[#09090b]/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              
              {/* Image Box */}
              <div className="relative overflow-hidden w-full rounded-t-2xl aspect-auto bg-black/10">
                <Image
                  src={poster.imageSrc}
                  alt={poster.title}
                  width={600}
                  height={800}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-smooth group-hover:scale-102"
                />

                {/* Hover overlay icons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 pointer-events-none">
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-black/60 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Eye size={16} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Poster info block */}
              <div className="p-5 flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyanGlow uppercase">
                  {poster.category}
                </span>
                <h4 className="text-sm font-bold text-obsidian dark:text-white group-hover:text-cyanGlow transition-colors duration-300">
                  {poster.title}
                </h4>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}
