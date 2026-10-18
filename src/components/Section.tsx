import type { ReactNode } from 'react';

/** Standard page section with the "01. Title ——" numbered heading. */
export function Section({
  id,
  num,
  title,
  children,
  className = '',
}: {
  id?: string;
  num?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 md:py-28 ${className}`}>
      <h2 id={headingId} className="numbered-heading reveal">
        {num && <span className="num">{num}.</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Page title block for inner pages. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: ReactNode }) {
  return (
    <header className="pb-6 pt-36 md:pt-44">
      <p className="reveal mb-4 font-mono text-base text-accent">{eyebrow}</p>
      <h1 className="reveal font-display text-[clamp(40px,7vw,72px)] font-bold leading-[1.05] text-fg">{title}</h1>
      {intro && <div className="reveal mt-6 max-w-2xl text-lg leading-relaxed">{intro}</div>}
    </header>
  );
}

export function TechList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px] text-soft ${className}`} aria-label="Technologies">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
