---
title: Search
description: Find answers with static full-text search.
sidebar:
  order: 3
---

## Built-in Pagefind search

Starlight uses Pagefind to generate a full-text search index during the build. The browser downloads small index chunks as needed, without a search server or API key.

## Test locally

```bash
npm run build
npm run preview
```

Search for words such as "deployment", "Markdown", or "components". The development server does not include a production search index.

## Extend when needed

Use the official [Starlight search guide](https://starlight.astro.build/guides/site-search/) for Pagefind configuration and the official Algolia integration.
