<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

import { useCountryStore, usePayload } from "@/stores";
import { convertDateTime } from "@/utils";
import { AppSetting } from "@/components";

// Data
const countryStore = useCountryStore();
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
  return country?.facilityList.find((f) => f.id === facilityId)?.name || "";
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
          <app-setting />
        </a-flex>
      </a-flex>
    </a-flex>
  </a-flex>
</template>

<style lang="scss">
.logo {
  width: 100px;
}
</style>
