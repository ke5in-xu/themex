# Markdown Examples

This page demonstrates the full range of Markdown features styled by themex.

## Text Formatting

**Bold text**, *italic text*, ~~strikethrough~~, and `inline code`.

> Blockquotes can span multiple paragraphs.
>
> — Someone Famous

## Lists

### Unordered

- Item one
- Item two
  - Nested item
  - Another nested item
- Item three

### Ordered

1. First step
2. Second step
3. Third step

## Code Blocks

```ts
// TypeScript example
interface Post {
    title: string
    date: string
    tags: string[]
}

function getRecentPosts(posts: Post[], count: number): Post[] {
    return posts
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, count)
}
```

```css
/* CSS example */
:root {
    --vp-c-brand: #ff8000;
    --vp-font-family-base: 'Poppins', sans-serif;
}
```

## Tables

| Feature | Status | Priority |
| ------- | ------ | -------- |
| Blog Collection | ✅ Done | High |
| Image Lightbox | ✅ Done | High |
| Color Picker | ✅ Done | Medium |
| Search | 🔄 Planned | Low |

## Badges

Themex includes a `<Badge />` component with four variants:

- Info <Badge text="info" type="info" />
- Tip <Badge text="tip" type="tip" />
- Warning <Badge text="warning" type="warning" />
- Danger <Badge text="danger" type="danger" />

Use it inline in Markdown:

```html
<Badge text="new" type="tip" />
```

## Custom Blocks

::: tip Pro Tip
Use `color-mix()` in CSS to derive lighter and darker variants from a single brand color. No more hardcoded palette values.
:::

::: warning Watch Out
Custom blocks need to be separated from surrounding text by blank lines, or some Markdown parsers will miss them.
:::

::: danger Breaking Change
Removing the `items` config key will cause the Collection page to render empty. Always set it.
:::

::: info Note
Themex extends VitePress's default theme. Any VitePress config option that works with the default theme also works with themex.
:::

## Horizontal Rule

Above the line.

---

Below the line.

## Links

- [VitePress Documentation](https://vitepress.dev/)
- [Vue.js](https://vuejs.org/)
- [Markdown Guide](https://www.markdownguide.org/)

## Task Lists

- [x] Install themex
- [x] Configure items
- [ ] Customize brand color
- [ ] Deploy to production

## Images

Click any image to open the lightbox. Navigate between images with arrow keys or on-screen buttons.

![Placeholder 1](/post-hero/placeholder.svg)

![Placeholder 2](/post-hero/placeholder.svg)

![Placeholder 3](/post-hero/placeholder.svg)
