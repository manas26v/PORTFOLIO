// `next build` with `output: 'export'` writes generated Open Graph images as
// extension-less files (out/**/opengraph-image). GitHub Pages picks the
// Content-Type from the extension, so rename them to .png; pageMetadata()
// already points og:image at the .png URLs.
import { readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';

let renamed = 0;
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_next') walk(p);
    } else if (entry.name === 'opengraph-image' || entry.name === 'twitter-image') {
      renameSync(p, `${p}.png`);
      renamed++;
    }
  }
}

walk('out');
console.log(`fix-og-images: renamed ${renamed} image(s) to .png`);
