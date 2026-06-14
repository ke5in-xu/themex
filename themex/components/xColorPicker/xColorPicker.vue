<template>
    <div class="themex-colors" ref="container">
        <button
            class="themex-color-current"
            :style="{ background: currentColor }"
            @click="open = !open"
            title="Change accent color"
        />
        <div v-if="open" class="themex-color-dropdown">
            <button
                v-for="c in palette"
                :key="c"
                class="themex-color-option"
                :class="{ active: c === currentColor && !isCustom }"
                :style="{ background: c }"
                :title="c"
                @click="pick(c)"
            />
            <div class="themex-color-divider" />
            <button
                class="themex-color-option themex-color-custom"
                :class="{ active: isCustom }"
                :style="{ background: isCustom ? currentColor : 'transparent' }"
                title="Custom color"
                @click="openPicker"
            >
                <span v-if="!isCustom">+</span>
            </button>
            <input
                ref="picker"
                type="color"
                class="themex-color-input"
                @change="onCustomPick"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()

const palette = [
    '#ff8000',
    '#3b82f6',
    '#10b981',
    '#8b5cf6',
    '#ef4444',
    '#ec4899',
]

const open = ref(false)
const container = ref<HTMLElement>()
const picker = ref<HTMLInputElement>()
const currentColor = ref('#ff8000')
const isCustom = ref(false)

function apply(color: string) {
    if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--themex-brand', color)
    }
    currentColor.value = color
    try { localStorage.setItem('themex-brand', color) } catch {}
}

function pick(color: string) {
    isCustom.value = false
    apply(color)
    open.value = false
}

function openPicker() {
    picker.value?.click()
}

function onCustomPick(e: Event) {
    const input = e.target as HTMLInputElement
    if (input.value) {
        isCustom.value = true
        apply(input.value)
        open.value = false
    }
}

function onClickOutside(e: MouseEvent) {
    if (container.value && !container.value.contains(e.target as Node)) {
        open.value = false
    }
}

onMounted(() => {
    // Restore saved color or use themeConfig default
    const saved = (() => { try { return localStorage.getItem('themex-brand') } catch { return null } })()
    const initial = saved || theme.value.brandColor || '#ff8000'
    isCustom.value = saved ? !palette.includes(saved) : false
    apply(initial)

    document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped src="./xColorPicker.css"></style>
