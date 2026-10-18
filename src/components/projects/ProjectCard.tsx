import { FolderIcon } from '@/components/Icons';
import { TechList } from '@/components/Section';
import type { Project } from '@/data/projects';
import { projectHref } from '@/data/projects';
import ProjectLinks from './ProjectLinks';
import SmartLink from './SmartLink';

/** Compact grid card. The title link stretches over the whole card. */
export default function ProjectCard({ project, as: Tag = 'li' }: { project: Project; as?: 'li' | 'article' }) {
  const href = projectHref(project);
  return (
    <Tag className="reveal group relative flex h-full flex-col justify-between rounded bg-surface px-7 py-8 text-left shadow-panel transition-transform duration-300 ease-smooth focus-within:-translate-y-1.5 hover:-translate-y-1.5">
      <div>
        <div className="mb-8 flex items-center justify-between">
          <FolderIcon className="text-accent" />
          <ProjectLinks project={project} className="-mr-2.5" />
        </div>
        <h3 className="mb-2.5 font-mono text-xl font-semibold text-fg transition-colors group-hover:text-accent">
          <SmartLink href={href} className={href ? 'after:absolute after:inset-0 after:z-10' : ''}>
            {project.title}
          </SmartLink>
        </h3>
        <p className="text-[17px] leading-relaxed text-soft">{project.description}</p>
      </div>
      <TechList items={project.tech} className="mt-6" />
    </Tag>
  );
}
