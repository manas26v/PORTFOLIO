import Link from 'next/link';
import Hero from '@/components/home/Hero';
import AboutSummary from '@/components/home/AboutSummary';
import ExperienceTabs from '@/components/home/ExperienceTabs';
import FeaturedProject from '@/components/projects/FeaturedProject';
import PostList from '@/components/blog/PostList';
import ContactCta from '@/components/ContactCta';
import { Section } from '@/components/Section';
import { jobs } from '@/data/experience';
import { featuredProjects } from '@/data/projects';
import { getAllPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({ path: '/' });

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <AboutSummary />

      <Section id="experience" num="02" title="Where I've Worked">
        <ExperienceTabs jobs={jobs} />
      </Section>

      <Section id="work" num="03" title="Some Things I've Built">
        <ul className="space-y-16 md:space-y-28">
          {featuredProjects.map((p, i) => (
            <FeaturedProject key={p.slug} project={p} reversed={i % 2 === 1} />
          ))}
        </ul>
        <p className="reveal mt-16 text-center">
          <Link href="/projects/" className="btn">
            View all projects
          </Link>
        </p>
      </Section>

      {posts.length > 0 && (
        <Section id="writing" num="04" title="Latest Writing">
          <PostList posts={posts} />
          <p className="reveal mt-10">
            <Link href="/blog/" className="inline-link font-mono text-sm">
              Read all posts →
            </Link>
          </p>
        </Section>
      )}

      <ContactCta num={posts.length > 0 ? '05' : '04'} />
    </>
  );
}
