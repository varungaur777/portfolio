"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

/** Honour prefers-reduced-motion everywhere: movement is dropped, only quick fades remain. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Gentle fade-up on scroll for text. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** A section that enters like a film edit: a hard cut, then a quick fade up from black. */
export function Cut({
  children,
  className = "",
  id,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section id={id} aria-label={ariaLabel} className={`relative ${className}`}>
      {children}
      <motion.div
        aria-hidden
        data-cut
        className="pointer-events-none absolute inset-0 z-30 bg-ink"
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
      />
    </section>
  );
}
