<template>
    <span :class="['VPBadge', type]">
        <slot>{{ text }}</slot>
    </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    text?: string
    type?: 'info' | 'tip' | 'warning' | 'danger'
}>(), {
    text: '',
    type: 'info'
})
</script>

<style scoped src="./xBadge.css"></style>
