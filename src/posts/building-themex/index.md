---
date: 2025-12-15
hero: placeholder.svg
category: Dev
tags:
  - VitePress
  - Theme
  - Vue
---

# Building a Custom VitePress Theme

VitePress ships with an excellent default theme, but sometimes you need more. This post walks through the architecture of a custom theme, using themex as a reference.

## Theme Anatomy

A VitePress theme is just a set of Vue components and CSS files that extend or replace the default theme:

```
themex/
├── index.ts          ← Theme entry, extends DefaultTheme
├── style.css         ← Global styles and layout overrides
├── templates/        ← Page-level layout components
│   ├── xHome/        ← Default layout (home + post + doc)
│   └── xCollection/  ← Collection card grid
└── components/       ← Reusable UI components
    ├── Lightbox.vue  ← Image zoom with gallery nav
    ├── Badge.vue     ← Inline status badges
    └── ...
```

## Extending the Default Theme

The key insight: never fork. Always extend. Your theme imports `DefaultTheme` from `vitepress/theme`, spreads its properties, and overrides only what you need.

```ts
import DefaultTheme from 'vitepress/theme'

export default {
    ...DefaultTheme,
    Layout: xHome,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp?.(ctx)
        ctx.app.component('Badge', Badge)
    }
}
```

## The Layout Component

The layout is a thin wrapper around `DefaultTheme.Layout`. Named slots let you inject content into specific regions — nav bar, sidebar, doc body — without touching the original template.

```vue
<template>
    <Layout>
        <template #nav-bar-content-after>
            <Login />
        </template>
        <template #doc-before>
            <div v-if="$frontmatter.date">...</div>
        </template>
    </Layout>
</template>
```

::: tip Slot Names
VitePress exposes `#nav-bar-content-after`, `#doc-before`, `#doc-after`, `#sidebar-nav-before`, and more. See the [VitePress docs](https://vitepress.dev/) for the full list.
:::

## CSS Strategy

Use `#app` prefixed selectors to raise specificity above VitePress defaults without `!important`. Override CSS custom properties (`--vp-c-brand`, `--vp-font-family-base`) for theming.

```css
#app .VPNav {
    left: auto;
    width: var(--themex-shell-width);
}
```

That's the core of it. A good theme composes the default rather than fighting it.
