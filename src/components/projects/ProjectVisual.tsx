import type { Project } from '@/data/projects';

const palettes = [
  'from-[#1e3a8a] to-[#020617]',
  'from-[#4c1d95] to-[#020617]',
  'from-[#064e3b] to-[#020617]',
  'from-[#7c2d12] to-[#020617]',
];

/** Terminal-style mock generated from the project's own data. Decorative. */
export default function ProjectVisual({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-[10px] border border-panel-line bg-panel shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2 border-b border-panel-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[12px] text-muted">{project.slug}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted">
          <span className="size-1.5 rounded-full bg-brand-green" /> running
        </span>
      </div>
      <div className={`bg-gradient-to-br p-5 font-mono text-[12.5px] leading-relaxed ${palettes[index % palettes.length]}`}>
        <p className="text-faint">$ {project.tech[0]?.toLowerCase().replace(/\s/g, '-') ?? 'app'} start</p>
        <p className="mt-2 text-fg">
          <span className="text-muted">&gt;</span> {project.title}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="rounded bg-white/10 px-1.5 py-0.5 text-[11.5px] text-fg">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-3 text-muted">
          Ready<span className="text-faint"> in {120 + ((project.slug.length * 37) % 600)} ms</span>
        </p>
      </div>
    </div>
  );
}
