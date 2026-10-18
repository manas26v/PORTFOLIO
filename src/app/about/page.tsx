import AboutPhoto from '@/components/AboutPhoto';
import ContactCta from '@/components/ContactCta';
import { DownloadIcon } from '@/components/Icons';
import { PageHeader, Section } from '@/components/Section';
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
      <PageHeader eyebrow="About" title="Building reliable systems behind great products." />

      <Section id="bio" num="01" title="Who I Am" className="!pt-10">
        <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
          <div className="reveal space-y-4 text-lg leading-relaxed">
            <p>
              I&apos;m a Software Developer with experience building scalable web applications, APIs, and backend
              systems. My primary focus is on designing reliable, high-performance solutions using Node.js, Express.js,
              TypeScript, PostgreSQL, and modern JavaScript technologies.
            </p>
            <p>
              Over the past few years, I&apos;ve worked on developing REST APIs, optimizing database operations,
              integrating third-party services, and building systems that support data-driven business workflows. I
              enjoy solving complex technical challenges and creating software that is both maintainable and scalable.
            </p>
            <p>
              Currently, I&apos;m building scalable applications at{' '}
              <a href={siteConfig.employer.url} target="_blank" rel="noopener noreferrer" className="inline-link">
                {siteConfig.employer.name}
              </a>
              , where I contribute to backend architecture, system integrations, and performance-focused development.
              I&apos;m passionate about clean code, system design, and continuously improving my engineering skills to
              build products that deliver real business value.
            </p>
            <p className="pt-4">
              <a href={asset(siteConfig.resume)} className="btn" download target="_blank" rel="noopener noreferrer">
                <DownloadIcon size={16} /> Download résumé
              </a>
            </p>
          </div>
          <AboutPhoto className="reveal" />
        </div>
      </Section>

      <Section id="skills" num="02" title="Toolbox">
        <p className="reveal mb-6 text-lg">Here are a few technologies I&apos;ve been working with recently:</p>
        <ul className="reveal flex flex-wrap gap-3">
          {skills.map((s) => (
            <li key={s} className="rounded border border-line bg-surface px-4 py-2 font-mono text-sm text-soft">
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="experience" num="03" title="Experience">
        <ol className="relative space-y-12 border-l border-line pl-8">
          {jobs.map((job) => (
            <li key={job.company} className="reveal relative">
              <span
                aria-hidden="true"
                className="absolute -left-[37px] top-1.5 size-3 rounded-full border-2 border-accent bg-bg"
              />
              <p className="font-mono text-[13px] text-soft">{job.range}</p>
              <h3 className="mt-1 text-xl font-medium text-fg">
                {job.title}{' '}
                <span className="text-accent">
                  @{' '}
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="inline-link">
                    {job.company}
                  </a>
                </span>
              </h3>
              <ul className="arrow-list mt-5 space-y-2.5 text-lg leading-relaxed">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <ContactCta />
    </>
  );
}
