import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import NowShowing from "@/components/NowShowing";
import Filmography from "@/components/Filmography";
import BehindCamera from "@/components/BehindCamera";
import Editorial from "@/components/Editorial";
import { CrewCredits, KeyArt, RollCredits } from "@/components/Sections";
import { Cut } from "@/components/Motion";
import { FEATURED_SLUG, filmography, getProject, poster, preview } from "@/data/projects";
import { automation, editorial, keyArt, site } from "@/data/site";
import { asset, has } from "@/lib/assets";

export default function Home() {
  const featured = getProject(FEATURED_SLUG)!;

  const rows = filmography.map((p, i) => ({
    slug: p.slug,
    num: String(i + 1).padStart(2, "0"),
    title: p.title,
    runtime: p.runtime,
    kind: p.kind,
    preview: asset(preview(p.slug)),
    poster: asset(poster(p.slug)),
  }));

  const editorialTiles = editorial.map((e) => ({
    title: e.title,
    purpose: e.purpose,
    format: e.format,
    full: asset(e.src),
    preview: e.video ? asset(e.video) : undefined,
    poster: e.poster ? asset(e.poster) : undefined,
  }));

  return (
    <main>
      <TopBar />
      <Hero reel={asset(site.showreel)} poster={asset(site.showreelPoster)} />
      <Marquee />
      <NowShowing project={featured} video={asset(preview(featured.slug))} poster={asset(poster(featured.slug))} />

      <Cut id="filmography" ariaLabel="Filmography" className="border-t border-line">
        <Filmography rows={rows} />
      </Cut>

      <BehindCamera
        stats={automation.stats}
        systems={automation.systems.map((s) => ({ title: s.title, body: s.body, status: s.status, shot: asset(s.src) }))}
      />

      <Cut id="editorial" ariaLabel="Editorial" className="section-pad border-t border-line bg-ink py-24 sm:py-32">
        <div className="mb-12 grid gap-6 sm:mb-16 md:grid-cols-2 md:items-end">
          <div>
            <p className="label-lg mb-4 text-ember">Editorial</p>
            <h2 className="font-serif text-5xl leading-none text-bone sm:text-7xl">
              Published for <span className="italic">ISN Report</span>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-dust md:justify-self-end">
            Explainers, static ads and posters that turn defence, energy and policy stories into something you can read in one scroll.
          </p>
        </div>
        <Editorial items={editorialTiles} />
      </Cut>

      <KeyArt posters={keyArt.map((k) => ({ title: k.title, image: asset(k.src) }))} />
      <CrewCredits />
      <RollCredits hasResume={has(site.resume)} />
    </main>
  );
}
