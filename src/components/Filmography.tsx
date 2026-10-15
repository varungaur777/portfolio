"use client";

import Link from "next/link";
import { useState } from "react";
import { Placeholder, Still } from "./Media";
import type { Asset } from "@/lib/types";

export interface FilmRow {
  slug: string;
  num: string;
  title: string;
  runtime: string;
  kind: string;
  preview: Asset;
  poster: Asset;
}

function Backdrop({ row, active }: { row: FilmRow; active: boolean }) {
  // Videos are only attached once a row has been hovered, so nothing downloads up front.
  const [armed, setArmed] = useState(false);
  if (active && !armed) setArmed(true);

  return (
    <div
      aria-hidden
      className={`film-fx absolute inset-0 transition-opacity duration-500 ease-film ${active ? "opacity-100" : "opacity-0"}`}
    >
      {row.preview.ok && armed ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={row.preview.src}
          poster={row.poster.ok ? row.poster.src : undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      ) : row.poster.ok ? (
        armed && <Still image={row.poster} alt="" sizes="100vw" />
      ) : (
        <div className="absolute inset-0">
          <Placeholder file={row.preview.src} />
        </div>
      )}
      <div className="absolute inset-0 z-[1] bg-ink/70" />
    </div>
  );
}

export default function Filmography({ rows }: { rows: FilmRow[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden bg-ink md:min-h-[100svh]" onMouseLeave={() => setActive(null)}>
      {/* Desktop: full-screen preview behind the list */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {rows.map((r, i) => (
          <Backdrop key={r.slug} row={r} active={active === i} />
        ))}
      </div>

      <div className="section-pad relative z-10 flex flex-col justify-center md:min-h-[100svh] py-24 sm:py-32">
        <div className="mb-10 flex items-end justify-between border-b border-line pb-5 sm:mb-14">
          <h2 className="label-lg text-bone">Filmography</h2>
          <p className="label">Films &amp; commercials · {String(rows.length).padStart(2, "0")}</p>
        </div>

        <ol className="mx-auto w-full max-w-6xl">
          {rows.map((r, i) => (
            <li key={r.slug}>
              <Link
                href={`/projects/${r.slug}/`}
                data-cursor="play"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`group flex items-center gap-3 py-3.5 transition-opacity duration-300 sm:gap-6 sm:py-4 ${
                  active !== null && active !== i ? "md:opacity-30" : "opacity-100"
                }`}
              >
                <span className="w-7 shrink-0 font-mono text-xs tracking-label text-ember sm:w-10 sm:text-sm">{r.num}</span>

                {/* Mobile thumbnail */}
                <span className="relative h-10 w-16 shrink-0 overflow-hidden bg-panel md:hidden">
                  <Still image={r.poster} alt="" sizes="64px" compact />
                </span>

                <span className="font-serif text-[30px] leading-none text-bone transition-colors group-hover:text-ember sm:text-6xl lg:text-7xl">
                  {r.title}
                </span>
                <span className="leader" aria-hidden />
                <span className="hidden font-mono text-[11px] uppercase tracking-label text-dust lg:inline">{r.kind}</span>
                <span className="shrink-0 font-mono text-xs tabular-nums tracking-label text-bone sm:text-sm">{r.runtime}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
