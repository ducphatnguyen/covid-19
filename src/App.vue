<script setup lang="ts">
import { onMounted, computed } from "vue";

import { useCountryStore } from "@/stores";

import { ANT_CONFIGS } from "./constants";

const countryStore = useCountryStore();

const countries = computed(() => countryStore.$state.countries);

onMounted(async () => {
  countryStore.handlePayload(countries.value);
});
</script>

<template>
  <a-config-provider :theme="ANT_CONFIGS"> </a-config-provider>

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
