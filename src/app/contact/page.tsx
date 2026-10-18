import CopyEmail from '@/components/contact/CopyEmail';
import ContactForm from '@/components/contact/ContactForm';
import { ArrowUpRightIcon, socialIcons } from '@/components/Icons';
import { PageHeader } from '@/components/Section';
import { siteConfig, socials } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';
import { asset } from '@/lib/url';

export const metadata = pageMetadata({
  title: 'Contact',
  description: `Get in touch with ${siteConfig.name} about opportunities, collaborations or just to say hi.`,
  path: '/contact/',
});

const row =
  'group relative flex items-center justify-between gap-4 border-t border-line px-6 py-5 transition-colors hover:bg-panel sm:px-8';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello."
        intro="I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
      />

      <div className="container-x pb-28">
        <div className="frame reveal grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <aside className="flex flex-col border-line lg:border-r">
            <div className="p-6 sm:p-8">
              <p className="text-[13px] font-medium text-muted">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="mt-1.5 block break-all font-display text-2xl font-medium tracking-[-0.02em]">
                {siteConfig.email}
              </a>
              <div className="mt-5">
                <CopyEmail email={siteConfig.email} />
              </div>
            </div>
            {socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a key={s.name} href={s.url} target="_blank" rel="me noopener noreferrer" className={row}>
                  <span className="flex items-center gap-3 text-[17px]">
                    <Icon size={18} className="text-muted" /> {s.name}
                  </span>
                  <ArrowUpRightIcon size={16} className="text-muted transition-colors group-hover:text-fg" />
                </a>
              );
            })}
            <a href={asset(siteConfig.resume)} target="_blank" rel="noopener noreferrer" className={`${row} border-b lg:border-b-0`}>
              <span className="text-[17px]">Download résumé (PDF)</span>
              <ArrowUpRightIcon size={16} className="text-muted transition-colors group-hover:text-fg" />
            </a>
          </aside>

          <section aria-labelledby="form-heading" className="border-t border-line p-6 sm:p-8 lg:border-t-0">
            <h2 id="form-heading" className="display-md">
              Send a message
            </h2>
            <div className="mt-8">
              <ContactForm email={siteConfig.email} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
