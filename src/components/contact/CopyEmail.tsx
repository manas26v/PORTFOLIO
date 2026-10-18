'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from '@/components/Icons';

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded border border-line px-3 py-2 font-mono text-xs text-soft transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      <span aria-live="polite">{copied ? 'Copied!' : 'Copy email'}</span>
    </button>
  );
}
