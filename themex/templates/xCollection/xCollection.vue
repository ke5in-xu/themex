<template>
    <div class="tags">
        <span
            v-for="(posts, tag) in groupedPosts"
            :key="tag"
            :class="['tag', { selected: selectedTag === tag }]"
            @click="toggleTag(tag)"
        >
            {{ tag }}
            <strong>{{ posts.length }}</strong>
        </span>
    </div>

    <xCardGrid :items="selectedPosts">
        <template #card="{ item }">
            <img v-if="item.frontMatter.hero" :src="withBase(getHeroSrc(item.frontMatter.hero, heroDir))" alt="hero" class="xcard-img" />
            <div class="xcard-body">
                <div class="xcard-title">{{ item.frontMatter.title }}</div>
                <div class="xcard-desc">{{ item.frontMatter.description }}</div>
                <div v-if="item.frontMatter.date" class="post-date">{{ item.frontMatter.date }}</div>
            </div>
        </template>
    </xCardGrid>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { initTags, getHeroSrc } from '../../lib/utils'
import type { ThemexItem } from '../../lib/types'
import xCardGrid from '../../components/xCardGrid/xCardGrid.vue'

const { theme } = useData()
const selectedTag = ref('all')
const heroDir = theme.value.heroDir ?? '/post-hero'

const groupedPosts = computed(() => initTags(theme.value.items ?? []))
const selectedPosts = computed(() => {
    const items: ThemexItem[] = groupedPosts.value[selectedTag.value] ?? groupedPosts.value.all ?? []
    return items.map((item) => ({ ...item, link: item.regularPath }))
})

onMounted(() => {
    const tag = new URLSearchParams(window.location.search).get('tag')
    if (tag && groupedPosts.value[tag]) {
        selectedTag.value = tag
    }
})

const toggleTag = (tag: string) => {
    selectedTag.value = tag
}
</script>

<style scoped src="./xCollection.css"></style>
