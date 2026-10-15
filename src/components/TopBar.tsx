import Link from "next/link";

export default function TopBar() {
  return (
    <header className="section-pad absolute inset-x-0 top-0 z-40 flex items-center justify-between py-5 sm:py-6">
      <Link href="/" className="font-serif text-[22px] leading-none text-bone sm:text-2xl">
        Varun Gaur
      </Link>
      <a
        href="/#contact"
        className="rounded-full border border-bone/40 bg-ink/40 px-4 py-2 font-mono text-[11px] uppercase tracking-label text-bone backdrop-blur-sm transition-colors hover:border-ember hover:bg-ember hover:text-ink"
      >
        Get in touch
      </a>
    </header>
  );
}
