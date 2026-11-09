---
title: Project structure
description: Find the files that power your documentation.
sidebar:
  order: 2
---

```text
astro.config.mjs       Site title, sidebar, and integrations
esa.jsonc              ESA build and static asset settings
src/content/docs/      Markdown and MDX pages
src/styles/global.css  Tailwind and theme styles
```

## File-based routes

A file at `src/content/docs/start/quickstart.md` becomes `/start/quickstart/`. Add a page to the relevant directory and Starlight adds it to the sidebar.

## Page metadata

Use `title` and `description` in frontmatter. Set `sidebar.order` to control ordering within a section. Starlight provides navigation and pagination automatically.
