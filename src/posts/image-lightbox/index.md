---
date: 2025-11-20
hero: placeholder.svg
category: Dev
tags:
  - Vue
  - Lightbox
---

# How the Image Lightbox Works

Themex includes a zero-dependency image lightbox. Click any image with `data-fancybox` to zoom in, navigate between images in the same gallery, and close with a click or the Escape key.

## Click Delegation

Rather than attaching listeners to every image, the lightbox uses a single click handler on `document`:

```ts
document.addEventListener('click', (e) => {
    const img = e.target.closest('[data-fancybox]')
    if (!(img instanceof HTMLImageElement)) return

    // Collect all images in the same gallery group
    const gallery = img.getAttribute('data-fancybox')
    const images = document.querySelectorAll(`[data-fancybox="${gallery}"]`)

    open(images, img)
})
```

## Gallery Grouping

Images with the same `data-fancybox` value form a gallery. Navigate between them with arrow buttons or keyboard left/right.

The markdown plugin `markdown-it-custom-attrs` adds `data-fancybox="gallery"` to every image automatically.

## Keyboard Support

| Key | Action |
|-----|--------|
| ← | Previous image |
| → | Next image |
| Esc | Close lightbox |

## The Component

`Lightbox.vue` is a standalone Vue component mounted to `document.body`. It's completely decoupled from the VitePress app, so it works even when the page layout changes.

```vue
<template>
    <div v-if="visible" class="themex-lightbox-overlay" @click.self="close">
        <img :src="images[currentIndex]" />
        <button @click="prev">←</button>
        <button @click="next">→</button>
    </div>
</template>
```

::: tip Zero Dependencies
No jQuery, no Fancybox CDN — the entire lightbox is ~2KB of Vue + CSS, bundled with the theme.
:::
