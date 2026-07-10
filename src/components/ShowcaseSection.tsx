'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import { Layers } from 'lucide-react';

export default function ShowcaseSection() {
  const [filter, setFilter] = useState<'all' | 'commercial' | 'storytelling'>('all');

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((proj) => proj.category === filter);

  const filterTabs = [
    { id: 'all', label: 'All Case Studies' },
    { id: 'commercial', label: 'Commercial Campaigns' },
    { id: 'storytelling', label: 'AI Visual Storytelling' },
  ] as const;

  return (
    <section id="work" className="relative w-full py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyanGlow" />
            <span className="font-mono text-xs font-bold tracking-widest text-cyanGlow uppercase">
              Featured Case Studies
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Cinematic AI & Commercial Work
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-xl">
            Explore interactive breakdowns of generative directing pipelines, multi-frame CGI consistency, and high-conversion commercial productions.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl w-fit">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-slate-900 dark:text-white shadow-md'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyanGlow/20 via-blueGlow/20 to-purpleGlow/20 border border-cyanGlow/40"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Bento Grid Showcase */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => {
            // Give hero projects wider bento span on desktop
            const isHeroCard = index === 0 && filter === 'all';
            return (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={isHeroCard ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <ProjectCard project={project} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
