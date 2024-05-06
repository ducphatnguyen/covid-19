<script setup lang="ts">
import { onMounted } from "vue";

import { useCountryStore, useSpinning } from "@/stores";
import { AppHeader } from "@/components";

const { getCountries } = useCountryStore();
const spinningStore = useSpinning();

onMounted(async () => await getCountries());
</script>

<template>
  <a-spin tip="Loading..." :spinning="spinningStore.$state.isSpinning">
    <a-flex vertical gap="large">
      <app-header />
      <router-view />
    </a-flex>
  </a-spin>
</template>

<style lang="scss"></style>
