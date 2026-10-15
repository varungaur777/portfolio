import { LoopVideo } from "./Media";
import Timecode from "./Timecode";
import type { Asset } from "@/lib/types";

const Corner = ({ pos }: { pos: string }) => {
  const base = "absolute h-7 w-7 border-bone sm:h-10 sm:w-10";
  const sides: Record<string, string> = {
    tl: "left-0 top-0 border-l-2 border-t-2",
    tr: "right-0 top-0 border-r-2 border-t-2",
    bl: "bottom-0 left-0 border-b-2 border-l-2",
    br: "bottom-0 right-0 border-b-2 border-r-2",
  };
  return <span aria-hidden className={`${base} ${sides[pos]}`} />;
};

export default function Hero({ reel, poster }: { reel: Asset; poster: Asset }) {
  return (
    <section aria-label="Showreel" className="film-fx relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-ink">
      {/* Showreel */}
      <div className="absolute inset-0 z-0" data-cursor={reel.ok ? "play" : undefined}>
        <LoopVideo video={reel} poster={poster} label="Varun Gaur showreel" />
        <div className="absolute inset-0 bg-ink/45" aria-hidden />
      </div>

      {/* Viewfinder overlay */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 top-[76px] z-10 sm:inset-x-8 sm:bottom-8 sm:top-[88px] lg:inset-x-14">
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />

        <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-xs uppercase tracking-label text-ember sm:left-6 sm:top-6 sm:text-sm">
          <span className="rec-dot">●</span>
          <span>Rec</span>
        </div>

        <div className="absolute right-4 top-4 font-mono text-xs tracking-label text-bone sm:right-6 sm:top-6 sm:text-sm">
          <Timecode />
        </div>

        {/* Focus circle */}
        <div aria-hidden className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/25 sm:h-24 sm:w-24">
          <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-bone/30" />
          <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-bone/30" />
        </div>

        <div className="absolute bottom-4 right-4 hidden font-mono text-[11px] uppercase tracking-label text-bone/80 sm:bottom-6 sm:right-6 sm:block sm:text-xs">
          ISO 800 · 24fps · 2.39:1
        </div>

        {/* Title card */}
        <div className="absolute bottom-6 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-auto">
          <p className="label mb-3 text-bone/80 sm:mb-4">A film by</p>
          <h1 className="font-serif leading-[0.84] text-bone">
            <span className="block text-[26vw] sm:text-[17vw] lg:text-[13.5vw]">Varun</span>
            <span className="block text-[26vw] italic text-ember sm:text-[17vw] lg:text-[13.5vw]">Gaur</span>
          </h1>
          <p className="mt-4 max-w-sm font-sans text-[15px] leading-snug text-bone/85 sm:mt-6 sm:text-lg">
            AI films, commercials, and the machines that make them.
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-label text-bone/70 sm:hidden">ISO 800 · 24fps · 2.39:1</p>
        </div>
      </div>
    </section>
  );
}
