'use client';

import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';

interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  description: string;
  highlights: string[];
}

const timelineData: TimelineItem[] = [
  {
    period: '2023 — PRESENT',
    role: 'AI Creative Director & Technologist',
    organization: 'Independent Creative & Commercial Campaigns',
    description: 'Directing high-impact AI generative commercials, cinematic narrative trailers, and brand campaigns using multi-modal AI and custom 3D pipelines.',
    highlights: [
      'Engineered Titan Clash & Kaal Bhairav cinematic AI worlds',
      'Integrated Kling AI, Luma Dream Machine, and Midjourney v6 pipelines',
      'Delivered commercial ads for Eastem, Ladakh Tourism & Apparel Brands',
    ],
  },
  {
    period: '2021 — 2023',
    role: 'Creative Visual Director & VFX Lead',
    organization: 'Commercial & Digital Media Production',
    description: 'Spearheaded end-to-end visual identity, motion graphics, and post-production color grading for high-visibility client brands.',
    highlights: [
      'Led multidisciplinary creative teams across video & print media',
      'Developed fluid dynamic plating and visual simulation workflows',
    ],
  },
  {
    period: '2019 — 2021',
    role: 'Visual Journalist & Storyteller',
    organization: 'Digital Editorial & Documentary Production',
    description: 'Crafted compelling narrative video stories and documentary photography exploring heritage, culture, and modern lifestyle.',
    highlights: [
      'Created award-winning Indian Railways Heritage series',
      'Pioneered interactive storytelling formats for web & social channels',
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
            Career Evolution
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Creative Leadership & Milestones
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl">
          A track record of leading visual innovation—from traditional documentary storytelling to state-of-the-art generative AI film direction.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-white/[0.1] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
        {timelineData.map((item, idx) => (
          <motion.div
            key={item.period}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#09090b] border-2 border-cyanGlow group-hover:scale-125 transition-transform duration-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyanGlow animate-pulse" />
            </span>

            <div className="rounded-2xl border border-white/[0.08] bg-[#09090b]/60 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 group-hover:border-white/[0.16] shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-cyanGlow uppercase tracking-wider">
                  {item.period}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {item.organization}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                {item.role}
              </h3>

              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-2">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-2.5 text-xs text-zinc-300">
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
