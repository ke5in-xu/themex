# Getting Started

This guide walks you through setting up a VitePress site with the themex theme.

## Installation

Copy the `themex` directory into your VitePress project root:

```
your-site/
├── src/                  ← Your content
│   ├── index.md
│   ├── posts/
│   └── public/
├── themex/               ← The theme
└── .vitepress/
    ├── config.ts
    └── theme/
        └── index.ts
```

## Theme Entry

Create `.vitepress/theme/index.ts` to proxy the theme:

```ts
export { default } from '../../themex'
```

## Config

In `.vitepress/config.ts`, set the source directory and load collection items:

```ts
import { defineConfig } from 'vitepress'
import { getItems } from '../themex/items'
import mdItCustomAttrs from 'markdown-it-custom-attrs'

export default defineConfig({
    srcDir: 'src',
    themeConfig: {
        items: await getItems('src/posts/*/index.md'),
        itemsPath: '/posts/',
        heroDir: '/post-hero',
        logo: '/logo/logo.svg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Blog', link: '/posts/' },
        ]
    },
    markdown: {
        config: (md) => {
            md.use(mdItCustomAttrs, 'image', {
                'data-fancybox': 'gallery'
            })
        }
    }
})
```

## Writing Posts

Create Markdown files under `src/posts/`. Each post lives in its own folder:

```
src/posts/
├── index.md              ← Collection page
├── my-first-post/
│   └── index.md
└── another-post/
    └── index.md
```

Post frontmatter:

```yaml
---
date: 2026-01-15
title: My First Post
description: A short summary shown in the card grid
hero: hero-image-name
tags:
  - Design
  - VitePress
---
```

## Collection Page

`src/posts/index.md` renders the card grid:

```md
---
aside: false
sidebar: false
---

<ClientOnly>
<Collection />
</ClientOnly>
```

::: tip Tag Filtering
The Collection component automatically builds a tag cloud from all items. Click a tag to filter, click it again to show all.
:::

## Image Lightbox

Images automatically get lightbox behavior when you configure the markdown plugin (see config above). Click any image in a post or doc page to zoom in. Use arrow keys or on-screen buttons to navigate between images in the same gallery.

## That's It

You now have a working site with blog collection, article layouts, and image lightbox — all from a single theme directory.
