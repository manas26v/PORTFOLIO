import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { ArrowLeftIcon } from '@/components/Icons';
import { siteConfig } from '@/data/site';
import { formatDate, getAllPosts, getPost } from '@/lib/blog';
import { pageMetadata } from '@/lib/metadata';
import { absoluteUrl } from '@/lib/url';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    tags: post.tags,
    image: `/blog/${post.slug}/opengraph-image.png`,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = all[i - 1];
  const older = all[i + 1];

  return (
    <article className="container-x max-w-[calc(720px+5rem)] pb-16 pt-32 md:pt-40">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          url: absoluteUrl(`/blog/${post.slug}/`),
          image: absoluteUrl(`/blog/${post.slug}/opengraph-image.png`),
          keywords: post.tags.join(', '),
          author: { '@type': 'Person', name: siteConfig.name, url: absoluteUrl('/') },
        }}
      />

      <Link href="/blog/" className="fade-up inline-flex items-center gap-2 text-[15px] text-muted hover:text-fg">
        <ArrowLeftIcon size={16} /> All posts
      </Link>

      <header className="mb-12 mt-10 border-b border-line pb-10">
        <div className="fade-up flex flex-wrap gap-x-3 gap-y-1 text-[15px] text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          {post.updated && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </span>
            </>
          )}
        </div>
        <h1 className="fade-up display-lg mt-5">
          {post.title}
        </h1>
        <p className="fade-up mt-6 text-xl font-medium leading-snug text-muted">{post.description}</p>
        {post.tags.length > 0 && (
          <ul className="fade-up mt-6 flex flex-wrap gap-1.5" aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full bg-pill px-3 py-1 text-[13px] text-muted">
                {t}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="prose-portfolio" dangerouslySetInnerHTML={{ __html: post.html }} />

      {(newer || older) && (
        <nav aria-label="More posts" className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}/`} className="group rounded-2xl border border-line p-6 transition-colors hover:bg-panel">
              <span className="text-[13px] text-muted">← Older</span>
              <span className="mt-1 block text-lg font-medium">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/blog/${newer.slug}/`} className="group rounded-2xl border border-line p-6 text-right transition-colors hover:bg-panel">
              <span className="text-[13px] text-muted">Newer →</span>
              <span className="mt-1 block text-lg font-medium">{newer.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
