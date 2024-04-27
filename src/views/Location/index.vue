<script setup lang="ts">
import { computed } from 'vue';

import { AppFooter } from "@/components";
import { usePayload, useCountryStore } from "@/stores";
import { type Country } from "@/types";

// Data
const STATUS = [
    { code: "visitor", label: "Visitor" },
    { code: "employee", label: "Employee" },
];

const countryStore = useCountryStore();
const payloadStore = usePayload();

const footerRouteProps = {
    backRouteName: "intro",
    nextRouteName: "office-guidelines",
}

// Computed
const countries = computed(() => countryStore.$state.countries);

const facilitiesByCountry = computed(() => {
    const { countryCode } = payloadStore.$state;
    const selectedCountry = countries.value.find((country: Country) => country.code === countryCode);
    return selectedCountry ? selectedCountry.facilityList : [];
});

const canNext = computed(() => {
    const { countryCode, facilityId, statusCode } = payloadStore.$state;
    return !!countryCode && !!facilityId && !!statusCode;
});

// Method
const getCountryFlagUrl = (countryCode: string) => {
    return `/src/assets/images/location/${countryCode}.svg`;
};

const onChangeCountry = (countryCode: string) => {
    payloadStore.onChange('countryCode', countryCode);
    const selectedFacility = facilitiesByCountry.value[0];
    if (selectedFacility) {
        payloadStore.onChange('facilityId', selectedFacility.id);
    }
}
</script>

<template>
    <a-flex class="location" justify="space-between" gap="large" vertical>
        <!-- Body -->
        <a-flex class="location__body" gap="middle" vertical>
            <a-flex class="location__body-country px-4" gap="middle" vertical>
                <h5 class="h5 primary-9">
                    To begin, please select your country and facility location
                </h5>

                <template v-if="countries.length">
                    <span class="b6 gray-9">Select your country:</span>
                    <a-flex class="location__body-country-choice" gap="middle">
                        <div class="location__body-country-item px-4 pt-4 pb-2" v-for="country in countries"
                            :key="country.id" @click="onChangeCountry(country.code)"
                            :class="{ 'location__body-country-item--active': country.code === payloadStore.$state.countryCode }">
                            <img class="country-item__img" :src="getCountryFlagUrl(country.code)" alt="Country Flag">
                            <div class="b8 pt-1 text-center">{{ country.name }}</div>
                        </div>
                    </a-flex>
                </template>

                <a-empty v-else description="No countries found!" />
            </a-flex>

            <template v-if="countries.length">
                <a-flex class="location__body-facility p-4" gap="middle" vertical>
                    <span class="b6 gray-9">
                        Select the facility you are entering:
                    </span>
                    <a-radio-group class="location__body-facility-options"
                        v-model:value="payloadStore.$state.facilityId">
                        <a-flex gap="middle" vertical>
                            <a-radio :value="facility.id" v-for="facility in facilitiesByCountry" :key="facility.id">
                                <span class="location__body-facility-content b6 gray-10 ps-2">{{ facility.name }}</span>
                            </a-radio>
                        </a-flex>
                    </a-radio-group>
                </a-flex>

                <a-flex class="location__body-status p-4" gap="middle" vertical>
                    <span class="b6 gray-9">Select the status:</span>
                    <a-radio-group class="location__body-status-options" v-model:value="payloadStore.$state.statusCode">
                        <a-flex gap="middle" vertical>
                            <a-radio :value="status.code" v-for="status in STATUS" :key="status.code">
                                <span class="location__body-facility-content b6 gray-10 ps-2">{{ status.label }}</span>
                            </a-radio>
                        </a-flex>
                    </a-radio-group>
                </a-flex>
            </template>
        </a-flex>
        <AppFooter :="footerRouteProps" :canNext />
    </a-flex>
</template>

<style lang="scss">
.location {
    &__body {
        // 1. Country
        &-country {
            &-choice {
                overflow-x: scroll;

                &::-webkit-scrollbar {
                    display: none;
                }
            }

            &-item {
                &:hover {
                    transform: scale(1.05);
                    transition: transform 0.3s ease;
                }

                &--active {
                    background-color: #0062ff;
                    color: #ffffff;
                }

                background-color: #F6F6FA;
                border-radius: 4px;
                cursor: pointer;

                .country-item {
                    &__img {
                        width: 48px;
                        height: 30px;
                        object-fit: cover;
                        border-radius: 4px;
                    }
                }
            }
        }
        // 2. Facility + Status
        &-facility,
        &-status {
            background-color: #F5F6FA;

            &-options {
                display: flex;
                flex-direction: column;
            }
        }
    }
}
</style>