import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

const POSTS_DIR = path.join(process.cwd(), 'src/content/blog');

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  readingTime: string;
};

export type Post = PostMeta & { html: string };

type Frontmatter = {
  title?: string;
  description?: string;
  date?: string | Date;
  updated?: string | Date;
  tags?: string[];
  draft?: boolean;
};

const toISO = (d: string | Date) => new Date(d).toISOString().slice(0, 10);

function readPost(file: string) {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;

  if (!fm.title || !fm.date || !fm.description) {
    throw new Error(`Post "${file}" needs title, description and date in its frontmatter.`);
  }

  const meta: PostMeta = {
    slug,
    title: fm.title,
    description: fm.description,
    date: toISO(fm.date),
    updated: fm.updated ? toISO(fm.updated) : undefined,
    tags: fm.tags ?? [],
    readingTime: readingTime(content).text,
  };
  return { meta, content, draft: Boolean(fm.draft) };
}

/** Published posts, newest first. Drafts show up in `next dev` only. */
export const getAllPosts = cache((): PostMeta[] => {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const showDrafts = process.env.NODE_ENV === 'development';
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(readPost)
    .filter((p) => showDrafts || !p.draft)
    .map((p) => p.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getPost = cache(async (slug: string): Promise<Post | undefined> => {
  if (!getAllPosts().some((p) => p.slug === slug)) return undefined;
  const { meta, content } = readPost(`${slug}.md`);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypePrettyCode, { theme: 'github-dark-dimmed', keepBackground: false })
    .use(rehypeStringify)
    .process(content);

  return { ...meta, html: String(file) };
});

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
