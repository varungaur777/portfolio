"use client";

import { useEffect, useState } from "react";
import type { Asset } from "@/lib/types";

/** "Play film" button that opens the full film, with sound and controls. */
export default function FilmPlayer({ film, poster, title }: { film: Asset; poster?: Asset; title: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!film.ok) {
    return (
      <span className="absolute bottom-3 left-3 z-[4] bg-ink/80 px-3 py-2 font-mono text-[10px] tracking-label text-dust sm:bottom-5 sm:left-5">
        FULL FILM · public{film.src}
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        data-cursor="play"
        className="absolute inset-0 z-[4] flex items-end justify-start p-3 sm:p-5"
        aria-label={`Play ${title}`}
      >
        <span className="inline-flex items-center gap-2 bg-ember px-4 py-2.5 font-mono text-[11px] uppercase tracking-label text-ink sm:text-xs">
          ▶ Play film
        </span>
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[90] flex flex-col bg-black p-3 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="label text-bone">{title}</p>
            <button type="button" onClick={() => setOpen(false)} className="label text-bone hover:text-ember" autoFocus>
              Close ✕
            </button>
          </div>
          <div className="relative flex-1">
            <video
              className="absolute inset-0 h-full w-full object-contain"
              src={film.src}
              poster={poster?.ok ? poster.src : undefined}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      )}
    </>
  );
}
