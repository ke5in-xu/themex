<template>
    <div class="site-footer">
        Copyright © {{ year }}
        <a class="vitepress" :href="website">{{ webTitle }}</a>
    </div>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress'

const { site, theme } = useData()
const year = theme.value.copyrightYear ?? new Date().getFullYear()
const website = theme.value.website ?? '/'
const webTitle = site.value.title
</script>

<style src="./xCopyright.css"></style>
