import type { Project } from '@/data/projects';
import { projectHref } from '@/data/projects';
import { TechList } from '@/components/Section';
import ProjectArt from './ProjectArt';
import ProjectLinks from './ProjectLinks';
import SmartLink from './SmartLink';

/** Large alternating project row: overlapping text panel and preview art. */
export default function FeaturedProject({ project, reversed }: { project: Project; reversed?: boolean }) {
  const href = projectHref(project);
  return (
    <li className="reveal group relative grid items-center rounded bg-surface p-7 shadow-panel md:grid-cols-12 md:bg-transparent md:p-0 md:shadow-none">
      <div
        className={`relative z-10 md:row-start-1 ${reversed ? 'md:col-span-6 md:col-start-7 md:text-right' : 'md:col-span-6 md:col-start-1'}`}
      >
        <p className="my-2.5 font-mono text-[13px] text-accent">Featured Project</p>
        <h3 className="mb-5 font-mono text-2xl font-semibold text-fg sm:text-[28px]">
          <SmartLink href={href} className="transition-colors after:absolute after:inset-0 hover:text-accent md:after:hidden">
            {project.title}
          </SmartLink>
        </h3>
        <div className="relative z-20 text-lg leading-relaxed text-soft md:rounded md:bg-surface md:p-6 md:shadow-panel">
          <p>{project.description}</p>
        </div>
        <TechList items={project.tech} className={`mt-6 ${reversed ? 'md:justify-end' : ''}`} />
        <ProjectLinks project={project} className={`-ml-2.5 mt-2 ${reversed ? 'md:-mr-2.5 md:ml-0 md:justify-end' : ''}`} />
      </div>
      <div
        className={`hidden md:row-start-1 md:block ${reversed ? 'md:col-span-7 md:col-start-1' : 'md:col-span-7 md:col-start-6'}`}
      >
        <SmartLink href={href} tabIndex={-1} aria-hidden="true" className="block opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          <ProjectArt project={project} />
        </SmartLink>
      </div>
    </li>
  );
}
