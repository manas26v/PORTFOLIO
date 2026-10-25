export type Project = {
  slug: string;
  title: string;
  /** e.g. "Independent Project", shown above the title. */
  kind?: string;
  description: string;
  /** Long-form write-up. Projects with details get their own /projects/[slug] page. */
  details?: string[];
  tech: string[];
  github?: string;
  external?: string;
  featured?: boolean;
};

// From the résumé. Projects with `details` get their own /projects/[slug] page.
export const projects: Project[] = [
  {
    slug: 'rag-plagiarism-detector',
    title: 'RAG Tutor & Plagiarism Detector',
    kind: 'Independent Project',
    featured: true,
    description:
      'A local AI dashboard combining a RAG-based science tutor with a plagiarism and AI-content checker that gives student work a 0–100 integrity score, all running on Ollama.',
    details: [
      'Built a local AI dashboard combining a RAG-based science tutor and plagiarism analysis system using Python, FastAPI, Streamlit, FAISS, and Ollama. It runs entirely on local models (qwen2.5:7b and nomic-embed-text embeddings) with no paid APIs or cloud calls, so it is private, free and works offline.',
      "The tutor builds a FAISS vector index from a textbook PDF, then answers questions by retrieving the most relevant passages and feeding them to the LLM, grounding every response in the indexed source material rather than the model's memory.",
      'The plagiarism pipeline combines TF-IDF similarity between submissions, embedding-based paraphrase detection that catches reworded copying, and LLM-based AI-text classification to generate a 0–100 integrity score per student, with a saved JSON report and a colour-coded dashboard for teachers.',
      'Q&A and analysis run locally on Ollama models, with fallback handling when the model services are unavailable.',
    ],
    tech: ['Python', 'FastAPI', 'Embeddings', 'FAISS', 'Ollama', 'Streamlit'],
    github: 'https://github.com/manas26v/SCIENCE_RAG_PROJECT',
  },
  {
    slug: 'resbuild',
    title: 'ResBuild – ATS Resume Builder',
    kind: 'Independent Project',
    featured: true,
    description:
      'A Flask web app that scores a résumé against a job description and generates a tailored, single-column Word résumé — with OpenAI or fully offline.',
    details: [
      'Built a Flask web application that parses PDF, DOCX, and TXT résumés, compares them against job descriptions using keyword-based ATS scoring, and generates single-column Word résumés tailored to target roles.',
      'Implemented offline and OpenAI-powered generation modes with before/after match scores, matched and missing keyword analysis, DOCX generation, and automatic fallback to local processing when the OpenAI service is unavailable.',
    ],
    tech: ['Python', 'Flask', 'OpenAI API'],
    github: 'https://github.com/manas26v/resbuild',
  },
  {
    slug: 'excel-to-parquet',
    title: 'Excel-to-Parquet Query Pipeline',
    kind: 'Personal Project',
    featured: true,
    description:
      'A data-processing prototype that converts Excel sheets into Parquet for efficient local storage, then queries them with DuckDB.',
    details: [
      'Built a data-processing prototype that converted Excel sheets into Parquet files for more efficient local storage and querying.',
      'Queried the generated Parquet datasets using DuckDB to validate data access and transformation workflows.',
    ],
    tech: ['DuckDB', 'Parquet', 'Excel'],
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
