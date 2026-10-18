import Link from 'next/link';
import { formatDate, type PostMeta } from '@/lib/blog';

export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) {
    return <p className="reveal font-mono text-sm">No posts yet. Check back soon.</p>;
  }
  return (
    <ul className="divide-y divide-line border-y border-line">
      {posts.map((post) => (
        <li key={post.slug} className="reveal group relative py-8">
          <div className="flex flex-col gap-1 font-mono text-[13px] text-muted sm:flex-row sm:gap-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span>{post.readingTime}</span>
          </div>
          <h3 className="mt-2 font-mono text-xl font-semibold text-fg transition-colors group-hover:text-accent sm:text-2xl">
            <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 max-w-2xl text-soft">{post.description}</p>
          {post.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t} className="rounded-full bg-accent-tint px-3 py-1 font-mono text-xs text-accent">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
