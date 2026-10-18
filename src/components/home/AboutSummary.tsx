import Link from 'next/link';
import AboutPhoto from '@/components/AboutPhoto';
import { Section } from '@/components/Section';
import { skills } from '@/data/experience';
import { siteConfig } from '@/data/site';

export default function AboutSummary() {
  return (
    <Section id="about" num="01" title="About Me">
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <div className="reveal space-y-4 text-lg leading-relaxed">
          <p>
            I&apos;m a Software Developer with experience building scalable web applications, APIs, and backend systems.
            My primary focus is on designing reliable, high-performance solutions using Node.js, Express.js, TypeScript,
            PostgreSQL, and modern JavaScript technologies.
          </p>
          <p>
            Currently, I&apos;m building scalable applications at{' '}
            <a href={siteConfig.employer.url} target="_blank" rel="noopener noreferrer" className="inline-link">
              {siteConfig.employer.name}
            </a>
            , where I contribute to backend architecture, system integrations, and performance-focused development.
          </p>
          <p>Here are a few technologies I&apos;ve been working with recently:</p>
          <ul className="arrow-list grid max-w-md grid-cols-2 gap-x-2.5 gap-y-2 font-mono text-[13px]">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="pt-2">
            <Link href="/about/" className="inline-link font-mono text-sm">
              More about me →
            </Link>
          </p>
        </div>
        <AboutPhoto className="reveal" />
      </div>
    </Section>
  );
}
