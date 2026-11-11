import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

const site = '';

export default defineConfig({
  site: site || undefined,
  output: 'static',
  integrations: [starlight({
    title: 'ESA Pages',
    description: 'Write, search, and publish technical documentation with Starlight.',
    social: [],
    customCss: ['./src/styles/global.css'],
    sidebar: [
      { label: 'Getting started', items: [{ autogenerate: { directory: 'start' } }] },
      { label: 'Build and deploy', items: [{ autogenerate: { directory: 'guides' } }] },
    ],
  })],
  vite: { plugins: [tailwindcss()] },
});
