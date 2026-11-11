# ESA Pages — Docs

An English-language static template built with Astro + Starlight + Tailwind CSS for ESA Pages.

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

Edit Markdown and MDX in `src/content/docs/`. Configure branding and navigation in `astro.config.mjs`. Starlight provides English search, themes, navigation, code highlighting, and copy buttons. Social links and the `site` URL are empty by default. Set a fixed site URL when ready to enable canonical URLs and a sitemap. Search is available after a production build.

Internal navigation and official project links are retained. Personal repository URLs, example domains, and placeholder contact links are not configured.

## License

MIT. Preserve the included license and upstream attribution when distributing this template.
