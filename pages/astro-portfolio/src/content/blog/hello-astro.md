---
title: Focus on content and let the framework do the rest
description: Maintain your digital space with Astro content collections.
date: 2026-09-28
---

## Content as code

Each post is a Markdown file. Put its title, description, and date in frontmatter, then focus on the story.

```yaml
title: My first post
description: An idea worth sharing
date: 2026-09-28
```

## Built-in capabilities

Astro generates static pages. The theme provides post indexes, project listings, light and dark modes, and page transitions. Set your site URL to enable RSS and sitemap generation.

## Deploy to ESA

Run `npm ci` and `npm run build`, then publish `dist` as static assets. The site URL is empty by default. Set a fixed domain in `astro.config.mjs` to enable RSS, sitemap, and canonical URLs. No environment variable is needed.
