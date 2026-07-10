'use client';

import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';

interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  type: string;
  description: string;
  highlights: string[];
}

const timelineData: TimelineItem[] = [
  {
    period: 'Nov 2025 — Present',
    role: 'AI Graphics & Research Analyst',
    organization: 'ISN Report (isn.report)',
    type: 'Part-Time',
    description: 'Produced AI-generated graphics and visual assets for an Instagram-based news and geopolitical analysis platform covering strategic affairs.',
    highlights: [
      'Conducted research and analysis to develop visually compelling infographics and explainer content',
      'Maintained consistent visual identity and brand coherence across regular content output',
    ],
  },
  {
    period: 'Nov 2025 — Present',
    role: 'AI Content Creator & Visual Designer',
    organization: 'Independent / Freelance',
    type: 'Freelance',
    description: 'Produced 10+ AI video projects across 3 commercial concepts — brand films, product demos, and cinematic reels — totalling 50+ AI-generated visuals.',
    highlights: [
      'Built an end-to-end AI production pipeline using Kling AI, Runway, Midjourney, Luma Dream Machine & HeyGen',
      'Handled complete post-production workflow: clip merging, music syncing, voiceover integration, and final cut delivery via CapCut',
      'Demonstrated character consistency and brand continuity across multi-scene commercial productions (Panda Tea, Foam Wash, T-Shirt Campaign)',
    ],
  },
  {
    period: 'May 2025 — Jan 2026',
    role: 'AI Graphic Designer',
    organization: 'RK Divine Creation',
    type: 'Part-Time',
    description: 'Designed AI-generated posters, promotional creatives, and social media graphics tailored to brand identity.',
    highlights: [
      'Utilized Midjourney and AI image generation tools to produce high-quality visual content for campaigns',
      'Delivered consistent creative output across multiple promotional and marketing briefs',
    ],
  },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative w-full py-16">
      {/* Section Header */}
      <div className="flex flex-col gap-3 mb-12">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-purpleGlow" />
          <span className="font-mono text-xs font-bold tracking-widest text-purpleGlow uppercase">
            Professional Experience
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Career Experience & Milestones
        </h2>
        <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-xl">
          AI-driven content creator with 1+ year of experience across freelance and part-time roles, producing 10+ video projects and 50+ AI visuals.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-black/[0.1] dark:border-white/[0.1] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
        {timelineData.map((item, idx) => (
          <motion.div
            key={`${item.role}-${item.period}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-[#09090b] border-2 border-cyanGlow group-hover:scale-125 transition-transform duration-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyanGlow animate-pulse" />
            </span>

            <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#09090b]/60 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 group-hover:border-black/[0.15] dark:group-hover:border-white/[0.16] shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-cyanGlow uppercase tracking-wider">
                  {item.period}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-600 dark:text-zinc-400">
                    {item.organization}
                  </span>
                  <span className="rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.04] dark:bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-slate-700 dark:text-zinc-300 uppercase">
                    {item.type}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {item.role}
              </h3>

              <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] space-y-2">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
