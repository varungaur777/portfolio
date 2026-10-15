"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { LoopVideo } from "./Media";
import type { Asset } from "@/lib/types";

/**
 * 2.39:1 screen. When it scrolls into view the black masking bars
 * slide open from the top and bottom, like cinema curtains.
 */
export default function Letterbox({
  video,
  poster,
  label,
  children,
  className = "",
}: {
  video: Asset;
  poster?: Asset;
  label: string;
  children?: ReactNode;
  className?: string;
}) {
  const ease = [0.76, 0, 0.24, 1] as const;
  return (
    <motion.div
      className={`film-fx relative aspect-scope w-full overflow-hidden bg-black ${className}`}
      initial="closed"
      whileInView="open"
      viewport={{ once: true, amount: 0.45 }}
      data-cursor={video.ok ? "play" : undefined}
    >
      <LoopVideo video={video} poster={poster} label={label} />
      {children}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 z-[3] h-1/2 bg-black"
        variants={{ closed: { y: "0%" }, open: { y: "-100%" } }}
        transition={{ duration: 1.1, ease }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[3] h-1/2 bg-black"
        variants={{ closed: { y: "0%" }, open: { y: "100%" } }}
        transition={{ duration: 1.1, ease }}
      />
    </motion.div>
  );
}
