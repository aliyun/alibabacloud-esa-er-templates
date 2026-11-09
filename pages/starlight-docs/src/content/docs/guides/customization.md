---
title: Customization
description: Make the documentation site your own.
sidebar:
  order: 2
---

## Branding and navigation

Update the title and sidebar in `astro.config.mjs`. Edit `src/content/docs/index.mdx` to customize the landing page. Social links are empty by default; add your own when ready.

## Colors and layout

Starlight provides light, dark, and system themes. Use `src/styles/global.css` for Tailwind utilities and theme tokens.

:::tip[Configure before overriding]
Use Starlight's built-in options and components before adding custom layouts or styles.
:::

## Language

English is the default language for pages, navigation, search, and code controls. Use Starlight's locale configuration if you want to add other languages later.
