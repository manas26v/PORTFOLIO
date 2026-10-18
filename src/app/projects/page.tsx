import ContactCta from '@/components/ContactCta';
import { PageHeader, Section } from '@/components/Section';
import FeaturedProject from '@/components/projects/FeaturedProject';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilter from '@/components/projects/ProjectFilter';
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
        intro="A selection of work, from local-first AI tooling to backend services. Featured projects have full write-ups."
      />

      <Section id="featured" num="01" title="Featured" className="!pt-10">
        <ul className="space-y-16 md:space-y-28">
          {featuredProjects.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} reversed={i % 2 === 1} />
          ))}
        </ul>
      </Section>

      <Section id="archive" num="02" title="Other Noteworthy Projects">
        <ProjectFilter
          items={otherProjects.map((p) => ({
            key: p.slug,
            tech: p.tech,
            node: <ProjectCard project={p} as="article" />,
          }))}
        />
      </Section>

      <ContactCta />
    </>
  );
}
