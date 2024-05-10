<script setup lang="ts">
import { onMounted } from "vue";

import { useCountryStore } from "@/stores";
import { AppHeader } from "@/components";

const countryStore = useCountryStore();

onMounted(async () => await countryStore.getCountries());
</script>

<template>
  <a-spin :spinning="countryStore.$state.spinning">
    <a-flex vertical gap="large">
      <app-header />
      <router-view />
    </a-flex>
  </a-spin>
</template>

<style lang="scss"></style>
