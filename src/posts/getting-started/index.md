---
date: 2026-01-10
hero: placeholder.svg
category: Guide
tags:
  - VitePress
  - Theme
---

# Getting Started with Themex

Themex is a drop-in VitePress theme. Copy one folder, add three lines of config, and you have a blog with image lightbox, dark mode, and a responsive card grid.

## Step 1: Copy the Theme

```bash
cp -r themex/ your-site/themex/
```

## Step 2: Wire the Theme Entry

Create `.vitepress/theme/index.ts`:

```ts
export { default } from '../../themex'
```

## Step 3: Load Your Items

In `.vitepress/config.ts`:

```ts
import { getItems } from '../themex/items'

export default defineConfig({
    srcDir: 'src',
    themeConfig: {
        items: await getItems('src/posts/*/index.md'),
        itemsPath: '/posts/',
        heroDir: '/post-hero',
        logo: '/logo/logo.svg',
    }
})
```

## Step 4: Create the Collection Page

`src/posts/index.md`:

```md
---
aside: false
sidebar: false
---

<ClientOnly>
<Collection />
</ClientOnly>
```

## Step 5: Write a Post

```md
---
date: 2026-01-15
title: Hello World
description: My first post
tags:
  - Demo
---

Your content here.
```

::: tip That's It
Run `npm run dev` and open `http://localhost:5173`. You should see your home page, blog collection, and first post — all themed by themex.
:::

From here, customize the CSS variables in `themex/style.css` to match your brand, tweak the layout, and add more posts.
