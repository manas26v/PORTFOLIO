import { ExternalIcon, GitHubIcon } from '@/components/Icons';
import type { Project } from '@/data/projects';

export default function ProjectLinks({ project, className = '' }: { project: Project; className?: string }) {
  if (!project.github && !project.external) return null;
  const link = 'relative z-20 flex p-2 text-muted transition-colors hover:text-fg';
  return (
    <div className={`flex items-center ${className}`}>
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className={link}>
          <GitHubIcon size={18} />
        </a>
      )}
      {project.external && (
        <a href={project.external} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live site`} className={link}>
          <ExternalIcon size={18} />
        </a>
      )}
    </div>
  );
}
