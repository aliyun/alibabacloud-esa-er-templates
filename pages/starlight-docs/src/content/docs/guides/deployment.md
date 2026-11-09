---
title: Deploy to ESA
description: Publish a static documentation site with ESA Pages.
sidebar:
  order: 1
---

## Import your repository

Connect your repository to ESA Pages. Choose the production branch and use the repository root as the project directory. Select Node.js 22.12 or newer.

The included `esa.jsonc` defines the build:

```json
{
  "installCommand": "npm ci",
  "buildCommand": "npm run build",
  "assets": {
    "directory": "./dist",
    "notFoundStrategy": "404Page"
  }
}
```

## Static routing

Starlight generates a static HTML page for every route. Publish the entire `dist` directory and serve `404.html` for missing pages. No application server is required.

## Site URL

The `site` constant in `astro.config.mjs` is empty by default. Set a fixed domain there when your deployment address is ready to enable absolute canonical URLs and a sitemap. No environment variable is required.

## Verify the deployment

Open a content page directly, refresh it, test search, and visit an unknown path to check the 404 page.

See the [official ESA documentation](https://www.alibabacloud.com/help/en/edge-security-acceleration/).
