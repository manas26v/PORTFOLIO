import type { ReactNode } from 'react';

/** Inner-page title block: big left-aligned display heading. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: ReactNode }) {
  const d = (n: number) => ({ '--d': n }) as React.CSSProperties;
  return (
    <header className="container-x pb-14 pt-36 md:pb-20 md:pt-44">
      {eyebrow && (
        <p style={d(0)} className="fade-up eyebrow mb-5">
          {eyebrow}
        </p>
      )}
      <h1 style={d(1)} className="fade-up display-xl max-w-[14ch]">
        {title}
      </h1>
      {intro && (
        <div style={d(2)} className="fade-up mt-7 max-w-2xl text-lg font-medium leading-snug text-muted sm:text-[22px]">
          {intro}
        </div>
      )}
    </header>
  );
}

/** Section with a large display heading, as used across the site. */
export function Section({
  id,
  title,
  children,
  aside,
  className = '',
}: {
  id: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`container-x py-20 md:py-28 ${className}`}>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <h2 id={`${id}-heading`} className="display-lg reveal max-w-[14ch]">
          {title}
        </h2>
        {aside && <div className="reveal">{aside}</div>}
      </div>
      {children}
    </section>
  );
}

export function TechList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {items.map((t) => (
        <li key={t} className="rounded-full bg-pill px-2.5 py-1 text-[13px] text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}
