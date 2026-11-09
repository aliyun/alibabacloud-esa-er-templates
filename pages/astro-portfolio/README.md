# Alex — Portfolio

An English-language static template built with Astro + Astro Nano + Tailwind CSS for ESA Pages.

## Development

Use Node.js 22.12 or newer.

```bash
npm ci
npm run dev
```

## Build and deploy

```bash
npm run build
npm run preview
```

Import your repository into ESA Pages. The included `esa.jsonc` specifies `npm ci`, `npm run build`, and `./dist` as the static asset directory. No runtime application server is required.

## Customize

Keep the demo profile name Alex or update `src/consts.ts`. Edit Markdown in `src/content/` for posts, projects, and experience. Contact and project URL fields are empty; unconfigured links are hidden. Set a fixed `site` URL in `astro.config.mjs` to enable canonical URLs, RSS, and a sitemap. No environment variable is required. See `UPSTREAM.md` for theme attribution.

Internal navigation and official project links are retained. Personal repository URLs, example domains, and placeholder contact links are not configured.

## License

MIT. Preserve the included license and upstream attribution when distributing this template.
