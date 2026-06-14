<template>
    <div v-if="items.length" class="xcard-grid">
        <a v-for="(item, index) in items" :key="index"
            :href="isExternal(item.link) ? item.link : withBase(item.link)"
            :target="isExternal(item.link) ? '_blank' : undefined"
            :rel="isExternal(item.link) ? 'noopener noreferrer' : undefined"
            class="xcard-card">
            <slot name="card" :item="item">
                <img v-if="item.image" :src="withBase(item.image)" :alt="item.title" class="xcard-img" />
                <div class="xcard-body">
                    <div class="xcard-title">{{ item.title }}</div>
                    <div v-if="item.description" class="xcard-desc">{{ item.description }}</div>
                </div>
            </slot>
        </a>
    </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
    items: Record<string, any>[]
}>()

function isExternal(link: string) {
    return /^https?:\/\//.test(link)
}
</script>

<style src="./xCardGrid.css"></style>
