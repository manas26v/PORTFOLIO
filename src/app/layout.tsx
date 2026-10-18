import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SideRails from '@/components/SideRails';
import Loader from '@/components/Loader';
import RevealObserver from '@/components/RevealObserver';
import JsonLd from '@/components/JsonLd';
import { siteConfig, socials } from '@/data/site';
import { absoluteUrl } from '@/lib/url';
import { gitlabMono, incognito, inter } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(`${siteConfig.url}/`),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [...siteConfig.keywords],
  alternates: {
    types: { 'application/rss+xml': [{ url: absoluteUrl('/feed.xml'), title: `${siteConfig.name} — Blog` }] },
  },
  robots: { index: true, follow: true },
  formatDetection: { email: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#18181b',
  colorScheme: 'dark',
};

// Runs before first paint: enables reveal animations only when JS is on, and
// skips the splash loader after the first page view of a session (or when the
// visitor prefers reduced motion).
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('loader-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('loader-seen')}else{sessionStorage.setItem('loader-seen','1')}}catch(e){d.classList.add('loader-seen')}})();`;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: absoluteUrl('/'),
  email: `mailto:${siteConfig.email}`,
  jobTitle: siteConfig.jobTitle,
  worksFor: { '@type': 'Organization', name: siteConfig.employer.name, url: siteConfig.employer.url },
  sameAs: socials.map((s) => s.url),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${incognito.variable} ${gitlabMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={personSchema} />
      </head>
      <body>
        <a
          href="#content"
          className="fixed left-4 top-0 z-[200] -translate-y-full rounded-b bg-surface px-4 py-2 font-mono text-sm text-accent transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Loader />
        <Header />
        <SideRails />
        <main id="content" className="mx-auto w-full max-w-5xl px-6 sm:px-12 md:px-20 lg:px-24 xl:px-0">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
