"use client";

import { useEffect, useRef } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/** Live-running SMPTE-style timecode at 24fps: HH:MM:SS:FF. */
export default function Timecode({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      const frames = Math.floor(((now - start) / 1000) * 24);
      if (frames !== last && ref.current) {
        last = frames;
        const ff = frames % 24;
        const s = Math.floor(frames / 24);
        ref.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(ff)}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label="Running timecode">
      00:00:00:00
    </span>
  );
}
