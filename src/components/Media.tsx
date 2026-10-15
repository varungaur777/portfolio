"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Asset } from "@/lib/types";

/** Dark slate that names the file the site expects. Never looks broken. */
export function Placeholder({ file, className = "", compact = false }: { file: string; className?: string; compact?: boolean }) {
  return (
    <div
      className={`placeholder-bg absolute inset-0 flex flex-col items-center justify-center gap-2 border border-line p-3 text-center ${className}`}
      aria-label={`Placeholder for ${file}`}
      role="img"
    >
      {compact ? (
        <span className="font-mono text-[8px] uppercase tracking-label text-dust/70" title={`public${file}`}>
          No file
        </span>
      ) : (
        <>
          <span className="label text-[10px] text-dust/70">Awaiting file</span>
          <span className="font-mono text-[10px] leading-snug [overflow-wrap:anywhere] tracking-label text-dust sm:text-[11px]">
            {`public${file}`.split("/").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <>
                    /<wbr />
                  </>
                )}
              </span>
            ))}
          </span>
        </>
      )}
    </div>
  );
}

interface StillProps {
  image: Asset;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  compact?: boolean;
}

/** Lazy image that falls back to a placeholder when the file is missing. */
export function Still({ image, alt, sizes, className = "object-cover", priority = false, compact }: StillProps) {
  const [failed, setFailed] = useState(false);
  if (!image.ok || failed) return <Placeholder file={image.src} compact={compact} />;
  return (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

interface LoopVideoProps {
  video: Asset;
  poster?: Asset;
  className?: string;
  /** Play only while on screen (default). */
  playInView?: boolean;
  label?: string;
}

/**
 * Muted, looping, inline video. Plays only while visible to save battery and
 * bandwidth; shows the poster first; falls back to a placeholder if missing.
 */
export function LoopVideo({ video, poster, className = "object-cover", playInView = true, label }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !playInView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [playInView, video.ok]);

  if (!video.ok || failed) {
    if (poster?.ok) return <Still image={poster} alt={label ?? ""} sizes="100vw" className={className} />;
    return <Placeholder file={video.src} />;
  }

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full ${className}`}
      src={video.src}
      poster={poster?.ok ? poster.src : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      onError={() => setFailed(true)}
    />
  );
}
