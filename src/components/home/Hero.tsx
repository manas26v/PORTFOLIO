import Link from 'next/link';
import { siteConfig } from '@/data/site';

const d = (n: number) => ({ '--d': n }) as React.CSSProperties;

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-x pb-20 pt-36 text-center sm:pt-40 md:pb-28">
      <h1 id="hero-title" style={d(0)} className="fade-up display-xl mx-auto max-w-[15ch]">
        AI products, built to scale
      </h1>
      <p style={d(1)} className="fade-up mx-auto mt-7 max-w-[34rem] text-lg font-medium leading-snug text-muted sm:text-[22px]">
        I&apos;m {siteConfig.name}, a full stack developer building multi-tenant SaaS and AI-enabled
        applications. Currently at{' '}
        <a
          href={siteConfig.employer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-fg"
        >
          {siteConfig.employer.name}
        </a>
        .
      </p>
      <div style={d(2)} className="fade-up mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/contact/" className="pill-light">
          Get in touch
        </Link>
        <Link href="/projects/" className="pill-dark">
          See my work
        </Link>
      </div>
    </section>
  );
}
