'use client';

import { Mail, ArrowUpRight, Sparkles, Globe } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-20">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#09090b]/80 to-[#050505] p-8 md:p-14 backdrop-blur-2xl shadow-2xl">
        {/* Glow ambient */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyanGlow/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purpleGlow/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 w-fit rounded-full border border-cyanGlow/30 bg-cyanGlow/10 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-cyanGlow" />
              <span className="font-mono text-[10px] font-bold tracking-widest text-cyanGlow uppercase">
                Let&apos;s Build Together
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to create something visually extraordinary?
            </h2>

            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              Whether you need cinematic AI campaigns, generative commercials, creative direction, or cutting-edge visual storytelling pipelines—let&apos;s connect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            <a
              href="mailto:varungaur@example.com"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyanGlow via-blueGlow to-purpleGlow px-8 py-4 text-xs font-bold uppercase tracking-wider text-black shadow-xl shadow-cyanGlow/20 hover:scale-105 transition-all duration-300"
            >
              <Mail className="h-4 w-4" />
              <span>Send an Email</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white hover:border-cyanGlow/50 hover:text-cyanGlow transition-all duration-300"
            >
              <Globe className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
