import { createApp, h, reactive } from 'vue'
import Lightbox from './xLightbox.vue'

export interface LightboxState {
    images: string[]
    currentIndex: number
    visible: boolean
}

const state = reactive<LightboxState>({
    images: [],
    currentIndex: 0,
    visible: false,
})

function close() {
    state.visible = false
}

function prev() {
    if (state.images.length <= 1) return
    state.currentIndex =
        (state.currentIndex - 1 + state.images.length) % state.images.length
}

function next() {
    if (state.images.length <= 1) return
    state.currentIndex = (state.currentIndex + 1) % state.images.length
}

function open(images: string[], index = 0) {
    state.images = images
    state.currentIndex = index
    state.visible = true
}

export function initLightbox() {
    if (typeof document === 'undefined') return
    /* ---- Click delegation: intercept [data-fancybox] images ---- */
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const img = target.closest('[data-fancybox]')
        if (!(img instanceof HTMLImageElement)) return

        e.preventDefault()

        const gallery = img.getAttribute('data-fancybox') || 'gallery'
        const allImages = Array.from(
            document.querySelectorAll<HTMLImageElement>(
                `[data-fancybox="${gallery}"]`
            )
        )

        const idx = allImages.indexOf(img)
        open(
            allImages.map((i) => i.src),
            idx >= 0 ? idx : 0
        )
    })

    /* ---- Keyboard ---- */
    document.addEventListener('keydown', (e) => {
        if (!state.visible) return
        if (e.key === 'Escape') close()
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
    })

    /* ---- Mount hidden Vue app for the lightbox component ---- */
    const container = document.createElement('div')
    document.body.appendChild(container)

    createApp({
        render: () =>
            h(Lightbox, {
                state,
                onClose: close,
                onPrev: prev,
                onNext: next,
            }),
    }).mount(container)
}
