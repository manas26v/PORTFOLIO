import { ArrowUpRightIcon } from '@/components/Icons';
import type { Project } from '@/data/projects';
import { projectHref } from '@/data/projects';
import ProjectVisual from './ProjectVisual';
import SmartLink from './SmartLink';

/** A cell in the bordered work grid: title, blurb, round arrow link and a visual. */
export default function WorkCell({ project, index, className = '' }: { project: Project; index: number; className?: string }) {
  const href = projectHref(project);
  return (
    <article className={`group relative flex flex-col p-6 sm:p-10 ${className}`}>
      <div className="flex items-start justify-between gap-6">
        <div>
          {project.kind && <p className="mb-2 text-[13px] font-medium text-muted">{project.kind}</p>}
          <h3 className="text-xl font-medium tracking-[-0.01em] sm:text-[22px]">
            <SmartLink href={href} className={href ? 'after:absolute after:inset-0' : ''}>
              {project.title}
            </SmartLink>
          </h3>
          <p className="mt-2 max-w-md text-[17px] leading-relaxed text-muted">{project.description}</p>
        </div>
        {href && (
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-colors group-hover:bg-fg group-hover:text-black"
          >
            <ArrowUpRightIcon size={16} />
          </span>
        )}
      </div>
      <div className="mt-10 flex flex-1 items-end transition-transform duration-500 ease-smooth group-hover:-translate-y-1">
        <div className="w-full">
          <ProjectVisual project={project} index={index} />
        </div>
      </div>
    </article>
  );
}
