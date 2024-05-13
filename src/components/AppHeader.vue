<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";

import { useCountryStore, usePayload } from "@/stores";
import { convertDateTime } from "@/utils";

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
  const facility = country?.facilityList.find((f) => f.id === facilityId);
  return facility?.name || "";
};
</script>

<template>
  <a-flex
    class="header p-4"
    justify="space-between"
    align="center"
    gap="small"
  >
    <img
      class="header__img"
      src="/src/assets/logo.svg"
      alt="Logo"
    />
    <a-flex
      class="text-right"
      justify="center"
      vertical
    >
      <span class="b8">
        {{ payloadStore.$state.countryCode }} -
        {{
          getFacilityName(
            payloadStore.$state.countryCode!,
            payloadStore.$state.facilityId!,
          )
        }}
      </span>
      <span class="b8">{{ currentDateTime }}</span>
    </a-flex>
  </a-flex>
</template>

<style lang="scss">
.header {
  background-color: #f9fafb;
  border-bottom: 1px solid #eaedf0;
  &__img {
    width: 100px;
  }
}
</style>
