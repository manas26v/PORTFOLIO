'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ApiVisual, BleedContext, DataVisual, PerformanceVisual, SecurityVisual } from './MockPanels';

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
 * Desktop: tall panels scroll by normally on the left (running off the screen
 * edge) while the list stays sticky on the right. An item becomes active once
 * its panel's top passes the middle of the viewport.
 * Mobile: a simple stacked list, each item with its visual.
 */
export default function Capabilities() {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let next = 0;
      panelRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < mid) next = i;
      });
      setActive(next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Bring a panel up to where the sticky list sits (26vh from the top).
  const jumpTo = (i: number) => {
    const el = panelRefs.current[i];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.26;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="capabilities-heading" className="py-20 md:py-28">
      <div className="container-x">
        <h2 id="capabilities-heading" className="display-lg reveal max-w-[9ch]">
          Design, build, and scale
        </h2>
      </div>

      {/* Desktop. Right padding equals the container's side margin, so the list
          lines up with the page grid while the panels bleed off the left edge. */}
      <div className="mt-16 hidden grid-cols-[minmax(0,1fr)_340px] gap-20 pr-[max(2.5rem,calc((100%-1232px)/2))] md:mt-24 lg:grid">
        <BleedContext.Provider value={true}>
          <div className="flex flex-col gap-36">
            {items.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                aria-hidden="true"
                className="h-[min(880px,82vh)] min-h-[640px]"
              >
                {item.visual}
              </div>
            ))}
          </div>
        </BleedContext.Provider>

        <div>
          <ol className="sticky top-[26vh]">
            {items.map((item, i) => (
              <li key={item.title} className="border-t border-pill py-6 first:border-t-0 first:pt-0">
                <h3>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-expanded={active === i}
                    className={`text-left font-display text-[26px] font-medium tracking-[-0.01em] transition-colors duration-300 ${
                      active === i ? 'text-fg' : 'text-[#999] hover:text-[#bbb]'
                    }`}
                  >
                    {item.title}
                  </button>
                </h3>
                <div
                  className={`grid transition-all duration-500 ease-smooth ${
                    active === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <p className="overflow-hidden pt-3 text-[17px] leading-[1.6] text-[#999]">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
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
