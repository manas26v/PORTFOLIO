import Link from 'next/link';
import IsoGraphic from '@/components/IsoGraphic';
import { siteConfig } from '@/data/site';

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center py-32" aria-labelledby="hero-title">
      <IsoGraphic className="pointer-events-none absolute right-[-120px] top-1/2 hidden w-[clamp(300px,38vw,460px)] -translate-y-1/2 md:block" />

      <div className="relative z-10">
        <p style={{ '--d': 0 } as React.CSSProperties} className="fade-up mb-7 ml-1 font-mono text-base text-accent">Hi, my name is</p>
        <h1 id="hero-title" style={{ '--d': 1 } as React.CSSProperties} className="fade-up font-display text-[clamp(40px,8vw,80px)] font-bold leading-[1.05] text-fg">
          {siteConfig.name}.
        </h1>
        <p style={{ '--d': 2 } as React.CSSProperties} className="fade-up mt-3 max-w-[13em] font-display text-[clamp(28px,5vw,52px)] font-bold leading-[1.1] text-muted lg:max-w-[16em]">
          Building reliable systems behind great products.
        </p>
        <p style={{ '--d': 3 } as React.CSSProperties} className="fade-up mt-6 max-w-xl text-lg leading-relaxed">
          Software developer with experience designing APIs, optimizing databases, and developing reliable backend
          services. I enjoy solving complex problems, improving system performance, and building products that can scale
          from thousands to millions of requests. Currently building scalable applications at{' '}
          <span className="whitespace-nowrap">
            <a href={siteConfig.employer.url} target="_blank" rel="noopener noreferrer" className="inline-link">
              {siteConfig.employer.name}
            </a>
            .
          </span>
        </p>
        <div style={{ '--d': 4 } as React.CSSProperties} className="fade-up mt-12 flex flex-wrap gap-4">
          <Link href="/contact/" className="btn">
            Get In Touch
          </Link>
          <Link href="/projects/" className="btn border-line text-soft hover:border-accent hover:text-accent">
            See my work
          </Link>
        </div>
      </div>
    </section>
  );
}
