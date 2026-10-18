import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden="true" className="glow-bottom pointer-events-none absolute inset-0" />
      <p className="relative font-display text-[clamp(120px,28vw,260px)] font-semibold leading-none tracking-[-0.06em]">404</p>
      <h1 className="relative mt-2 display-md">This page doesn&apos;t exist.</h1>
      <p className="relative mt-3 max-w-md text-lg text-muted">It may have moved, or the link might be wrong.</p>
      <Link href="/" className="pill-light relative mt-8">
        Back home
      </Link>
    </section>
  );
}
