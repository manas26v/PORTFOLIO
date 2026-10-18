'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ApiVisual, DataVisual, PerformanceVisual, SecurityVisual } from './MockPanels';

type Item = { title: string; body: string; visual: ReactNode };

// Copy drawn from the DataCaffe.ai role.
const items: Item[] = [
  {
    title: 'APIs',
    body: 'Scalable REST APIs and backend services in Node.js, Express.js and TypeScript, built to run reliably in production.',
    visual: <ApiVisual />,
  },
  {
    title: 'Data',
    body: 'Integrations that bring Snowflake, PostgreSQL and Excel together, so data flows cleanly into reporting across business systems.',
    visual: <DataVisual />,
  },
  {
    title: 'Security',
    body: 'PostgreSQL Row-Level Security policies that enforce tenant-level isolation in multi-tenant applications.',
    visual: <SecurityVisual />,
  },
  {
    title: 'Performance',
    body: 'Tuning services and database queries, and contributing to reviews and architecture discussions that keep systems fast.',
    visual: <PerformanceVisual />,
  },
];

/**
 * Desktop: the section pins while you scroll and the active item advances.
 * Mobile / reduced motion: a simple stacked list, each item with its visual.
 */
export default function Capabilities() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 0.999);
      setActive(Math.floor(progress * items.length));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jumpTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + (scrollable * (i + 0.5)) / items.length;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="capabilities-heading" className="py-20 md:py-28">
      <div className="container-x">
        <h2 id="capabilities-heading" className="display-lg reveal max-w-[9ch]">
          Design, build, and scale
        </h2>
      </div>

      {/* Desktop: pinned, scroll-driven */}
      <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${items.length * 75 + 25}vh` }}>
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center">
          <div className="container-x grid grid-cols-[minmax(0,1fr)_340px] items-center gap-20">
            <div className="relative h-[min(560px,70vh)]">
              {items.map((item, i) => (
                <div
                  key={item.title}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 transition-all duration-700 ease-smooth ${
                    active === i ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
                  }`}
                >
                  {item.visual}
                </div>
              ))}
            </div>
            <ol>
              {items.map((item, i) => (
                <li key={item.title} className="border-b border-line last:border-0">
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={active === i ? 'step' : undefined}
                    className={`w-full py-6 text-left font-display text-[28px] font-medium tracking-[-0.02em] transition-colors ${
                      active === i ? 'text-fg' : 'text-[#7a7a7a] hover:text-muted'
                    }`}
                  >
                    {item.title}
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-smooth ${
                      active === i ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <p className="overflow-hidden text-[17px] leading-relaxed text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Mobile & tablet: stacked */}
      <ol className="container-x mt-12 space-y-14 lg:hidden">
        {items.map((item) => (
          <li key={item.title} className="reveal">
            <div className="h-[300px] sm:h-[380px]">{item.visual}</div>
            <h3 className="mt-6 font-display text-2xl font-medium tracking-[-0.02em]">{item.title}</h3>
            <p className="mt-2 text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
