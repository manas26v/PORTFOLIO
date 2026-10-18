import Link from 'next/link';
import Hero from '@/components/home/Hero';
import Showcase from '@/components/home/Showcase';
import TechStrip from '@/components/home/TechStrip';
import Capabilities from '@/components/home/Capabilities';
import Bento from '@/components/home/Bento';
import WorkGrid from '@/components/projects/WorkGrid';
import PostList from '@/components/blog/PostList';
import ClosingCta from '@/components/ClosingCta';
import { Section } from '@/components/Section';
import { featuredProjects } from '@/data/projects';
import { getAllPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({ path: '/' });

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <Showcase />
      <TechStrip />
      <Capabilities />

      <Section
        id="work"
        title="Selected work, built end to end."
        aside={
          <Link href="/projects/" className="pill-dark">
            All projects
          </Link>
        }
      >
        <WorkGrid projects={featuredProjects} />
      </Section>

      <Bento />

      {posts.length > 0 && (
        <Section
          id="writing"
          title="Notes from the build"
          aside={
            <Link href="/blog/" className="pill-dark">
              All posts
            </Link>
          }
        >
          <PostList posts={posts} />
        </Section>
      )}

      <ClosingCta />
    </>
  );
}
