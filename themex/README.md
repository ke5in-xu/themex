# themex

`themex` is a reusable VitePress theme that extends the default theme with a framed layout, dotted page background, card grid with tag filtering, item metadata and hero images, and a documentation sidebar layout.

## Quick Start

Copy the `themex` directory into your VitePress site root, then proxy your theme entry:

```ts
// .vitepress/theme/index.ts
export { default } from '../../themex'
```

Load collection items in your VitePress config:

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { getItems } from '../themex/lib/items'

export default defineConfig({
    srcDir: 'src',
    themeConfig: {
        items: await getItems('src/posts/*/index.md'),
        itemsPath: '/posts/',
        heroDir: '/post-hero'
    }
})
```

Create a collection index page at `posts/index.md`:

```md
---
aside: false
sidebar: false
prev: false
next: false
---

<Collection />
```

## Page Templates

Themex provides four page templates:

| Template   | Path              | Description                                    |
| ---------- | ----------------- | ---------------------------------------------- |
| Home       | `/`               | Landing page with hero section and feature grid |
| Collection | `/posts/`         | Item listing with tag filter and card grid      |
| Post       | `/posts/{slug}/`  | Individual post with date, tags, hero           |
| Doc        | `/docs/*`    | Documentation with left sidebar navigation      |

## Item Frontmatter

Collection items support the following frontmatter:

```yaml
---
date: 2026-01-01
title: Item title
description: Item summary
hero: hero-image-filename
category: Notes
tags:
  - VitePress
---
```

Hero images are resolved as `{heroDir}/{hero}.png`. If the `hero` field already contains a file extension, it is used as-is.

## Theme Config Options

The following options can be set under `themeConfig`:

| Key             | Type           | Default        | Description                                |
| --------------- | -------------- | -------------- | ------------------------------------------ |
| `items`         | `ThemexItem[]` | *required*     | Items loaded via `getItems()`              |
| `itemsPath`     | `string`       | `'/posts/'`    | Base path for tag filter links             |
| `heroDir`       | `string`       | `'/post-hero'` | Directory for item hero images             |
| `brandColor`    | `string`       | `'#ff8000'`    | Primary brand color (any hex value)        |
| `showAvatar`    | `boolean`      | `false`        | Show the avatar area in the nav bar        |
| `avatar`        | `string`       | *built-in*     | Custom avatar image path                   |
| `website`       | `string`       | `'/'`          | Link target for the copyright footer       |
| `copyrightYear` | `number`       | *current year* | Year displayed in the copyright footer     |

## Components

Themex registers two global components for use in Markdown:

- `<Collection />` — item listing page with tag filter and card grid (use with `<ClientOnly>`)
- `<Badge text="..." type="info|tip|warning|danger" />` — inline badge component

## Image Lightbox

Themex includes a built-in lightbox for images. Click any image marked with `data-fancybox` to view it full-size, with gallery navigation and keyboard support (← → Esc).

To enable the lightbox, configure `markdown-it-custom-attrs` in your VitePress config to add the `data-fancybox` attribute to all images:

```ts
// .vitepress/config.ts
import mdItCustomAttrs from 'markdown-it-custom-attrs'

export default defineConfig({
    markdown: {
        config: (md) => {
            md.use(mdItCustomAttrs, 'image', {
                'data-fancybox': 'gallery',
            })
        },
    }
})
```

Images within the same page share a gallery group and can be navigated with arrow buttons. No extra `<script>` or `<link>` tags are needed — the lightbox is fully self-contained within the theme.

## Standalone Markdown CSS

The file `style/markdown.css` can be used independently of VitePress to style Markdown-rendered HTML. Include it on any page with `.vp-doc` or `.themex-md` wrapper classes:

```html
<link rel="stylesheet" href="/themex/style/markdown.css">
<article class="themex-md">
  <!-- rendered Markdown content -->
</article>
```

Dark mode is activated by adding `.dark` or `[data-theme="dark"]` to an ancestor element.

## Dependencies

The `getItems()` helper uses the following packages that must be installed in your project:

```bash
npm install globby gray-matter
```
