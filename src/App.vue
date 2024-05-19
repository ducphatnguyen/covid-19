<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { setLocale } from "@vee-validate/i18n";

import { ANT_CONFIGS } from "@/constants";
import { useCountryStore, useDarkMode, useLanguageMode } from "@/stores";

// Data
const { locale } = useI18n();
const countryStore = useCountryStore();
const darkMode = useDarkMode();
const languageModeStore = useLanguageMode();

// Computed
const countries = computed(() => countryStore.$state.countries);
const languageCode = computed(
  () => languageModeStore.$state.languageCode ?? "en",
);

watch(languageCode, (newLangCode) => {
  locale.value = newLangCode;
  setLocale(newLangCode);
});

// Lifecycle
onMounted(() => {
  locale.value = languageCode.value;
  setLocale(languageCode.value);
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
