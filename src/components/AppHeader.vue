<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

import { usePayload, useCountryStore } from "@/stores";
import { convertDateTime } from '@/utils';

const payloadStore = usePayload();
const countryStore = useCountryStore();

const currentDateTime = ref<string>('');
const intervalId = ref<number>(0);

// Computed
const countries = computed(() => countryStore.$state.countries);

// Lifecycle Hook
onMounted(() => {
    getConvertDateTime();
    intervalId.value = setInterval(getConvertDateTime, 1000);
});

onBeforeUnmount(() => {
    clearInterval(intervalId.value);
});

const findFacilityName = (countryCode: string, facilityId: number) => {
    if (!countryCode || !facilityId) return '';
    const country = countries.value.find((c) => c.code === countryCode);
    if (country) {
        const facility = country.facilityList.find((f) => f.id === facilityId);
        return facility ? facility.name : '';
    }
    return '';
};

const getConvertDateTime = () => {
    currentDateTime.value = convertDateTime(new Date());
};
</script>


<template>
    <a-flex class="header p-4" gap="small" justify="space-between" align="center">
        <img class="header__img" src="/src/assets/logo.svg" alt="Logo" />
        <a-flex class="text-right" justify="center" vertical>
            <span class="b8">{{ payloadStore.$state.countryCode }} -
                {{ findFacilityName(payloadStore.$state.countryCode!, payloadStore.$state.facilityId!) }}
            </span>
            <span class="b8">{{ currentDateTime }}</span>
        </a-flex>
    </a-flex>
</template>

<style lang="scss">
.header {
    background-color: #F9FAFB;
    border-bottom: 1px solid #EAEDF0;
    &__img {
        width: 100px;
    }
}
</style>