<script setup lang="ts">
import { computed, onMounted } from "vue";

import { AppFooter } from "@/components";
import { STATUS } from "@/constants";
import { useCountryStore, usePayload } from "@/stores";
import type { Country } from "@/types";
import { getCountryFlagUrl } from "@/utils";

// Data
const countryStore = useCountryStore();
const payloadStore = usePayload();

// Computed
const countries = computed(() => countryStore.$state.countries);

const facilitiesByCountry = computed(() => {
  const { countryCode } = payloadStore.$state;
  const selectedCountry = countries.value.find(
    (country: Country) => country.code === countryCode,
  );
  return selectedCountry ? selectedCountry.facilityList : [];
});

const canNext = computed(() => {
  const { countryCode, facilityId, statusCode } = payloadStore.$state;
  return !!countryCode && !!facilityId && !!statusCode;
});

const showFooter = computed(() => {
  return !payloadStore.$state.isReviewed;
});

// Lifecycle
onMounted(() => {
  payloadStore.handleChange("isReviewed", false);
});

// Methods
const onChangeCountry = (countryCode: string) => {
  payloadStore.handleChange("countryCode", countryCode);

  const selectedFacility = facilitiesByCountry.value[0];
  if (selectedFacility)
    payloadStore.handleChange("facilityId", selectedFacility.id);

  payloadStore.handleChange("statusCode", STATUS[0].code);
};

const onChangeFacility = (facilityId: number) => {
  payloadStore.handleChange("facilityId", facilityId);
};

const onChangeStatus = (statusCode: string) => {
  payloadStore.handleChange("statusCode", statusCode);
};
</script>

<template>
  <a-flex class="location" justify="space-between" gap="large" vertical>
    <!-- Body -->
    <a-flex class="location__body" gap="middle" vertical>
      <a-flex class="location__body-country px-4" gap="middle" vertical>
        <h5 class="h5 primary-9" v-if="!payloadStore.$state.isReviewed">
          To begin, please select your country and facility location
        </h5>
        <template v-if="countries.length">
          <span class="b6 gray-9">Select your country:</span>
          <a-flex class="location__body-country-choice" gap="middle">
            <template v-if="!payloadStore.$state.isReviewed">
              <div
                v-for="country in countries"
                :key="country.id"
                class="location__body-country-item px-4 pt-4 pb-2"
                @click="onChangeCountry(country.code)"
                :class="{
                  'location__body-country-item--active':
                    country.code === payloadStore.$state.countryCode,
                }"
              >
                <div class="country-item__wrap">
                  <img
                    class="country-item__img"
                    :src="getCountryFlagUrl(country.code)"
                    alt="Country Flag"
                  />
                  <div class="b8 pt-1 text-center">{{ country.name }}</div>
                </div>
              </div>
            </template>
            <template v-else>
              <div
                v-for="country in countries"
                :key="country.id"
                class="location__body-country-item px-4 pt-4 pb-2 location__body-country-item--deactive"
                :class="{
                  'location__body-country-item--active':
                    country.code === payloadStore.$state.countryCode,
                }"
              >
                <div>
                  <img
                    class="country-item__img"
                    :src="getCountryFlagUrl(country.code)"
                    alt="Country Flag"
                  />
                  <div class="b8 pt-1 text-center">{{ country.name }}</div>
                </div>
              </div>
            </template>
          </a-flex>
        </template>
        <a-empty v-else description="No countries found!" />
      </a-flex>

      <template v-if="countries.length">
        <a-flex class="location__body-facility p-4" gap="middle" vertical>
          <span class="b6 gray-9">Select the facility you are entering:</span>
          <a-radio-group
            class="location__body-facility-options"
            v-model:value="payloadStore.$state.facilityId"
          >
            <a-flex gap="middle" vertical>
              <template v-if="!payloadStore.$state.isReviewed">
                <a-radio
                  v-for="facility in facilitiesByCountry"
                  :key="facility.id"
                  :value="facility.id"
                  @click="onChangeFacility(facility.id)"
                >
                  <span class="location__body-facility-content b6 gray-10 ps-2">
                    {{ facility.name }}
                  </span>
                </a-radio>
              </template>
              <template v-else>
                <a-radio
                  v-for="facility in facilitiesByCountry"
                  :key="facility.id"
                  :value="facility.id"
                  disabled
                >
                  <span class="location__body-facility-content b6 gray-10 ps-2">
                    {{ facility.name }}
                  </span>
                </a-radio>
              </template>
            </a-flex>
          </a-radio-group>
        </a-flex>

        <a-flex class="location__body-status p-4" gap="middle" vertical>
          <span class="b6 gray-9">Select the status:</span>
          <a-radio-group
            class="location__body-status-options"
            v-model:value="payloadStore.$state.statusCode"
          >
            <a-flex gap="middle" vertical>
              <template v-if="!payloadStore.$state.isReviewed">
                <a-radio
                  v-for="status in STATUS"
                  :key="status.code"
                  :value="status.code"
                  @click="onChangeStatus(status.code)"
                >
                  <span class="location__body-facility-content b6 gray-10 ps-2">
                    {{ status.label }}
                  </span>
                </a-radio>
              </template>
              <template v-else>
                <a-radio
                  v-for="status in STATUS"
                  :key="status.code"
                  :value="status.code"
                  disabled
                >
                  <span class="location__body-facility-content b6 gray-10 ps-2">
                    {{ status.label }}
                  </span>
                </a-radio>
              </template>
            </a-flex>
          </a-radio-group>
        </a-flex>
      </template>
    </a-flex>
    <AppFooter
      v-if="showFooter"
      :backRouteName="'intro'"
      :nextRouteName="'office-guidelines'"
      :canNext
    />
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
        background-color: #f6f6fa;
        border-radius: 4px;
        cursor: pointer;

        &--active {
          background-color: #0062ff;
          color: #ffffff;
        }

        &--deactive {
          cursor: not-allowed;
        }

        .country-item {
          &__wrap {
            &:hover {
              transform: scale(1.05);
              transition: transform 0.3s ease;
            }
          }
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
      background-color: #f5f6fa;

      &-options {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
