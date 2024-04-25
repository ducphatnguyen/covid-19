<script setup lang="ts">
import { AppHeader } from '@/components';
</script>

<template>
    <a-flex vertical gap="large">
        <app-header/>
        <router-view />
    </a-flex>
</template>

<style lang="scss" scoped></style>