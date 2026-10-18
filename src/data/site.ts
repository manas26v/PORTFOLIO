// Site-wide identity and links. Everything a page needs to say "who" lives here.

const DEFAULT_SITE_URL = 'https://manas26v.github.io/PORTFOLIO';

export const siteConfig = {
  name: 'Manas Ranjan Barik',
  shortName: 'Manas',
  title: 'Manas Ranjan Barik | Software Engineer',
  jobTitle: 'Software Developer',
  description:
    'Manas Ranjan Barik is a software developer building reliable backend systems, APIs, and data-driven products with Node.js, TypeScript, PostgreSQL, and Python.',
  // Set by the deploy workflow from the GitHub Pages config; no trailing slash.
  url: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, ''),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  email: 'mrbarik2002@gmail.com',
  location: 'India',
  resume: '/Manas_Ranjan_Barik_Resume.pdf',
  employer: { name: 'DataCaffe.ai', url: 'https://datacaffe.ai' },
  keywords: [
    'Manas Ranjan Barik',
    'Software Developer',
    'Backend Engineer',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Python',
    'FastAPI',
    'Portfolio',
  ],
} as const;

export type SocialIcon = 'github' | 'linkedin';

export const socials: { name: string; url: string; icon: SocialIcon }[] = [
  { name: 'GitHub', url: 'https://github.com/manasvoid0', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/manas-ranjan-barik-a2917927a/', icon: 'linkedin' },
];

export const navLinks = [
  { href: '/about/', label: 'About' },
  { href: '/projects/', label: 'Projects' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
] as const;
