import Image from 'next/image';
import ClosingCta from '@/components/ClosingCta';
import { PageHeader, Section, TechList } from '@/components/Section';
import photo from '@/assets/about-me.jpg';
import { education, jobs, skillGroups, summary } from '@/data/experience';
import { siteConfig } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';
import { asset } from '@/lib/url';

export const metadata = pageMetadata({
  title: 'About',
  description: `About ${siteConfig.name}: a full stack developer building multi-tenant SaaS and AI-enabled applications.`,
  path: '/about/',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="SaaS and AI, built end to end."
        intro={`Full stack developer in ${siteConfig.location}, building multi-tenant SaaS and AI-enabled applications.`}
      />

      <div className="container-x">
        <div className="frame reveal grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="relative min-h-[360px] border-line lg:border-r">
            <Image
              src={photo}
              alt={`Portrait of ${siteConfig.name}`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              priority
              className="object-cover"
            />
          </div>
          <div className="space-y-5 border-t border-line p-6 text-[17px] leading-relaxed text-muted sm:p-10 lg:border-t-0">
            <p className="text-fg">{summary}</p>
            <p>
              At{' '}
              <a
                href={siteConfig.employer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-line underline-offset-4 hover:decoration-fg"
              >
                {siteConfig.employer.name}
              </a>{' '}
              I build backend services for Breww.ai, a multi-tenant AI chat application: conversation processing, LLM
              integrations and tool execution, plus the access control, usage tracking and data integrations around them.
            </p>
            <p>
              Outside work I build local-first AI tools — a RAG tutor with a plagiarism detector, and an ATS résumé
              builder — and data experiments with DuckDB and Parquet.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <a href={asset(siteConfig.resume)} target="_blank" rel="noopener noreferrer" className="pill-light">
                Download résumé
              </a>
              <a href={`mailto:${siteConfig.email}`} className="pill-dark">
                Email me
              </a>
            </div>
          </div>
        </div>
      </div>

      <Section id="toolbox" title="Toolbox">
        <dl className="frame reveal">
          {skillGroups.map((g, i) => (
            <div
              key={g.label}
              className={`grid gap-3 p-6 sm:grid-cols-[200px_1fr] sm:items-center sm:p-8 ${i > 0 ? 'border-t border-line' : ''}`}
            >
              <dt className="text-[15px] font-medium text-muted">{g.label}</dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-2">
                {g.items.map((item) => (
                  <span key={item} className="font-display text-2xl font-semibold tracking-[-0.03em]">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="experience" title="Experience">
        <ol className="frame">
          {jobs.map((job, i) => (
            <li key={job.company} className={`reveal grid gap-6 p-6 sm:p-10 lg:grid-cols-[260px_1fr] ${i > 0 ? 'border-t border-line' : ''}`}>
              <div>
                <p className="text-[15px] text-muted">{job.range}</p>
                <h3 className="mt-2 text-xl font-medium">{job.title}</h3>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline decoration-line underline-offset-4 hover:text-fg"
                >
                  {job.company}
                </a>
                <p className="text-[15px] text-faint">{job.location}</p>
                <TechList items={['TypeScript', 'NestJS', 'React', 'PostgreSQL']} className="mt-5" />
              </div>
              <ul className="space-y-4">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[17px] leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="education" title="Education">
        <div className="frame reveal grid gap-3 p-6 sm:grid-cols-[260px_1fr] sm:p-10">
          <p className="text-[15px] text-muted">{education.range}</p>
          <div>
            <h3 className="text-xl font-medium">{education.degree}</h3>
            <p className="mt-1 text-muted">
              {education.school} · {education.location}
            </p>
            <p className="mt-3 text-[15px] text-faint">{education.grade}</p>
          </div>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
