---
title: Rebuilding my portfolio with Next.js
description: Why I moved my portfolio from a single-page Vite app to a statically exported Next.js site on GitHub Pages, and what I learned along the way.
date: 2026-10-18
tags: [Next.js, TypeScript, GitHub Pages]
---

My portfolio started life as a single-page React app built with Vite. It worked well, but every
section lived on one URL, which meant there was nowhere to put longer project write-ups or blog
posts, and search engines only ever saw one page.

So I rebuilt it with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS**, while keeping
it on **GitHub Pages**.

## Static export keeps hosting simple

GitHub Pages only serves files, so there's no server to run React Server Components on demand.
Next.js handles this with static export: every route is rendered to HTML at build time.

```ts title="next.config.ts"
const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  trailingSlash: true,
  images: { unoptimized: true },
};
```

The `basePath` matters because a project site is served from a sub-path like `/PORTFOLIO/`.
Rather than hard-coding it, the GitHub Actions workflow reads it from the Pages configuration, so
the site keeps working even if the repository is renamed.

## What I got for free

- **Real pages** for About, Projects, Blog and Contact, each with its own title, description and
  canonical URL.
- **A sitemap, RSS feed and Open Graph images** generated at build time.
- **Zero-JS content**: pages are plain HTML, and only interactive bits like the experience tabs
  and the mobile menu ship JavaScript.

## Writing posts

Posts are Markdown files with a bit of frontmatter. Code blocks are highlighted at build time, so
there's no syntax-highlighting library in the browser bundle.

That's it for now. More soon.
