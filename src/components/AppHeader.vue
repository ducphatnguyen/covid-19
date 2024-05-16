<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";

import { useCountryStore, useDarkMode, usePayload } from "@/stores";
import { convertDateTime } from "@/utils";

// Data
const countryStore = useCountryStore();
const darkModeStore = useDarkMode();
const payloadStore = usePayload();

const currentDateTime = ref<string>("");
const intervalId = ref<number>(0);

// Computed
const countries = computed(() => countryStore.$state.countries);

// Lifecycle
onMounted(() => {
  getConvertDateTime();
  intervalId.value = setInterval(getConvertDateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});

// Methods
const getConvertDateTime = () => {
  currentDateTime.value = convertDateTime(new Date());
};

const getFacilityName = (countryCode: string, facilityId: number) => {
  const country = countries.value.find(
    (country) => country.code === countryCode,
  );
  const facility = country?.facilityList.find((f) => f.id === facilityId);
  return facility?.name || "";
};
</script>

<template>
  <a-flex
    class="bg-gray-2 border-bottom p-4"
    justify="space-between"
    align="center"
    gap="small"
  >
    <img
      class="logo"
      src="/src/assets/logo.svg"
      alt="Logo"
    />
    <a-flex
      class="text-right"
      justify="center"
      vertical
    >
      <a-flex gap="small">
        <a-flex vertical>
          <span class="b8 gray-8">
            {{ payloadStore.$state.countryCode }} -
            {{
              getFacilityName(
                payloadStore.$state.countryCode!,
                payloadStore.$state.facilityId!,
              )
            }}
          </span>
          <span class="b8 gray-8">{{ currentDateTime }}</span>
        </a-flex>
        <a-flex
          vertical
          justify="center"
          align="center"
        >
          <template v-if="darkModeStore.$state.isDarkMode">
            <img
              class="moon-sun-icon icon-effect"
              width="32px"
              src="/src/assets/icons/moon-outline.svg"
              alt="Moon"
              @click="darkModeStore.handleChange({ isDarkMode: false })"
            />
          </template>
          <template v-else>
            <img
              class="moon-sun-icon icon-effect"
              width="32px"
              src="/src/assets/icons/sunny-outline.svg"
              alt="Sunny"
              @click="darkModeStore.handleChange({ isDarkMode: true })"
            />
          </template>
        </a-flex>
      </a-flex>
    </a-flex>
  </a-flex>
</template>

<style lang="scss">
.logo {
  width: 100px;
}
.moon-sun-icon {
  cursor: pointer;
}
.icon-effect {
  transition: transform 0.3s ease;
}
.icon-effect:hover {
  transform: scale(1.1);
}
</style>
