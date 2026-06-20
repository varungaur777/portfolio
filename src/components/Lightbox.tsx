'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaType: 'image' | 'video' | null;
  mediaSrc: string;
  title: string;
}

export default function Lightbox({ isOpen, onClose, mediaType, mediaSrc, title }: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Stop background scrolling
      document.documentElement.classList.add('lenis-stopped');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-obsidian/95 dark:bg-black/95 backdrop-blur-md"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white hover:text-cyanGlow transition-colors duration-300 z-[10001] hover:scale-105"
          >
            <X size={20} />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex flex-col justify-between"
          >
            
            {/* Immersive Media Renderer */}
            <div className="relative flex-grow flex items-center justify-center overflow-hidden aspect-video bg-black">
              {mediaType === 'image' && (
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={mediaSrc}
                  alt={title}
                  className="max-w-full max-h-[75vh] object-contain select-none"
                />
              )}

              {mediaType === 'video' && (
                <video
                  ref={videoRef}
                  src={mediaSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Bottom Title Bar */}
            <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent border-t border-white/5 flex items-center justify-between text-white">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono tracking-widest text-[#a1a1aa] uppercase">
                  VIEWING MEDIA
                </span>
                <h4 className="text-sm font-semibold tracking-tight">
                  {title}
                </h4>
              </div>
              
              {mediaType === 'video' && (
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:text-cyanGlow text-xs transition-colors duration-300"
                >
                  <RotateCcw size={12} />
                  Replay
                </button>
              )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
