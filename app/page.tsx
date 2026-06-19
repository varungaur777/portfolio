"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToolMarquee } from "@/components/ToolMarquee";
import { Play, Mail, Linkedin, Github, MessageCircle } from "lucide-react";
import WelcomeScreen from "@/components/WelcomeScreen";
import dynamic from "next/dynamic";
import GlassCard from "@/components/GlassCard";


const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950/20 text-muted-foreground text-xs animate-pulse">
      Loading 3D Experience...
    </div>
  ),
});

// Project Type Definition
interface Project {
  id: string;
  title: string;
  description: string;
  category: "storytelling" | "commercial";
  src: string;
  driveLink?: string;
  type: "hero" | "large" | "small" | "portrait";
  centered?: boolean;
  inlineControls?: boolean;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Smooth fade out of preloader
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 1200);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const projects: Project[] = [
    {
      id: "kaal-bhairav",
      title: "Kaal Bhairav — Cinematic Reel",
      description: "A breathtaking cinematic visual exploration of Kashi and Kaal Bhairav, showcasing advanced generative AI workflows and cultural storytelling.",
      category: "storytelling",
      src: "videos/kashi1.mp4.mp4",
      driveLink: "https://drive.google.com/file/d/1DeslFGFF00MsmBrw0aKSaaVgDDN6jDsr/view?usp=drive_link",
      type: "hero",
      centered: true,
    },
    {
      id: "titan-clash",
      title: "Titan Clash — AI Cinematic Sequence",
      description: "Cinematic AI action sequence focused on scale, visual storytelling, dynamic camera movement, and scene composition.",
      category: "storytelling",
      src: "videos/titan-clash-trailer.mp4",
      driveLink: "https://drive.google.com/file/d/1hmA-o8mDNyzsM_-8Ih-Q2HREmGqyNvKM/view?usp=sharing",
      type: "hero",
    },
    {
      id: "the-order",
      title: "The Order — Cinematic Brand Film",
      description: "A cinematic commercial following an entrepreneur's journey from a single order to global scale. Created to demonstrate storytelling, emotional pacing, and AI-assisted production workflows.",
      category: "storytelling",
      src: "videos/the-order-trailer.mp4",
      driveLink: "https://drive.google.com/file/d/1QdHfLfOM9P27specZkviMKcz7zdpgq8T/view?usp=sharing",
      type: "large",
    },
    {
      id: "ladakh",
      title: "The New Ladakh Model",
      description: "Motion graphics and visual explainer content created for a digital media platform covering geopolitics and strategic affairs.",
      category: "storytelling",
      src: "videos/ladakh.mp4",
      type: "small",
      inlineControls: true,
    },
    {
      id: "eastem",
      title: "Eastem Commercial",
      description: "Dynamic visual showcase created with AI video workflows.",
      category: "commercial",
      src: "videos/eastem.mp4",
      driveLink: "https://drive.google.com/file/d/1WLpY1Vyb4AgUncxZFtUemXDMonKXqpVe/view?usp=drive_link",
      type: "portrait",
    },
    {
      id: "foam-wash",
      title: "Foam Wash",
      description: "Product demonstration featuring high-quality AI-generated visuals.",
      category: "commercial",
      src: "videos/foam-wash.mp4",
      driveLink: "https://drive.google.com/file/d/1e-uSggAd3hU91EiUcfyYZtKRWJIV-j1R/view?usp=drive_link",
      type: "portrait",
    },
    {
      id: "t-shirt",
      title: "T-Shirt Campaign",
      description: "Stylized promotional content demonstrating clothing and brand aesthetics.",
      category: "commercial",
      src: "videos/T-shirt.mp4",
      driveLink: "https://drive.google.com/file/d/13zaIHF_R3LaUGnszT91NprsLRvKN3pWa/view?usp=drive_link",
      type: "portrait",
    },
    {
      id: "panda-tea",
      title: "Panda Tea Commercial",
      description: "Stylized product advertisement showcasing character consistency, commercial storytelling, and AI-assisted production.",
      category: "commercial",
      src: "videos/panda-tea.mp4",
      type: "portrait",
      inlineControls: true,
    },
  ];

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-[1280px] mx-auto relative overflow-hidden">
      {/* Cinematic Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <WelcomeScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/30 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center shadow-[0_0_15px_rgba(123,44,191,0.2)]">
            <span className="text-sm font-black tracking-widest text-primary glow-effect">VG</span>
          </div>
          <span className="text-sm font-bold tracking-wider text-white uppercase hidden sm:inline-block">
            Varun Gaur
          </span>
        </div>
        <div>
          <button
            onClick={scrollToContact}
            className="px-5 py-2 bg-primary/10 hover:bg-primary/20 text-primary hover:text-white font-semibold text-sm rounded-full border border-primary/20 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Get In Touch
          </button>
        </div>
      </header>

      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10 pointer-events-none" />

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* HERO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="col-span-1 md:col-span-2 lg:col-span-4"
        >
          <GlassCard className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[400px]" tiltEnabled={false}>
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-gradient glow-effect glitch-text select-none uppercase">
                Varun Gaur
              </h1>
              <h2 className="text-lg md:text-2xl text-primary font-bold tracking-wider mb-6">
                AI Video Creator & Visual Storyteller
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                AI Video Creator specializing in cinematic storytelling, generative AI workflows, commercial advertisements, and creative content production. Transforming ideas into engaging visual experiences through AI-powered creative pipelines.
              </p>
              <button
                onClick={scrollToContact}
                className="w-fit px-6 py-3 bg-primary hover:bg-primary-foreground/10 text-white font-semibold text-sm rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20"
              >
                Let's Collaborate
              </button>
            </div>
            <div className="w-full h-[350px] lg:h-[450px] relative flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-950/20 border border-white/5 shadow-inner">
              <Lanyard />
            </div>
          </GlassCard>
        </motion.div>

        {/* TECH STACK CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="col-span-1 md:col-span-2 lg:col-span-4"
        >
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold tracking-tight mb-4">The AI & Creative Stack</h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Experienced with modern AI video, image generation, editing, and content creation tools.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Kling AI", "Seedance", "CapCut", "Canva", "ChatGPT", "Gemini", "Claude", "HTML/CSS/JS"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-xs font-medium text-white/70 border border-white/5 bg-white/5 rounded-full backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* SNAPSHOT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-span-1 md:col-span-2 lg:col-span-4"
        >
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold tracking-tight mb-6">Portfolio Snapshot</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { val: "50+", desc: "AI Visuals" },
                { val: "10+", desc: "Video Projects" },
                { val: "3", desc: "Commercial Concepts" },
                { val: "AI", desc: "Storytelling" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 border border-white/5 bg-white/5 rounded-2xl">
                  <div className="text-3xl font-black text-primary mb-1 glow-effect">{stat.val}</div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.desc}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* FILTER BAR */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center my-6">
          <div className="flex p-1.5 bg-white/[0.04] backdrop-blur-[20px] border border-white/[0.08] rounded-2xl relative shadow-lg shadow-black/20">
            {[
              { id: "all", label: "All Work" },
              { id: "commercial", label: "Commercial" },
              { id: "storytelling", label: "Storytelling" },
            ].map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm relative transition-colors duration-300 z-10 whitespace-nowrap ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg shadow-primary/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* PROJECT ITEMS */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`${
                  project.type === "hero"
                    ? "col-span-1 md:col-span-2 lg:col-span-4"
                    : "col-span-1 md:col-span-1 lg:col-span-2"
                }`}
              >
                <GlassCard className="h-full p-6 flex flex-col justify-between" tiltEnabled={project.type !== "hero"}>
                  {/* Media Section */}
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-neutral-950 mb-6 group/vid w-full ${
                      project.type === "portrait" ? "aspect-[9/16]" : "aspect-video"
                    }`}
                    style={project.centered ? { maxWidth: "320px", margin: "0 auto" } : {}}
                  >
                    <video
                      src={project.src}
                      className="w-full h-full object-cover rounded-2xl"
                      autoPlay={!project.inlineControls}
                      loop={!project.inlineControls}
                      muted={!project.inlineControls}
                      playsInline
                      controls={project.inlineControls}
                      preload="metadata"
                    />

                    {/* Overlay Drive button for loops */}
                    {project.driveLink && (
                      <a
                        href={project.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary text-white font-semibold py-2.5 px-5 rounded-full flex items-center gap-2 border border-primary/20 shadow-lg scale-90 md:scale-100 opacity-0 group-hover/vid:opacity-100 group-hover/vid:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm z-10 whitespace-nowrap"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        Watch Full Video
                      </a>
                    )}
                  </div>

                  {/* Title & Desc */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight mb-2 text-white/90">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-primary border border-primary/20 bg-primary/5 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* CONTACT FOOTER */}
        <div id="contact" className="col-span-1 md:col-span-2 lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 text-center" tiltEnabled={false}>
              <h2 className="text-3xl font-extrabold tracking-tight mb-4">
                Available for Creative Collaborations
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed mb-8">
                Specializing in AI video production, brand storytelling, visual campaigns, social media content, and creative concept development.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:vgaur2003@gmail.com"
                  className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  Email Me
                </a>

                <a
                  href="https://www.linkedin.com/in/varungaur777/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>

                <a
                  href="https://github.com/varungaur777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>

                <a
                  href="https://wa.me/919899380254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>

      </div>

      {/* Scrolling Tool Marquee upgrade */}
      <ToolMarquee />
    </main>
  );
}
