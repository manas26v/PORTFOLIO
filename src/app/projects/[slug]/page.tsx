import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { ArrowLeftIcon, ExternalIcon, GitHubIcon } from '@/components/Icons';
import { TechList } from '@/components/Section';
import ProjectArt from '@/components/projects/ProjectArt';
import { detailedProjects, getProject } from '@/data/projects';
import { siteConfig } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/url';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return detailedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({ title: project.title, description: project.description, path: `/projects/${project.slug}/` });
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project?.details) notFound();

  return (
    <article className="mx-auto max-w-3xl pb-16 pt-36 md:pt-44">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: project.title,
          description: project.description,
          url: absoluteUrl(`/projects/${project.slug}/`),
          codeRepository: project.github,
          programmingLanguage: project.tech,
          author: { '@type': 'Person', name: siteConfig.name, url: absoluteUrl('/') },
        }}
      />

      <Link href="/projects/" className="reveal inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline">
        <ArrowLeftIcon size={16} /> All projects
      </Link>

      <header className="mt-8">
        <p className="reveal font-mono text-[13px] text-accent">Featured Project</p>
        <h1 className="reveal mt-3 font-display text-[clamp(36px,6vw,60px)] font-bold leading-[1.05] text-fg">
          {project.title}
        </h1>
        <p className="reveal mt-5 text-xl leading-relaxed text-soft">{project.description}</p>
        <TechList items={project.tech} className="reveal mt-6" />
        <div className="reveal mt-8 flex flex-wrap gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn">
              <GitHubIcon size={16} /> View on GitHub
            </a>
          )}
          {project.external && (
            <a href={project.external} target="_blank" rel="noopener noreferrer" className="btn">
              <ExternalIcon size={16} /> Live site
            </a>
          )}
        </div>
      </header>

      <div className="reveal my-14">
        <ProjectArt project={project} />
      </div>

      <div className="space-y-5 text-lg leading-relaxed text-soft">
        {project.details.map((para) => (
          <p key={para} className="reveal">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
}
