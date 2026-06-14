<template>
    <div v-if="state.visible" class="themex-lightbox-overlay" @click.self="close">
        <div class="themex-lightbox-container">
            <button
                class="themex-lightbox-close"
                @click="close"
                :title="'Close (Esc)'"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            <button
                v-if="state.images.length > 1"
                class="themex-lightbox-arrow themex-lightbox-prev"
                @click.stop="prev"
                :title="'Previous (←)'"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            <img
                :src="state.images[state.currentIndex]"
                :key="state.currentIndex"
                class="themex-lightbox-img"
            />

            <button
                v-if="state.images.length > 1"
                class="themex-lightbox-arrow themex-lightbox-next"
                @click.stop="next"
                :title="'Next (→)'"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            <div v-if="state.images.length > 1" class="themex-lightbox-counter">
                {{ state.currentIndex + 1 }} / {{ state.images.length }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LightboxState } from './lightbox'

defineProps<{
    state: LightboxState
}>()

const emit = defineEmits<{
    close: []
    prev: []
    next: []
}>()

function close() { emit('close') }
function prev() { emit('prev') }
function next() { emit('next') }
</script>

<style src="./xLightbox.css"></style>
