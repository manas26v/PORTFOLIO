'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { Job } from '@/data/experience';

/** Accessible tab list (arrow keys, Home/End) with a sliding highlight. */
export default function ExperienceTabs({ jobs }: { jobs: Job[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const focusTab = (i: number) => {
    setActive(i);
    tabs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const n = jobs.length;
    const next = {
      ArrowDown: (i + 1) % n,
      ArrowRight: (i + 1) % n,
      ArrowUp: (i - 1 + n) % n,
      ArrowLeft: (i - 1 + n) % n,
      Home: 0,
      End: n - 1,
    }[e.key];
    if (next !== undefined) {
      e.preventDefault();
      focusTab(next);
    }
  };

  return (
    <div className="reveal flex min-h-[340px] flex-col md:flex-row">
      <div
        role="tablist"
        aria-label="Companies"
        aria-orientation="vertical"
        className="relative z-10 -mx-6 mb-8 flex overflow-x-auto sm:mx-0 md:mb-0 md:w-max md:flex-col md:overflow-visible"
        style={{ '--tab': active } as React.CSSProperties}
      >
        {jobs.map((job, i) => (
          <button
            key={job.company}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`${id}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`flex h-[42px] min-w-[120px] shrink-0 items-center justify-center whitespace-nowrap border-b-2 border-line px-5 pb-0.5 font-mono text-[13px] transition-colors duration-300 hover:bg-surface hover:text-accent focus-visible:bg-surface md:justify-start md:border-b-0 md:border-l-2 ${active === i ? 'text-accent' : 'text-muted'}`}
          >
            {job.company}
          </button>
        ))}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-0.5 w-[120px] translate-x-[calc(var(--tab)*120px)] rounded bg-accent transition-transform duration-300 ease-smooth md:top-0 md:h-[42px] md:w-0.5 md:translate-x-0 md:translate-y-[calc(var(--tab)*42px)]"
        />
      </div>

      <div className="w-full md:ml-5">
        {jobs.map((job, i) => (
          <div
            key={job.company}
            id={`${id}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${i}`}
            hidden={active !== i}
            tabIndex={0}
            className="px-1 py-2.5 focus-visible:outline-offset-8"
          >
            <h3 className="text-xl font-medium leading-snug text-fg">
              {job.title}{' '}
              <span className="text-accent">
                @{' '}
                <a href={job.url} target="_blank" rel="noopener noreferrer" className="inline-link">
                  {job.company}
                </a>
              </span>
            </h3>
            <p className="mb-6 mt-1 font-mono text-[13px] text-soft">{job.range}</p>
            <ul className="arrow-list space-y-2.5 text-lg leading-relaxed">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
