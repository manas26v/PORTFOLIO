'use client';

import { useMemo, useState, type ReactNode } from 'react';

/**
 * Tech filter chips over a server-rendered list. Cards are rendered on the
 * server and passed in as `items`, so filtering ships almost no JS.
 */
export default function ProjectFilter({ items }: { items: { tech: string[]; node: ReactNode; key: string }[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  const allTech = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((i) => i.tech.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
  }, [items]);

  const visible = selected ? items.filter((i) => i.tech.includes(selected)) : items;

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
      active ? 'border-accent bg-accent-tint text-accent' : 'border-line text-muted hover:border-accent hover:text-accent'
    }`;

  return (
    <>
      <div className="reveal mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
        <button type="button" className={chip(selected === null)} aria-pressed={selected === null} onClick={() => setSelected(null)}>
          All
        </button>
        {allTech.map((t) => (
          <button
            key={t}
            type="button"
            className={chip(selected === t)}
            aria-pressed={selected === t}
            onClick={() => setSelected(selected === t ? null : t)}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} project{visible.length === 1 ? '' : 's'} shown
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((i) => (
          <li key={i.key} className="contents">
            {i.node}
          </li>
        ))}
      </ul>
    </>
  );
}
