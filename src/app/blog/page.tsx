import PostList from '@/components/blog/PostList';
import { RssIcon } from '@/components/Icons';
import { PageHeader } from '@/components/Section';
import { siteConfig } from '@/data/site';
import { getAllPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Blog',
  description: `Notes on backend engineering, databases and building software by ${siteConfig.name}.`,
  path: '/blog/',
});

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Writing."
        intro={
          <>
            Notes on backend engineering, databases and the things I learn along the way.{' '}
            <a href={`${siteConfig.basePath}/feed.xml`} className="inline-link inline-flex items-center gap-1.5">
              <RssIcon size={16} /> RSS
            </a>
          </>
        }
      />
      <section aria-label="All posts" className="pb-24 pt-10">
        <PostList posts={posts} />
      </section>
    </>
  );
}
