import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Letterbox from "@/components/Letterbox";
import FilmPlayer from "@/components/FilmPlayer";
import { Still } from "@/components/Media";
import { Reveal } from "@/components/Motion";
import { RollCredits } from "@/components/Sections";
import { displayTitle, getProject, isTodo, nextProject, poster, preview, projects, video } from "@/data/projects";
import { site } from "@/data/site";
import { asset, has } from "@/lib/assets";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  const title = displayTitle(p);
  const description = isTodo(p.logline) ? `${title}, a ${p.kind.toLowerCase()} by Varun Gaur.` : p.logline;
  const og = has(poster(p.slug)) ? poster(p.slug) : "/og.jpg";
  return {
    title,
    description,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: { title: `${title} | Varun Gaur`, description, images: [og], type: "video.other" },
  };
}

/** Renders copy, or a clearly marked placeholder when it starts with "[FILL IN". */
function Copy({ text, className = "" }: { text: string; className?: string }) {
  if (isTodo(text)) {
    return (
      <div className={`border border-dashed border-ember/60 bg-ember/[0.04] p-4 ${className}`}>
        <span className="label mb-2 block text-ember">To fill · edit src/data/projects.ts</span>
        <p className="font-mono text-[13px] leading-relaxed text-dust">{text.replace(/^\[FILL IN:\s*/, "").replace(/\]$/, "")}</p>
      </div>
    );
  }
  return <p className={`text-[17px] leading-relaxed text-bone/90 sm:text-lg ${className}`}>{text}</p>;
}

function Chapter({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-5 border-t border-line py-12 sm:py-16 md:grid-cols-[minmax(180px,1fr)_2.2fr] md:gap-12">
      <Reveal>
        <p className="font-mono text-xs tracking-label text-ember">{n}</p>
        <h2 className="mt-2 font-serif text-4xl leading-none text-bone sm:text-5xl">{title}</h2>
      </Reveal>
      <Reveal delay={0.08} className="max-w-3xl">
        {children}
      </Reveal>
    </section>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = nextProject(p.slug);
  const title = displayTitle(p);
  const posterA = asset(poster(p.slug));

  return (
    <main>
      <TopBar />

      <header className="section-pad pt-28 sm:pt-32">
        <div className="flex items-center justify-between">
          <Link href="/#filmography" className="label text-bone transition-colors hover:text-ember">
            ← Filmography
          </Link>
          <p className="label">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · {p.kind}
          </p>
        </div>
      </header>

      {/* The film, full width, in letterbox */}
      <div className="mt-6 sm:mt-8">
        <Letterbox video={asset(preview(p.slug))} poster={posterA} label={`${title} preview`}>
          <FilmPlayer film={asset(video(p.slug))} poster={posterA} title={title} />
        </Letterbox>
      </div>

      <div className="section-pad">
        <div className="grid gap-8 py-10 sm:py-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h1 className="font-serif text-[18vw] leading-[0.85] text-bone sm:text-[12vw] lg:text-[9vw]">
              {p.title} {p.titleItalic && <span className="italic text-ember">{p.titleItalic}</span>}
            </h1>
            <div className="mt-5 max-w-2xl">
              {isTodo(p.logline) ? <Copy text={p.logline} /> : <p className="font-serif text-2xl italic leading-tight text-bone/90 sm:text-3xl">{p.logline}</p>}
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-6 md:grid-cols-1 md:gap-4 md:text-right">
            <div>
              <dt className="label">Runtime</dt>
              <dd className="mt-1.5 font-mono text-sm tracking-label text-bone">{p.runtime}</dd>
            </div>
            <div>
              <dt className="label">Format</dt>
              <dd className="mt-1.5 font-mono text-sm uppercase tracking-label text-bone">{p.aspect === "portrait" ? "9:16" : "16:9"}</dd>
            </div>
            <div>
              <dt className="label">Made with</dt>
              <dd className="mt-1.5 font-mono text-sm uppercase tracking-label text-bone">{isTodo(p.madeWith) ? "—" : p.madeWith}</dd>
            </div>
          </dl>
        </div>

        {p.externalLink && (
          <a
            href={p.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="label mb-4 inline-block text-bone transition-colors hover:text-ember"
          >
            Watch in full quality ↗
          </a>
        )}

        <Chapter n="01" title="The brief">
          <Copy text={p.brief} />
        </Chapter>
        <Chapter n="02" title="My role">
          <Copy text={p.role} />
        </Chapter>
        <Chapter n="03" title="The challenge">
          <Copy text={p.challenge} />
        </Chapter>
        <Chapter n="04" title="The process">
          <Copy text={p.process} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {p.gallery.map((g) => (
              <li key={g.src}>
                <div className="relative aspect-[4/3] overflow-hidden border border-line bg-panel">
                  <Still image={asset(g.src)} alt={`${title}: ${g.caption}`} sizes="(min-width: 640px) 25vw, 100vw" />
                </div>
                <p className="label mt-2.5 text-ember">{g.kind}</p>
                <p className="mt-1 text-sm text-dust">{g.caption}</p>
              </li>
            ))}
          </ul>
          {p.prompts.length > 0 && (
            <div className="mt-10 space-y-4">
              {p.prompts.map((pr, i) => (
                <figure key={i} className="border border-line bg-panel">
                  <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5">
                    <span className="label">Prompt</span>
                    <span className="label text-bone">{pr.tool}</span>
                  </figcaption>
                  {isTodo(pr.prompt) ? (
                    <div className="p-4">
                      <Copy text={pr.prompt} />
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap p-4 font-mono text-[13px] leading-relaxed text-bone/90">{pr.prompt}</pre>
                  )}
                  {pr.note && <p className="border-t border-line px-4 py-3 text-sm text-dust">{pr.note}</p>}
                </figure>
              ))}
            </div>
          )}
        </Chapter>
        <Chapter n="05" title="The result">
          <Copy text={p.result} />
        </Chapter>

        <section className="border-t border-line py-12 sm:py-16">
          <p className="label mb-5">Tools</p>
          <ul className="flex flex-wrap gap-2">
            {p.tools.map((t) => (
              <li
                key={t}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-label ${
                  isTodo(t) ? "border-dashed border-ember/60 text-dust" : "border-line text-bone"
                }`}
              >
                {isTodo(t) ? t.replace(/^\[FILL IN:\s*/, "To fill: ").replace(/\]$/, "") : t}
              </li>
            ))}
          </ul>
        </section>

        <Link
          href={`/projects/${next.slug}/`}
          data-cursor="play"
          className="group flex flex-col gap-3 border-t border-line py-14 sm:flex-row sm:items-end sm:justify-between sm:py-20"
        >
          <span className="label">Next film</span>
          <span className="font-serif text-6xl leading-none text-bone transition-colors group-hover:text-ember sm:text-8xl">
            {next.title} {next.titleItalic && <span className="italic">{next.titleItalic}</span>}{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </span>
        </Link>
      </div>

      <RollCredits hasResume={has(site.resume)} />
    </main>
  );
}
