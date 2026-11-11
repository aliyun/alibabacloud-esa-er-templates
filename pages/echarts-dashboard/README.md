# ESA Pages — Dashboard

An English-language static template built with React + Vite + Tailwind CSS + Apache ECharts for ESA Pages.

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

Edit demo metrics and chart options in `src/App.jsx`. ECharts provides tooltips, legends, zoom, data views, chart switching, and image export. All metrics are illustrative; no live monitoring API is connected.

Internal navigation and official project links are retained. Personal repository URLs, example domains, and placeholder contact links are not configured.

## License

MIT. Preserve the included license and upstream attribution when distributing this template.
