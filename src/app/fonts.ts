import localFont from 'next/font/local';
import { Manrope } from 'next/font/google';

// Body copy. Self-hosted at build time by next/font.
export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

// Display headings. General Sans by Indian Type Foundry (ITF Free Font License).
export const generalSans = localFont({
  variable: '--font-general-sans',
  display: 'swap',
  src: [
    { path: '../fonts/general-sans-500.woff2', weight: '500' },
    { path: '../fonts/general-sans-600.woff2', weight: '600' },
  ],
});
