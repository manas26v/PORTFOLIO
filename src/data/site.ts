// Site-wide identity and links. Everything a page needs to say "who" lives here.

const DEFAULT_SITE_URL = 'https://manas26v.github.io/PORTFOLIO';

export const siteConfig = {
  name: 'Manas Ranjan Barik',
  shortName: 'Manas',
  title: 'Manas Ranjan Barik | Software Engineer',
  jobTitle: 'Software Engineer',
  description:
    'Manas Ranjan Barik is a full stack developer building multi-tenant SaaS and AI-enabled applications with TypeScript, Node.js, NestJS, React and PostgreSQL.',
  // Set by the deploy workflow from the GitHub Pages config; no trailing slash.
  url: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, ''),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  email: 'mrbarik2002@gmail.com',
  location: 'Bangalore, India',
  resume: '/Manas_Ranjan_Barik_Resume.pdf',
  employer: { name: 'DataCaffe.ai', url: 'https://datacaffe.ai' },
  keywords: [
    'Manas Ranjan Barik',
    'Software Engineer',
    'Full Stack Developer',
    'Node.js',
    'NestJS',
    'TypeScript',
    'React',
    'PostgreSQL',
    'LLM integration',
    'Multi-tenant SaaS',
    'Portfolio',
  ],
} as const;

export type SocialIcon = 'github' | 'linkedin';

export const socials: { name: string; url: string; icon: SocialIcon }[] = [
  { name: 'GitHub', url: 'https://github.com/manas26v', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/manas-ranjan-barik-software-developer', icon: 'linkedin' },
];

export const navLinks = [
  { href: '/about/', label: 'About' },
  { href: '/projects/', label: 'Projects' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
] as const;
