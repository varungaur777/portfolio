import { tools } from "@/data/site";

export default function Marquee() {
  const run = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {tools.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6 font-mono text-sm uppercase tracking-label text-bone sm:px-10 sm:text-base">{t}</span>
          <span className="text-ember">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="Tools I work with" className="overflow-hidden border-y border-line bg-ink py-5 sm:py-6">
      <h2 className="sr-only">Tools</h2>
      <div className="marquee-track flex w-max">
        {run("a")}
        {run("b")}
      </div>
    </section>
  );
}
