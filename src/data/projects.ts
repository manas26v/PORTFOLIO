export type Project = {
  slug: string;
  title: string;
  description: string;
  /** Long-form write-up. Projects with details get their own /projects/[slug] page. */
  details?: string[];
  tech: string[];
  github?: string;
  external?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'rag-plagiarism-detector',
    title: 'RAG & Plagiarism Detector',
    featured: true,
    description:
      'A 100% local, no-API AI suite combining a RAG science tutor with a plagiarism & AI-content detector that scores student work for academic integrity — all running on Ollama.',
    details: [
      'This project is a fully local AI suite that runs entirely on Ollama (using the qwen2.5:7b language model and nomic-embed-text embeddings) with no paid APIs, cloud calls, or external downloads — making it private, free, and offline-capable. It bundles two tools under a single dashboard.',
      "The first is a RAG-based science tutor. It builds a FAISS vector index from a textbook PDF, then answers student questions by retrieving the most relevant passages and feeding them to the LLM, grounding every response in the source material rather than relying on the model's memory.",
      'The second is a plagiarism and academic-integrity checker for teachers. Students upload assignments (PDF, DOCX, or PPTX), and for each submission the system runs four checks: an AI-detection pass where Qwen judges whether the text was machine-written, a TF-IDF copy check comparing students against each other, an embedding-based paraphrase check that catches reworded copying, and an originality score rewarding genuine work. Each student receives an integrity score from 0–100 plus a saved JSON report, and the teacher views results in a color-coded dashboard with drill-down per student.',
      'Built with Python, Streamlit, FastAPI, and FAISS.',
    ],
    tech: ['Python', 'Ollama', 'FAISS', 'Streamlit'],
    github: 'https://github.com/manasvoid0/SCIENCE_RAG_PROJECT',
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    featured: true,
    description:
      'An open-source design system and component library built for speed and accessibility. Includes themeable primitives, documentation, and a playground for rapid prototyping.',
    tech: ['React', 'Storybook', 'Tailwind CSS'],
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    featured: true,
    description:
      'A real-time collaborative editor with presence, comments, and version history. Built on a CRDT-backed sync engine for conflict-free editing across many simultaneous users.',
    tech: ['TypeScript', 'WebSockets', 'Postgres'],
  },
  {
    slug: 'spotify-connected-app',
    title: 'Build a Spotify Connected App',
    description:
      'Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, and more.',
    tech: ['React', 'Express', 'Spotify API'],
  },
  {
    slug: 'algolia-search',
    title: 'Integrating Algolia Search',
    description:
      'Building a custom search component that integrates Algolia, a powerful and fast search service for websites and applications.',
    tech: ['Algolia', 'React', 'Node.js'],
  },
  {
    slug: 'time-to-have-more-fun',
    title: 'Time to Have More Fun',
    description:
      'A single page web app for helping me choose where to travel, built with Next.js, Firebase, and Tailwind CSS.',
    tech: ['Next.js', 'Firebase', 'Tailwind'],
  },
  {
    slug: 'headless-cms',
    title: 'Building a Headless CMS',
    description:
      'A starter template for spinning up a headless content platform with a modern editing experience and instant previews.',
    tech: ['GraphQL', 'Gatsby', 'Contentful'],
  },
  {
    slug: 'octoprofile',
    title: 'OctoProfile',
    description:
      'A nicer look at your GitHub profile and repo stats. Includes data visualizations of your top languages and starred repositories.',
    tech: ['Next.js', 'Chart.js', 'GitHub API'],
  },
  {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    description:
      'A clean, responsive weather dashboard with location search, hourly forecasts, and animated condition icons.',
    tech: ['Vue', 'OpenWeather', 'Vite'],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const detailedProjects = projects.filter((p) => p.details?.length);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Where a project's title should link: its own page, else its live site, else its repo. */
export function projectHref(p: Project) {
  if (p.details?.length) return `/projects/${p.slug}/`;
  return p.external || p.github;
}
