import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import JsonLd from '@/components/JsonLd';
import { siteConfig, socials } from '@/data/site';
import { absoluteUrl } from '@/lib/url';
import { generalSans, manrope } from './fonts';
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
  themeColor: '#000000',
  colorScheme: 'dark',
};

// Runs before first paint: scroll-reveal animations only apply when JS is on,
// so content is never hidden for crawlers or no-JS visitors.
const bootScript = `document.documentElement.classList.add('js')`;

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
      className={`${manrope.variable} ${generalSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={personSchema} />
      </head>
      <body>
        <a
          href="#content"
          className="pill-light fixed left-4 top-3 z-[200] -translate-y-20 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="content">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
