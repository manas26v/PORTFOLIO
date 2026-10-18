import ClosingCta from '@/components/ClosingCta';
import { PageHeader, Section } from '@/components/Section';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilter from '@/components/projects/ProjectFilter';
import WorkGrid from '@/components/projects/WorkGrid';
import { featuredProjects, otherProjects } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Projects',
  description: 'Selected projects: local-first AI tools, backend systems and web applications.',
  path: '/projects/',
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I've built."
        intro="From local-first AI tooling to backend services. Featured projects have full write-ups."
      />

      <div className="container-x">
        <WorkGrid projects={featuredProjects} />
      </div>

      <Section id="archive" title="Other noteworthy projects">
        <ProjectFilter
          items={otherProjects.map((p) => ({
            key: p.slug,
            tech: p.tech,
            node: <ProjectCard project={p} as="article" />,
          }))}
        />
      </Section>

      <ClosingCta />
    </>
  );
}
