<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import dayjs from 'dayjs';

import { usePayload, useCountryStore } from "@/stores";
import { type Country, type Facility } from "@/types";
import { currentDateTime } from '@/utils';

const payloadStore = usePayload();
const countryStore = useCountryStore();
const countries = countryStore.$state.countries;

const findFacilityName = (countryCode: string, facilityId: number) => {
    if (!countryCode || !facilityId) return '';
    const country = countries.find((c) => c.code === countryCode);
    if (country) {
        const facility = country.facilityList.find((f) => f.id === facilityId);
        return facility ? facility.name : '';
    }
    return '';
};
</script>

<template>
    <a-flex class="header" gap="small" justify="space-between" align="center">
        <img class="header__img" src="/src/assets/logo.svg" alt="Logo" />
        <a-flex class="header__info" justify="center" vertical>
            <a-typography-text class="header__info-geo">{{ payloadStore.$state.countryCode }} -
                {{ findFacilityName(payloadStore.$state.countryCode!, payloadStore.$state.facilityId!) }}
            </a-typography-text>
            <a-typography-text class="header__info-datetime">{{ currentDateTime }}</a-typography-text>
        </a-flex>
    </a-flex>
</template>

<style lang="scss" scoped>
.header {
    padding: 16px;
    background-color: #F9FAFB;
    border-bottom: 1px solid #EAEDF0;
    &__img {
        width: 100px;
    }
    &__info {
        text-align: right;

        &-geo {
            font-size: 12px;
            line-height: 20px;
        }

        &-datetime {
            font-size: 12px;
            line-height: 20px;
        }
    }
}
</style>