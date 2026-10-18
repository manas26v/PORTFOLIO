<div align="center">

# 🚀 Manas Ranjan Barik — Developer Portfolio

A fast, multi-page developer portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS**, statically exported to GitHub Pages. Dark zinc theme, blue accent, and an animated isometric hero.

[![Live Demo](https://img.shields.io/badge/Live_Demo-00C853?style=for-the-badge&logo=github&logoColor=white)](https://manas26v.github.io/PORTFOLIO/)
[![Deploy](https://github.com/manas26v/PORTFOLIO/actions/workflows/deploy.yml/badge.svg)](https://github.com/manas26v/PORTFOLIO/actions/workflows/deploy.yml)

![Next.js](https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?style=flat-square&logo=githubpages&logoColor=white)

**[🌐 View it live → manas26v.github.io/PORTFOLIO](https://manas26v.github.io/PORTFOLIO/)**

<br />

<img src="src/assets/preview.png" alt="Portfolio preview" width="100%" />

</div>

---

## ✨ Features

- 🧭 **Multi-page** — Home, About, Projects (+ detail pages), Blog (+ posts) and Contact
- ⚡ **Static export** — every route is prerendered HTML; only interactive bits (menu, tabs, filters, contact form) ship JS
- 🔎 **SEO built in** — per-page metadata & canonical URLs, Open Graph/Twitter cards, generated OG images, `sitemap.xml`, `robots.txt`, RSS feed, JSON-LD (Person, BlogPosting, SoftwareSourceCode)
- ✍️ **Markdown blog** — frontmatter, reading time, drafts, and build-time syntax highlighting (Shiki)
- ♿ **Accessible** — skip link, keyboard-navigable tabs and menu (focus trap, Escape), visible focus, `prefers-reduced-motion` respected
- 🎨 **Animations** — first-visit logo loader, animated isometric hero, scroll reveals, hover micro-interactions
- 🚀 **Auto-deploy** — every push to `main` is linted, type-checked, built and published by GitHub Actions

---

## 🛠️ Tech Stack

| Layer | Tools |
|---|---|
| **Framework** | Next.js 16 (App Router, `output: 'export'`), React 19 |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS v4 (design tokens in `src/app/globals.css`), `@tailwindcss/typography` |
| **Content** | Typed data modules + Markdown (unified / remark / rehype / Shiki) |
| **Fonts** | `next/font` — Inter, Incognito, GitLab Mono (self-hosted) |
| **Hosting** | GitHub Pages via GitHub Actions |

---

## 🏃 Getting Started

Requires Node.js 20.9+.

```bash
git clone https://github.com/manas26v/PORTFOLIO.git
cd PORTFOLIO
npm install
npm run dev        # → http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static export to `out/` |
| `npm start` | Serve `out/` locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types, then `tsc` |

To preview exactly what GitHub Pages serves (under the `/PORTFOLIO` sub-path):

```bash
NEXT_PUBLIC_BASE_PATH=/PORTFOLIO npm run build
```

---

## 🗂️ Project Structure

```
src/
├── app/                  # Routes (App Router)
│   ├── page.tsx          # Home
│   ├── about/  contact/  # Static pages
│   ├── projects/         # Index + [slug] detail pages
│   ├── blog/             # Index + [slug] posts (+ per-post OG image)
│   ├── sitemap.ts  robots.ts  manifest.ts  feed.xml/  opengraph-image.tsx
│   ├── layout.tsx        # Shell, global metadata, JSON-LD
│   └── globals.css       # Tailwind theme tokens + custom animations
├── components/           # UI (home/, projects/, blog/, contact/, shared)
├── content/blog/         # Markdown posts
├── data/                 # site.ts, experience.ts, projects.ts — all copy lives here
├── lib/                  # blog loader, metadata helper, URL helpers, OG renderer
├── assets/  fonts/
public/                   # Résumé PDF, logo
```

---

## 🎨 Customize

| What | Where |
|---|---|
| Name, email, socials, nav | `src/data/site.ts` |
| Jobs & skills | `src/data/experience.ts` |
| Projects | `src/data/projects.ts` — add `details` to give a project its own page; `featured: true` puts it on the home page |
| Theme colors & fonts | `@theme` block in `src/app/globals.css`, `src/app/fonts.ts` |
| Hero / About copy | `src/components/home/`, `src/app/about/page.tsx` |

### ✍️ Writing a blog post

Add `src/content/blog/my-post.md`:

```md
---
title: My post
description: One-sentence summary used for SEO and social cards.
date: 2026-10-18
tags: [Node.js, PostgreSQL]
draft: false        # true = only visible in npm run dev
---

Markdown content…
```

The URL is `/blog/my-post/`. It's added to the blog index, sitemap and RSS feed, and gets its own OG image automatically.

---

## 🚢 Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push to `main`:

1. `npm ci` → `npm run lint` → `npm run typecheck`
2. `npm run build` with `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` taken from the GitHub Pages config, so the base path always matches the repo name
3. `out/` is published to **GitHub Pages**

> In the repo's **Settings → Pages**, the source must be **GitHub Actions**.

---

## 📫 Connect

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://manas26v.github.io/PORTFOLIO/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manas-ranjan-barik-a2917927a/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/manasvoid0)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mrbarik2002@gmail.com)

<div align="center">
<sub>Built with Next.js · © Manas Ranjan Barik</sub>
</div>
