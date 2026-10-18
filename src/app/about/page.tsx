import Image from 'next/image';
import ClosingCta from '@/components/ClosingCta';
import { PageHeader, Section, TechList } from '@/components/Section';
import photo from '@/assets/about-me.jpg';
import { jobs, skills } from '@/data/experience';
import { siteConfig } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';
import { asset } from '@/lib/url';

export const metadata = pageMetadata({
  title: 'About',
  description: `About ${siteConfig.name}: a software developer focused on scalable backend systems, APIs and databases.`,
  path: '/about/',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Clean code, real business value."
        intro="Software developer building scalable web applications, APIs and backend systems."
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
            <p>
              <span className="text-fg">I&apos;m a Software Developer</span> with experience building scalable web
              applications, APIs, and backend systems. My primary focus is on designing reliable, high-performance
              solutions using Node.js, Express.js, TypeScript, PostgreSQL, and modern JavaScript technologies.
            </p>
            <p>
              Over the past few years, I&apos;ve worked on developing REST APIs, optimizing database operations,
              integrating third-party services, and building systems that support data-driven business workflows. I
              enjoy solving complex technical challenges and creating software that is both maintainable and scalable.
            </p>
            <p>
              Currently, I&apos;m building scalable applications at{' '}
              <a
                href={siteConfig.employer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-line underline-offset-4 hover:decoration-fg"
              >
                {siteConfig.employer.name}
              </a>
              , where I contribute to backend architecture, system integrations, and performance-focused development.
              I&apos;m passionate about clean code, system design, and continuously improving my engineering skills to
              build products that deliver real business value.
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
        <p className="reveal -mt-6 mb-8 text-lg text-muted">Technologies I&apos;ve been working with recently.</p>
        {/* Each cell draws its own 1px ring, so a partly filled last row stays black instead of grey. */}
        <ul className="frame reveal grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((s) => (
            <li
              key={s}
              className="px-6 py-8 font-display text-2xl font-semibold tracking-[-0.03em] shadow-[0_0_0_1px_var(--color-line)]"
            >
              {s}
            </li>
          ))}
        </ul>
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
                <TechList items={skills.slice(0, 4)} className="mt-5" />
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

      <ClosingCta />
    </>
  );
}
