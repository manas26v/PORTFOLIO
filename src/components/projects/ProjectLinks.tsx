import { ExternalIcon, GitHubIcon } from '@/components/Icons';
import type { Project } from '@/data/projects';

export default function ProjectLinks({ project, className = '' }: { project: Project; className?: string }) {
  if (!project.github && !project.external) return null;
  return (
    <div className={`relative z-20 flex items-center text-soft ${className}`}>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="flex p-2.5 transition-colors hover:text-accent"
        >
          <GitHubIcon />
        </a>
      )}
      {project.external && (
        <a
          href={project.external}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live site`}
          className="flex p-2.5 transition-colors hover:text-accent"
        >
          <ExternalIcon />
        </a>
      )}
    </div>
  );
}
