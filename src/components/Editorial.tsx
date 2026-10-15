"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { LoopVideo, Still } from "./Media";
import type { Asset } from "@/lib/types";

export interface EditorialTile {
  title: string;
  purpose: string;
  format: string;
  full: Asset; // full image, or full video for explainers
  preview?: Asset; // loop for explainers
  poster?: Asset;
}

export default function Editorial({ items }: { items: EditorialTile[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const current = open !== null ? items[open] : null;

  return (
    <>
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const isVideo = Boolean(it.preview);
          return (
            <li key={it.title}>
              <button
                type="button"
                onClick={() => it.full.ok && setOpen(i)}
                data-cursor={isVideo && it.full.ok ? "play" : undefined}
                className="group block w-full text-left"
                aria-label={`View ${it.title}`}
              >
                <div className={`relative aspect-[3/2] overflow-hidden border border-line bg-panel ${isVideo ? "film-fx" : ""}`}>
                  {isVideo && it.preview ? (
                    <LoopVideo video={it.preview} poster={it.poster} label={it.title} />
                  ) : (
                    <Still
                      image={it.full}
                      alt={it.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-film group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl leading-tight text-bone transition-colors group-hover:text-ember">{it.title}</h3>
                  <span className="label shrink-0">{it.format}</span>
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-dust">{it.purpose}</p>
              </button>
            </li>
          );
        })}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[90] flex flex-col bg-ink/95 p-4 sm:p-8"
          onClick={close}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="label text-bone">{current.title}</p>
            <button type="button" onClick={close} className="label text-bone hover:text-ember" autoFocus>
              Close ✕
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            {current.preview ? (
              <video
                className="absolute inset-0 h-full w-full object-contain"
                src={current.full.src}
                poster={current.poster?.ok ? current.poster.src : undefined}
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            ) : (
              <Image src={current.full.src} alt={current.title} fill sizes="100vw" className="object-contain" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
