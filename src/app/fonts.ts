import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

// Fonts are self-hosted at build time: no runtime request to Google, no layout shift.
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Headings only use the condensed cut (font-bold). The other Incognito
// weights live in src/fonts/ — add them here if a design needs them, since
// every listed weight is preloaded on every page.
export const incognito = localFont({
  variable: '--font-incognito',
  display: 'swap',
  src: [{ path: '../fonts/incognito_condensed.woff2', weight: '700' }],
});

export const gitlabMono = localFont({
  variable: '--font-gitlab-mono',
  display: 'swap',
  src: [{ path: '../fonts/gitlab-mono.woff2', weight: '300 600' }],
});
