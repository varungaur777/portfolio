'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { posters, PosterArt } from '@/data/projects';
import { Sparkles, ZoomIn } from 'lucide-react';
import Lightbox from '@/components/Lightbox';

export default function ArtworkMasonry() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<{
    src: string;
    title: string;
  } | null>(null);

  const handleOpenPoster = (poster: PosterArt) => {
    setSelectedPoster({ src: poster.imageSrc, title: poster.title });
    setLightboxOpen(true);
  };

  return (
    <section id="artwork" className="relative w-full py-16">
      {/* Section Header */}
      <div className="flex flex-col gap-3 mb-12">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyanGlow" />
          <span className="font-mono text-xs font-bold tracking-widest text-cyanGlow uppercase">
            Visual Exploration & Concept Art
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          AI Concept Posters & Editorial Art
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl">
          Curated visual experiments combining prompt architecture, typography, and atmospheric lighting design.
        </p>
      </div>

      {/* Responsive Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {posters.map((poster, idx) => (
          <motion.div
            key={poster.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            onClick={() => handleOpenPoster(poster)}
            className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.08] bg-[#09090b]/60 cursor-pointer shadow-lg transition-all duration-300 hover:border-cyanGlow/40 hover:shadow-2xl hover:shadow-cyanGlow/10"
          >
            <div className="relative w-full overflow-hidden">
              <Image
                src={poster.imageSrc}
                alt={poster.title}
                width={800}
                height={1000}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white tracking-tight">
                    {poster.title}
                  </span>
                  <ZoomIn className="h-4 w-4 text-cyanGlow" />
                </div>
                <span className="text-[10px] font-mono text-cyanGlow uppercase tracking-widest mt-1">
                  {poster.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPoster && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          mediaType="image"
          mediaSrc={selectedPoster.src}
          title={selectedPoster.title}
        />
      )}
    </section>
  );
}
