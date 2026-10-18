import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import ClosingCta from '@/components/ClosingCta';
import { ArrowLeftIcon, ExternalIcon, GitHubIcon } from '@/components/Icons';
import { TechList } from '@/components/Section';
import ProjectVisual from '@/components/projects/ProjectVisual';
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
    <>
      <article className="container-x pb-10 pt-32 md:pt-40">
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

        <Link href="/projects/" className="fade-up inline-flex items-center gap-2 text-[15px] text-muted hover:text-fg">
          <ArrowLeftIcon size={16} /> All projects
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <h1 className="fade-up display-xl" style={{ '--d': 1 } as React.CSSProperties}>
              {project.title}
            </h1>
          </div>
          <div className="fade-up" style={{ '--d': 2 } as React.CSSProperties}>
            <p className="text-lg font-medium leading-snug text-muted sm:text-xl">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="pill-light">
                  <GitHubIcon size={16} /> View on GitHub
                </a>
              )}
              {project.external && (
                <a href={project.external} target="_blank" rel="noopener noreferrer" className="pill-dark">
                  <ExternalIcon size={16} /> Live site
                </a>
              )}
            </div>
          </div>
        </header>

        <div className="reveal mt-16 rounded-2xl border border-line bg-[radial-gradient(70%_90%_at_50%_100%,oklch(40%_0.2_262/0.5),transparent)] p-6 sm:p-16">
          <div className="mx-auto max-w-3xl">
            <ProjectVisual project={project} />
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <aside className="reveal">
            <p className="eyebrow">Stack</p>
            <TechList items={project.tech} className="mt-4" />
          </aside>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            {project.details.map((para, i) => (
              <p key={para} className={`reveal ${i === 0 ? 'text-fg' : ''}`}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>
      <ClosingCta />
    </>
  );
}
