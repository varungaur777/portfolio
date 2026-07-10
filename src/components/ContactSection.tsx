'use client';

import { Mail, Phone, MapPin, ArrowUpRight, Sparkles, Globe } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-20">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#09090b]/90 to-[#050505] p-8 md:p-14 backdrop-blur-2xl shadow-2xl">
        {/* Glow ambient */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyanGlow/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purpleGlow/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-10">
          {/* Top Section: Title & Intro */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
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

            {/* Primary Email CTA */}
            <a
              href="mailto:vgaur2003@gmail.com"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyanGlow via-blueGlow to-purpleGlow px-8 py-5 text-xs font-bold uppercase tracking-wider text-black shadow-xl shadow-cyanGlow/20 hover:scale-105 transition-all duration-300 shrink-0"
            >
              <Mail className="h-4 w-4" />
              <span>vgaur2003@gmail.com</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

          {/* Bottom Grid: Phone, Location, Social & Professional Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Phone Number */}
            <a
              href="tel:+919899380254"
              className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#09090b]/60 p-4 hover:border-cyanGlow/40 transition-all duration-300"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyanGlow/10 text-cyanGlow">
                <Phone className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Direct / WhatsApp</span>
                <span className="text-sm font-bold text-white tracking-tight">+91 9899380254</span>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#09090b]/60 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purpleGlow/10 text-purpleGlow">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Base Location</span>
                <span className="text-sm font-bold text-white tracking-tight">New Delhi, India</span>
              </div>
            </div>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/varungaur777"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#09090b]/60 p-4 hover:border-cyanGlow/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blueGlow/10 text-blueGlow">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Professional Profile</span>
                  <span className="text-sm font-bold text-white tracking-tight">LinkedIn</span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-cyanGlow transition-colors" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/varungaur777"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#09090b]/60 p-4 hover:border-cyanGlow/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Code & Repositories</span>
                  <span className="text-sm font-bold text-white tracking-tight">GitHub Profile</span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-cyanGlow transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
