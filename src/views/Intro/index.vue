<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { LOCAL_STORAGE } from "@/constants";
import { useCountryStore } from "@/stores";

// Data
const countryStore = useCountryStore();
const router = useRouter();

// Computed
const countries = computed(() => countryStore.$state.countries);

// Lifecycle
onMounted(() => {
  Object.values(LOCAL_STORAGE).forEach((value) =>
    localStorage.removeItem(value),
  );
  countryStore.handlePayload(countries.value);
});

// Methods
const goToLocationPage = () => {
  router.push({ name: "location" });
};
</script>

<template>
  <a-flex class="px-4" justify="space-between" vertical>
    <!-- Body -->
    <a-flex gap="44" vertical>
      <a-flex
        class="mt-11"
        justify="center"
        align="center"
        gap="middle"
        vertical
      >
        <img src="/src/assets/logo.svg" alt="Logo" />
        <img src="/src/assets/images/intro/check-in.svg" alt="Check-in-app" />
      </a-flex>
      <a-flex class="pb-3" vertical>
        <h5 class="h5">
          Welcome and thanks for checking in with Silicon Stack!
        </h5>
        <p class="b7 gray-8">
          In light of COVID-19 there is a mandatory Check-In System in place, to
          ensure maximum safety for everyone who comes on premise. This check-in
          system is required for both visitors and employees and you will be
          required to check-in on each visit to the premises.
        </p>
      </a-flex>
    </a-flex>
    <!-- Footer -->
    <a-flex vertical>
      <a-button type="primary" size="large" @click="goToLocationPage">
        <span class="gray-1">Get Started</span>
      </a-button>
      <span class="b8 gray-6 my-2 text-center">Version 1.0.1</span>
    </a-flex>
  </a-flex>
</template>

<style lang="scss"></style>
