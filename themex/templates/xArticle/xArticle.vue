<template>
    <Layout>
        <template #nav-bar-content-after>
            <ColorPicker />
            <Login />
        </template>
        <template #doc-before>
            <div v-if="frontmatter.date" class="post-info">
                {{ String(frontmatter.date).substring(0, 10) }}
                <span v-for="tag in frontmatter.tags" :key="tag">
                    <a :href="withBase(`${itemsPath}?tag=${tag}`)">{{ tag }}</a>
                </span>
            </div>
            <div v-if="frontmatter.hero" class="post-hero">
                <img :src="withBase(resolveHeroSrc(frontmatter.hero))" alt="hero" />
            </div>
        </template>
    </Layout>
    <Copyright />
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
import Copyright from '../../components/xCopyright/xCopyright.vue'
import Login from '../../components/xLogin/xLogin.vue'
import ColorPicker from '../../components/xColorPicker/xColorPicker.vue'
import { getHeroSrc } from '../../lib/utils'

const { Layout } = DefaultTheme
const { frontmatter, theme } = useData()
const itemsPath = theme.value.itemsPath ?? '/posts/'
const heroDir = theme.value.heroDir ?? '/post-hero'

const resolveHeroSrc = (hero: string) => getHeroSrc(hero, heroDir)
</script>

<style scoped src="./xArticle.css"></style>
