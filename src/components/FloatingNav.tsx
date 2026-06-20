'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon, Mail } from 'lucide-react';

export default function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('work');

  // Track scroll direction to hide/reveal nav bar
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // Hide on scroll down
    } else {
      setHidden(false); // Reveal on scroll up
    }
  });

  // Dark/Light Mode toggle helper
  useEffect(() => {
    // Read theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    setIsDarkMode(!isLight);
    
    if (isLight) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Monitor active sections on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'artwork', 'about', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', target: 'work' },
    { label: 'Artwork', target: 'artwork' },
    { label: 'About', target: 'about' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full"
    >
      <div className="flex items-center justify-between w-full max-w-4xl px-4 py-2.5 rounded-full border border-obsidian-500/10 dark:border-white/5 bg-white/70 dark:bg-[#09090b]/60 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20">
        
        {/* Brand/Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group text-sm font-extrabold tracking-tight text-obsidian dark:text-white"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-cyanGlow to-purpleGlow text-white text-xs font-mono font-black shadow-md shadow-cyanGlow/20">
            VG
          </div>
          <span className="hidden sm:inline-block font-sans group-hover:text-cyanGlow transition-colors duration-300">
            Varun Gaur
          </span>
        </button>

        {/* Nav Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className={`relative px-3 py-1.5 text-xs font-medium tracking-wide rounded-full transition-all duration-300 ${
                activeSection === item.target
                  ? 'text-obsidian dark:text-white'
                  : 'text-obsidian/60 dark:text-white/50 hover:text-obsidian dark:hover:text-white'
              }`}
            >
              {activeSection === item.target && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-obsidian-500/5 dark:bg-white/5 border border-obsidian-500/10 dark:border-white/10 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 font-sans">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Actions (Email + Theme Toggle) */}
        <div className="flex items-center gap-2">
          <a
            href="mailto:vgaur2003@gmail.com"
            className="flex items-center justify-center p-2 rounded-full border border-obsidian-500/15 dark:border-white/10 bg-obsidian-500/5 dark:bg-white/5 text-obsidian dark:text-white hover:text-cyanGlow dark:hover:text-cyanGlow hover:border-cyanGlow dark:hover:border-cyanGlow hover:scale-105 transition-all duration-300"
            title="Let's Collaborate"
          >
            <Mail size={15} />
          </a>
          
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full border border-obsidian-500/15 dark:border-white/10 bg-obsidian-500/5 dark:bg-white/5 text-obsidian dark:text-white hover:text-cyanGlow dark:hover:text-cyanGlow hover:border-cyanGlow dark:hover:border-cyanGlow hover:scale-105 transition-all duration-300"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

      </div>
    </motion.header>
  );
}
