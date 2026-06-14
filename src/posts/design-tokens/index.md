---
date: 2025-08-20
hero: placeholder.svg
category: Design
tags:
  - Design
  - Tokens
  - Figma
---

# Design Tokens in Practice

Design tokens are the smallest atoms of a design system — colors, spacing values, font sizes, shadows. Stored as platform-agnostic data, they can be transformed into CSS custom properties, Figma variables, iOS constants, or Android resources.

## Why Tokens?

Before tokens, a color change meant updating hex values across dozens of files. With tokens, you change one source of truth and every consumer updates automatically.

```
Source (JSON)          Consumers
─────────────          ─────────
tokens.json      →     CSS variables
                       Figma styles
                       Swift code
                       Kotlin code
                       Documentation
```

## Naming Conventions

Good token names are semantic, not visual. Avoid `--color-blue-500` — use `--color-brand-primary` or `--color-text-muted`.

```css
:root {
    /* ❌ visual names */
    --blue-500: #3b82f6;

    /* ✅ semantic names */
    --color-action-primary: #3b82f6;
    --color-text-default: #1a1a2e;
    --space-md: 8px;
}
```

::: warning Semantic vs Visual
Visual names (`blue`, `large`) describe what a value looks like. Semantic names (`brand`, `heading`) describe what it means. When the brand color changes from blue to orange, `--color-brand` still makes sense — `--color-blue` doesn't.
:::

## Tooling

Popular token tools include [Style Dictionary](https://amzn.github.io/style-dictionary/), [Tokens Studio](https://tokens.studio/) (Figma plugin), and [Cobalt](https://cobalt-ui.pages.dev/). Each transforms a single token file into multiple output formats.

## The Figma Handoff

The token workflow bridges design and engineering:

1. Designers define tokens in Tokens Studio (Figma)
2. Tokens are exported as JSON
3. A build step transforms JSON into CSS custom properties
4. Engineers consume CSS variables in components

This gives both sides a shared vocabulary and a single source of truth.
