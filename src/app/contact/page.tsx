import CopyEmail from '@/components/contact/CopyEmail';
import ContactForm from '@/components/contact/ContactForm';
import { DownloadIcon, MailIcon, socialIcons } from '@/components/Icons';
import { PageHeader } from '@/components/Section';
import { siteConfig, socials } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';
import { asset } from '@/lib/url';

export const metadata = pageMetadata({
  title: 'Contact',
  description: `Get in touch with ${siteConfig.name} about opportunities, collaborations or just to say hi.`,
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get In Touch."
        intro="I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
      />

      <div className="grid gap-12 pb-24 pt-10 lg:grid-cols-[2fr_3fr]">
        <aside className="space-y-4">
          <div className="reveal rounded border border-line bg-surface p-6">
            <p className="flex items-center gap-2 font-mono text-xs text-muted">
              <MailIcon size={14} /> Email
            </p>
            <a href={`mailto:${siteConfig.email}`} className="inline-link mt-2 block break-all text-lg">
              {siteConfig.email}
            </a>
            <div className="mt-4">
              <CopyEmail email={siteConfig.email} />
            </div>
          </div>

          <ul className="reveal grid grid-cols-2 gap-4">
            {socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="flex items-center gap-3 rounded border border-line bg-surface p-5 font-mono text-sm text-soft transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon /> {s.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={asset(siteConfig.resume)}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="reveal flex items-center gap-3 rounded border border-line bg-surface p-5 font-mono text-sm text-soft transition-colors hover:border-accent hover:text-accent"
          >
            <DownloadIcon /> Download résumé (PDF)
          </a>
        </aside>

        <section aria-labelledby="form-heading" className="reveal">
          <h2 id="form-heading" className="mb-6 font-mono text-xl font-semibold text-fg">
            Send a message
          </h2>
          <ContactForm email={siteConfig.email} />
        </section>
      </div>
    </>
  );
}
