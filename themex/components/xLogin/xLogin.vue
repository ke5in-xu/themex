<template>
    <div v-if="visible" class="login">
        <div class="user-info">
            <img :src="withBase(avatar)" class="avatar" alt="avatar">
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import defaultAvatar from '../../assets/avatar.png'

const { theme } = useData()

const visible = computed(() => theme.value.showAvatar ?? false)
const avatar = computed(() => theme.value.avatar ?? defaultAvatar)
</script>

<style scoped src="./xLogin.css"></style>
