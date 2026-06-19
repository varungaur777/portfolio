"use client";

import { motion } from "framer-motion";

const tools = [
  "Kling AI", "Seedance", "CapCut", "Canva", 
  "ChatGPT", "Gemini", "Claude AI", "Runway", "ElevenLabs"
];

export function ToolMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-black/20 py-8 border-y border-white/5 my-12">
      {/* Gradient Fades */}
      <div className="absolute top-0 left-0 z-10 w-24 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 z-10 w-24 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
      
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-8 px-4"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {/* Double the array for seamless looping */}
          {[...tools, ...tools, ...tools].map((tool, index) => (
            <span 
              key={index} 
              className="px-6 py-3 text-lg font-semibold tracking-wide text-white/70 border rounded-full border-white/10 bg-white/5 backdrop-blur-sm whitespace-nowrap"
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
