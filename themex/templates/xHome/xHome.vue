<template>
    <xCardGrid :items="cards" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import xCardGrid from '../../components/xCardGrid/xCardGrid.vue'

const { frontmatter } = useData()

const cards = computed(() => frontmatter.value.cards?.items ?? [])
</script>
