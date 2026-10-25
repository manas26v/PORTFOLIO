// Mirrors the résumé (public/Manas_Ranjan_Barik_Resume.pdf). Update both together.

export type Job = {
  company: string;
  title: string;
  url: string;
  location: string;
  range: string;
  points: string[];
};

/** Headline skills, used where a short list fits (home page, cards). */
export const skills = ['TypeScript', 'Node.js', 'NestJS', 'React', 'PostgreSQL', 'Python', 'Redis', 'Snowflake'];

/** Full skill set, grouped as on the résumé. */
export const skillGroups: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL'] },
  { label: 'Frontend', items: ['React'] },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'Microservices', 'LLM Integration', 'Tool Execution'],
  },
  { label: 'Databases', items: ['PostgreSQL', 'Redis', 'Snowflake', 'DuckDB'] },
  { label: 'Tools', items: ['Git', 'Prisma', 'TypeORM'] },
];

/** One-paragraph summary, from the résumé. */
export const summary =
  'Full Stack Developer with 1.8 years of experience building multi-tenant SaaS and AI-enabled applications using TypeScript, Node.js, React, NestJS, and PostgreSQL. Hands-on experience developing chat backend workflows, LLM integrations, tool execution, REST APIs, and access control for multi-tenant applications.';

// Most recent first. Add new roles at the top.
export const jobs: Job[] = [
  {
    company: 'DataCaffe.ai',
    title: 'Software Engineer',
    url: 'https://datacaffe.ai',
    location: 'Bangalore, India',
    range: 'Dec 2024 – Present',
    points: [
      'Build backend services for Breww.ai, a multi-tenant AI chat application, using TypeScript, Node.js, NestJS, PostgreSQL, and REST APIs, supporting conversation processing, message persistence, and LLM integrations.',
      'Implement AI tool-execution workflows, enabling the chat backend to invoke application tools, process tool outputs, and return results through the conversational flow.',
      'Develop a document preview interface for Breww.ai using React and TypeScript, integrating document viewing directly into the chat experience.',
      'Develop per-user API usage and LLM token tracking with quota management, improving usage visibility and controlling resource consumption across customer accounts.',
      'Implement JWT authentication, Role-Based Access Control (RBAC), row-level security, and workspace isolation for 100+ users across multiple workspaces.',
      'Develop Snowflake and Excel data integrations with schema synchronization and automated retry logic, reducing failed data imports by 40%.',
    ],
  },
];

export const education = {
  school: 'GITA Autonomous College',
  location: 'Bhubaneswar, Odisha',
  degree: 'B.Tech, Electrical Engineering',
  grade: 'CGPA: 7.71',
  range: '2019 – 2023',
};
