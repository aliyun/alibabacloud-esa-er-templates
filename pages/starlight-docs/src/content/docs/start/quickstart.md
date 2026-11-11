---
title: Quick start
description: Run your documentation site locally.
sidebar:
  order: 1
---

## Install and run

Use Node.js 22.12 or newer.

```bash
npm ci
npm run dev
```

Edit Markdown or MDX files in `src/content/docs/`. Starlight generates navigation, page layouts, and a table of contents.

## Build and preview

```bash
npm run build
npm run preview
```

:::tip[Try search after building]
Pagefind generates its index during a production build. Use the preview server to test full-text search.
:::

Continue with [writing content](/start/writing/) or [deploying to ESA](/guides/deployment/).
