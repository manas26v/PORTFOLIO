export type Job = {
  company: string;
  title: string;
  url: string;
  range: string;
  points: string[];
};

export const skills = [
  'Node.js',
  'Express.js',
  'TypeScript',
  'PostgreSQL',
  'JavaScript',
  'Python',
  'FastAPI',
];

// Most recent first. Add new roles at the top.
export const jobs: Job[] = [
  {
    company: 'DataCaffe.ai',
    title: 'Software Developer',
    url: 'https://datacaffe.ai',
    range: 'December 2024 - Present',
    points: [
      'Developed and maintained scalable backend applications and REST APIs using Node.js, Express.js, TypeScript, and PostgreSQL, delivering reliable solutions for production environments.',
      'Designed and implemented APIs to integrate multiple data sources, including Snowflake, PostgreSQL, and Excel, enabling seamless data flow and reporting across business systems.',
      'Implemented PostgreSQL Row-Level Security (RLS) policies to enforce tenant-level data isolation and strengthen security within multi-tenant applications.',
      'Collaborated with product teams, analysts, and stakeholders to translate business requirements into scalable technical solutions and system architectures.',
      'Optimized backend services, database queries, and application performance while contributing to code reviews, architecture discussions, and knowledge-sharing initiatives across the engineering team.',
    ],
  },
];
