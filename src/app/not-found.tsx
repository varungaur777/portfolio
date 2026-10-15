import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-pad flex min-h-[100svh] flex-col items-start justify-center gap-6">
      <p className="label text-ember">● Signal lost · 404</p>
      <h1 className="font-serif text-6xl leading-none text-bone sm:text-8xl">
        Scene <span className="italic text-ember">missing.</span>
      </h1>
      <Link href="/" className="label text-bone hover:text-ember">
        ← Back to the reel
      </Link>
    </main>
  );
}
