import type { Project } from '@/data/projects';

/**
 * Decorative "editor window" preview generated from the project's own data,
 * so every project gets a consistent visual without needing a screenshot.
 */
export default function ProjectArt({ project }: { project: Project }) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/10] w-full overflow-hidden rounded border border-line bg-gradient-to-br from-line via-surface to-bg shadow-panel"
    >
      <div
        className="absolute inset-0 opacity-[0.15] transition-opacity duration-500 group-hover:opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 70% 30%, black 20%, transparent 70%)',
        }}
      />
      <div className="absolute -right-16 -top-16 size-56 rounded-full bg-accent/20 blur-3xl transition-transform duration-700 ease-smooth group-hover:scale-125" />
      <div className="absolute -bottom-20 -left-10 size-48 rounded-full bg-warm/10 blur-3xl" />

      <div className="relative flex items-center gap-1.5 border-b border-line/70 bg-bg/40 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 truncate font-mono text-[11px] text-muted">~/projects/{project.slug}</span>
      </div>
      <div className="relative space-y-2 p-5 font-mono text-[12px] leading-relaxed sm:p-7 sm:text-[13px]">
        <p>
          <span className="text-warm">const</span> <span className="text-fg">project</span> ={' '}
          <span className="text-soft">{'{'}</span>
        </p>
        <p className="pl-5">
          <span className="text-muted">name:</span> <span className="text-accent">&apos;{project.title}&apos;</span>,
        </p>
        <p className="pl-5">
          <span className="text-muted">stack:</span> <span className="text-soft">[</span>
          {project.tech.map((t, i) => (
            <span key={t}>
              <span className="text-accent">&apos;{t}&apos;</span>
              {i < project.tech.length - 1 && <span className="text-soft">, </span>}
            </span>
          ))}
          <span className="text-soft">]</span>,
        </p>
        <p>
          <span className="text-soft">{'}'}</span>
          <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent/80" />
        </p>
      </div>
    </div>
  );
}
