import { ArrowUpRightIcon } from '@/components/Icons';
import { TechList } from '@/components/Section';
import type { Project } from '@/data/projects';
import { projectHref } from '@/data/projects';
import ProjectLinks from './ProjectLinks';
import SmartLink from './SmartLink';

/** Compact card for the archive grid. The title link stretches over the card. */
export default function ProjectCard({ project, as: Tag = 'li' }: { project: Project; as?: 'li' | 'article' }) {
  const href = projectHref(project);
  return (
    <Tag className="reveal group relative flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-[#3a3a3e] hover:bg-[#141416]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium tracking-[-0.01em]">
          <SmartLink href={href} className={href ? 'after:absolute after:inset-0 after:z-10' : ''}>
            {project.title}
          </SmartLink>
        </h3>
        {href ? (
          <ArrowUpRightIcon size={16} className="mt-1 shrink-0 text-muted transition-colors group-hover:text-fg" />
        ) : (
          <ProjectLinks project={project} className="-mr-2 -mt-2" />
        )}
      </div>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{project.description}</p>
      <TechList items={project.tech} className="mt-6" />
    </Tag>
  );
}
