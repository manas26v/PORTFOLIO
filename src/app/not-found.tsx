import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center text-center">
      <p className="font-mono text-[clamp(100px,25vw,200px)] font-semibold leading-none text-accent">404</p>
      <h1 className="mt-4 font-mono text-xl text-fg sm:text-2xl">Page Not Found</h1>
      <p className="mt-3 max-w-md text-soft">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn mt-10">
        Go Home
      </Link>
    </section>
  );
}
