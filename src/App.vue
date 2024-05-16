<script setup lang="ts">
import { computed, onMounted } from "vue";

import { useCountryStore, useDarkMode } from "@/stores";
import { ANT_CONFIGS } from "@/constants";

// Data
const countryStore = useCountryStore();
const darkMode = useDarkMode();

// Computed
const countries = computed(() => countryStore.$state.countries);

// Lifecycle
onMounted(() => {
  countryStore.handlePayload(countries.value);
});
</script>

<template>
  <a-config-provider :theme="ANT_CONFIGS" />
  <div
    class="container"
    :class="{
      dark: darkMode.$state.isDarkMode,
    }"
  >
    <router-view />
  </div>
</template>

<style lang="scss"></style>
