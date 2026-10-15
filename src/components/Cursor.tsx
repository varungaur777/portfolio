"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "idle" | "link" | "play";

/** Desktop-only cursor: a small ring that grows and reads PLAY over video. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      const t = e.target as Element | null;
      const play = t?.closest?.("[data-cursor='play']");
      const link = t?.closest?.("a, button");
      setMode(play ? "play" : link ? "link" : "idle");
    };
    const leave = () => setVisible(false);
    const tick = () => {
      cx += (x - cx) * 0.28;
      cy += (y - cy) * 0.28;
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = mode === "play" ? 76 : mode === "link" ? 34 : 14;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-normal"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms" }}
    >
      <div
        className={`flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-film ${
          mode === "play" ? "border-ember bg-ember text-ink" : "border-bone/80 bg-transparent"
        }`}
        style={{ width: size, height: size }}
      >
        {mode === "play" && <span className="font-mono text-[10px] font-medium tracking-label">PLAY</span>}
      </div>
    </div>
  );
}
