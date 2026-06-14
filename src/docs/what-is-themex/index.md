# What is ThemeX

ThemeX is a modern VitePress custom theme that extends the default theme with a clean, framed layout and a collection of reusable components.

## Features

**Framed Shell** — A centered 1280px container with a subtle dot-pattern background, giving your docs a polished, app-like feel.

**Page Templates** — Three built-in templates: Home (hero + cards), Collection (tag-filtered card grid), and Article (post/doc pages with metadata).

**Color System** — A single `--themex-brand` CSS variable drives the entire accent color palette via `color-mix()`. Six presets plus a custom color picker, persisted in localStorage.

**Image Lightbox** — Click any image to zoom, navigate between gallery images, and dismiss with click or Escape. Zero external dependencies.

**Dark Mode** — Full light/dark support with automatic CSS variable switching. The logo adapts via CSS filter — no duplicate image needed.

**Components** — Reusable `<Badge>`, `<xCardGrid>`, `<Collection>`, and `<xHome>` components that work directly in Markdown.

## Architecture

ThemeX is organized into three layers:

```
themex/
├── templates/     # Page layouts (xArticle, xHome, xCollection)
├── components/    # Reusable UI components (xCardGrid, xBadge, xLightbox, etc.)
├── lib/           # Shared utilities (items, types, utils)
└── style/         # Global CSS (shell layout, markdown styles)
```

## Why ThemeX

ThemeX is both a **usable theme** and a **reference implementation**. Drop it into your VitePress project and use it as-is, or study the source to learn how custom themes work: slot-based composition, SSR considerations, CSS custom properties, and component design patterns.
