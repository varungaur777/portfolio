import { Still } from "./Media";
import { Cut, Reveal } from "./Motion";
import type { Asset } from "@/lib/types";

interface System {
  title: string;
  body: string;
  status: string;
  shot: Asset;
}

export default function BehindCamera({ stats, systems }: { stats: { value: string; label: string }[]; systems: System[] }) {
  return (
    <Cut id="behind-the-camera" ariaLabel="Behind the camera" className="section-pad border-t border-line bg-ink py-24 sm:py-32">
      <p className="label-lg mb-8 text-ember sm:mb-10">Behind the camera</p>

      <Reveal>
        <h2 className="font-serif text-[13vw] leading-[0.9] text-bone sm:text-[9vw] lg:text-[7vw]">
          I don’t just prompt.
          <br />
          <span className="italic text-ember">I build the studio.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-6 max-w-xl">
        <p className="text-[15px] leading-relaxed text-dust sm:text-base">
          The same craft runs the business side: automations that confirm orders, chase returns and turn a product into an ad without
          a human in the loop.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:mt-16">
        {stats.map((s) => (
          <div key={s.label} className="bg-panel p-5 sm:p-8">
            <p className="font-serif text-5xl leading-none text-bone sm:text-7xl">{s.value}</p>
            <p className="label mt-3 sm:mt-4">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {systems.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <article className="h-full border border-line bg-panel">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-ink">
                <Still image={s.shot} alt={`${s.title} screenshot`} sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl text-bone sm:text-3xl">{s.title}</h3>
                  <span
                    className={`shrink-0 font-mono text-[10px] uppercase tracking-label ${s.status === "Live" ? "text-ember" : "text-dust"}`}
                  >
                    {s.status === "Live" ? "● " : "○ "}
                    {s.status}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-dust">{s.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Cut>
  );
}
