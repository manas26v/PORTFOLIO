'use client';

import { useState, type FormEvent } from 'react';

const field =
  'w-full rounded border border-line bg-surface px-4 py-3 text-base text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none';

/**
 * The site is static (no server), so the form composes a pre-filled email in
 * the visitor's mail client instead of POSTing anywhere.
 */
export default function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim() || `Hello from ${name || 'your portfolio'}`;
    const message = String(data.get('message') ?? '').trim();
    const body = name ? `${message}\n\n— ${name}` : message;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-mono text-xs text-soft">Name</span>
          <input name="name" autoComplete="name" required className={field} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-xs text-soft">Subject</span>
          <input name="subject" className={field} placeholder="Let's work together" />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block font-mono text-xs text-soft">Message</span>
        <textarea name="message" required rows={6} className={`${field} resize-y`} placeholder="Hi Manas, …" />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn">
          Open in my email app
        </button>
        <p className="text-sm text-muted" aria-live="polite">
          {sent ? 'Your email app should open with the message ready to send.' : 'Opens your email app — nothing is stored.'}
        </p>
      </div>
    </form>
  );
}
