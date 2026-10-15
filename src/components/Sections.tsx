import { Still } from "./Media";
import { Cut, Reveal } from "./Motion";
import { experience, site } from "@/data/site";
import type { Asset } from "@/lib/types";

export function KeyArt({ posters }: { posters: { title: string; image: Asset }[] }) {
  return (
    <Cut id="key-art" ariaLabel="Key art" className="section-pad border-t border-line bg-ink py-24 sm:py-32">
      <div className="mb-12 flex items-end justify-between sm:mb-16">
        <div>
          <p className="label-lg mb-4 text-ember">Key art</p>
          <h2 className="font-serif text-5xl leading-none text-bone sm:text-7xl">
            Framed <span className="italic">one-sheets</span>
          </h2>
        </div>
        <p className="label hidden sm:block">{String(posters.length).padStart(2, "0")} posters</p>
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 md:grid-cols-3 xl:grid-cols-6">
        {posters.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 3) * 0.06}>
              <figure>
                {/* Frame + mat */}
                <div className="border border-[#2a2a2e] bg-panel p-2.5 sm:p-3.5">
                  <div className="relative aspect-sheet overflow-hidden bg-ink">
                    <Still image={p.image} alt={`${p.title} poster`} sizes="(min-width: 1280px) 16vw, (min-width: 768px) 33vw, 50vw" />
                  </div>
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="font-serif text-xl leading-tight text-bone">{p.title}</span>
                  <span className="label text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Cut>
  );
}

export function CrewCredits() {
  return (
    <Cut id="crew" ariaLabel="Experience" className="section-pad border-t border-line bg-ink py-28 text-center sm:py-40">
      <Reveal>
        <p className="label-lg mb-16 text-ember sm:mb-20">Crew credits</p>
      </Reveal>
      <ol className="mx-auto flex max-w-3xl flex-col gap-14 sm:gap-16">
        {experience.map((e, i) => (
          <li key={e.role}>
            <Reveal delay={i * 0.05}>
              <p className="label mb-3 text-dust">{e.role}</p>
              <p className="font-serif text-4xl leading-none text-bone sm:text-6xl">{e.company}</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-label text-dust">{e.dates}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal>
        <p className="label mx-auto mt-20 max-w-md leading-relaxed sm:mt-24">
          Based in New Delhi · 1.5+ years making AI films, commercials and editorial visuals
        </p>
      </Reveal>
    </Cut>
  );
}

export function RollCredits({ hasResume }: { hasResume: boolean }) {
  const links = [
    { label: "WhatsApp", href: site.whatsapp, ext: true },
    { label: "LinkedIn", href: site.linkedin, ext: true },
  ];
  return (
    <section id="contact" aria-label="Contact" className="section-pad relative bg-ember py-20 text-ink sm:py-28">
      <p className="font-mono text-xs uppercase tracking-label text-ink/80 sm:text-sm">Roll credits</p>
      <h2 className="mt-8 font-serif text-[17vw] leading-[0.86] sm:text-[12vw] lg:text-[9.5vw]">
        Let’s make
        <br />
        <span className="italic">the next one.</span>
      </h2>

      <a
        href={`mailto:${site.email}`}
        className="mt-12 inline-block break-all border-b-2 border-ink/80 pb-1 font-serif text-3xl leading-tight transition-opacity hover:opacity-70 sm:mt-16 sm:text-5xl"
      >
        {site.email}
      </a>

      <ul className="mt-12 flex flex-wrap gap-3 sm:mt-14">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 font-mono text-xs uppercase tracking-label transition-colors hover:bg-ink hover:text-ember"
            >
              {l.label} <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
        <li>
          {hasResume ? (
            <a
              href={site.resume}
              download="Varun-Gaur-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-label text-ember transition-colors hover:bg-transparent hover:text-ink"
            >
              Resume <span aria-hidden>↓</span>
            </a>
          ) : (
            <span
              title="Add public/resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-ink/60 px-5 py-3 font-mono text-xs uppercase tracking-label text-ink/70"
            >
              Resume · add public/resume.pdf
            </span>
          )}
        </li>
      </ul>

      <div className="mt-20 flex flex-col gap-2 border-t border-ink/25 pt-6 font-mono text-[11px] uppercase tracking-label text-ink/75 sm:mt-28 sm:flex-row sm:justify-between">
        <span>Varun Gaur · AI Video Producer and Creative Technologist</span>
        <span>New Delhi · © {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}
