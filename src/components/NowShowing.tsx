import Link from "next/link";
import Letterbox from "./Letterbox";
import { Cut, Reveal } from "./Motion";
import type { Project } from "@/data/projects";
import type { Asset } from "@/lib/types";

export default function NowShowing({ project, video, poster }: { project: Project; video: Asset; poster: Asset }) {
  return (
    <Cut id="now-showing" ariaLabel="Now showing" className="section-pad bg-ink py-24 sm:py-32">
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <p className="label-lg text-ember">● Now showing</p>
        <p className="label hidden sm:block">Featured film</p>
      </div>

      <Link href={`/projects/${project.slug}/`} aria-label={`Open ${project.title} ${project.titleItalic ?? ""}`} className="block">
        <Letterbox video={video} poster={poster} label={`${project.title} ${project.titleItalic ?? ""} preview`} />
      </Link>

      <div className="mt-8 grid gap-8 sm:mt-10 md:grid-cols-[1fr_auto] md:items-end">
        <Reveal>
          <h2 className="font-serif text-[22vw] leading-[0.82] text-bone sm:text-[15vw] lg:text-[11vw]">
            {project.title} <span className="italic text-ember">{project.titleItalic}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-1 md:text-right">
            <div>
              <dt className="label">Runtime</dt>
              <dd className="mt-1.5 font-mono text-sm uppercase tracking-label text-bone">{project.runtime}</dd>
            </div>
            <div>
              <dt className="label">Made with</dt>
              <dd className="mt-1.5 font-mono text-sm uppercase tracking-label text-bone">{project.madeWith}</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-8 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl font-serif text-2xl italic leading-tight text-bone/90 sm:text-3xl">{project.logline}</p>
        <Link
          href={`/projects/${project.slug}/`}
          className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-label text-bone transition-colors hover:text-ember sm:text-sm"
        >
          Watch the film and breakdown
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </Reveal>
    </Cut>
  );
}
