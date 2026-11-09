import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = '';

export default defineConfig({
  site: site || undefined,
  output: 'static',
  integrations: [mdx(), ...(site ? [sitemap()] : [])],
  vite: { plugins: [tailwindcss()] },
});
