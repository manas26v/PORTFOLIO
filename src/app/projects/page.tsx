import ClosingCta from '@/components/ClosingCta';
import { PageHeader, Section } from '@/components/Section';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilter from '@/components/projects/ProjectFilter';
import WorkGrid from '@/components/projects/WorkGrid';
import { featuredProjects, otherProjects } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Projects',
  description: 'Projects by Manas Ranjan Barik: a local RAG tutor and plagiarism detector, an ATS résumé builder, and a DuckDB data pipeline.',
  path: '/projects/',
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I've built."
        intro="Local-first AI tools, a résumé builder and data experiments. Each one has a full write-up."
      />

      <div className="container-x">
        <WorkGrid projects={featuredProjects} />
      </div>

      {otherProjects.length > 0 && (
        <Section id="archive" title="Other noteworthy projects">
          <ProjectFilter
            items={otherProjects.map((p) => ({
              key: p.slug,
              tech: p.tech,
              node: <ProjectCard project={p} as="article" />,
            }))}
          />
        </Section>
      )}

      <ClosingCta />
    </>
  );
}
