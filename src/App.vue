<script setup lang="ts">
import { onMounted } from "vue"

import { useCountryStore } from "@/stores";

import { ANT_CONFIGS } from "./constants";

const { getCountries } = useCountryStore()

onMounted(async () => await getCountries())
</script>

<template>
  <a-config-provider :theme="ANT_CONFIGS">
  </a-config-provider>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  box-sizing: border-box;
}

.container {
  max-width: 376px;
  background-color: #fff;
  margin: 0 auto;
}
</style>
