'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Case Studies', href: '#work' },
    { name: 'Concept Art', href: '#artwork' },
    { name: 'Career Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-full border transition-all duration-500 ${
          scrolled
            ? 'border-black/[0.1] dark:border-white/[0.12] bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-2xl shadow-2xl shadow-black/10 dark:shadow-black/40'
            : 'border-black/[0.06] dark:border-white/[0.08] bg-white/60 dark:bg-[#09090b]/50 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20'
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-105"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-cyanGlow via-blueGlow to-purpleGlow p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-[#09090b]">
              <span className="font-mono text-xs font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyanGlow to-purpleGlow">
                VG
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-sm font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyanGlow transition-colors duration-300">
              Varun Gaur
            </span>
            <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-widest text-slate-500 dark:text-zinc-400">
              AI Creative Director
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.03] dark:bg-white/[0.03] px-3 py-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-zinc-400 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-3">
          {/* Availability Status Badge */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
              Available
            </span>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] text-slate-700 dark:text-zinc-300 hover:text-cyanGlow hover:border-cyanGlow/40 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          {/* Let's Talk CTA */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyanGlow via-blueGlow to-purpleGlow px-4 py-2 text-xs font-bold text-black uppercase tracking-wider shadow-lg shadow-cyanGlow/20 hover:shadow-cyanGlow/40 hover:scale-105 transition-all duration-300"
          >
            <span>Collaborate</span>
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
