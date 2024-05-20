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
  selectedFacility &&
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
  <a-flex
    class="location"
    justify="space-between"
    gap="large"
    vertical
  >
    <!-- Body -->
    <a-flex
      class="location__body"
      gap="middle"
      vertical
    >
      <a-flex
        class="location__body-country px-4"
        gap="middle"
        vertical
      >
        <h5
          v-if="!payloadStore.$state.isReviewed"
          class="h5 primary-9"
        >
          {{ $t("LOCATION.REQUIREMENTS") }}
        </h5>
        <template v-if="countries.length">
          <span class="b6 gray-9">
            {{ $t("LOCATION.COUNTRY_SELECTION_GUIDE") }}
          </span>
          <a-flex
            class="location__body-country-choice"
            gap="middle"
          >
            <div
              v-for="country in countries"
              :key="country.id"
              class="location__body-country-item px-4 pt-4 pb-2 bg-layout"
              :class="{
                'location__body-country-item--active':
                  country.code === payloadStore.$state.countryCode,
                'location__body-country-item--deactivate':
                  payloadStore.$state.isReviewed,
              }"
              @click="
                !payloadStore.$state.isReviewed && onChangeCountry(country.code)
              "
            >
              <div class="country-item__wrap">
                <img
                  class="country-item__img"
                  :src="getCountryFlagUrl(country.code)"
                  alt="Country Flag"
                />
                <div class="b8 pt-1 text-center">
                  <span class="gray-10">{{ country.name }}</span>
                </div>
              </div>
            </div>
          </a-flex>
        </template>
        <a-empty
          v-else
          description="No countries found!"
        />
      </a-flex>

      <template v-if="countries.length">
        <a-flex
          class="location__body-facility p-4 bg-layout"
          gap="middle"
          vertical
        >
          <span class="b6 gray-9">
            {{ $t("LOCATION.FACILITY_SELECTION_GUIDE") }}
          </span>
          <a-radio-group v-model:value="payloadStore.$state.facilityId">
            <a-flex
              gap="middle"
              vertical
            >
              <a-radio
                v-for="facility in facilitiesByCountry"
                :key="facility.id"
                :value="facility.id"
                :disabled="payloadStore.$state.isReviewed"
                @click="
                  !payloadStore.$state.isReviewed &&
                    onChangeFacility(facility.id)
                "
              >
                <span class="location__body-facility-content b6 gray-10 ps-2">
                  {{ facility.name }}
                </span>
              </a-radio>
            </a-flex>
          </a-radio-group>
        </a-flex>
        <a-flex
          class="location__body-status p-4 bg-layout"
          gap="middle"
          vertical
        >
          <span class="b6 gray-9">
            {{ $t("LOCATION.STATUS_SELECTION_GUIDE") }}
          </span>
          <a-radio-group v-model:value="payloadStore.$state.statusCode">
            <a-flex
              gap="middle"
              vertical
            >
              <a-radio
                v-for="status in STATUS"
                :key="status.code"
                :value="status.code"
                :disabled="payloadStore.$state.isReviewed"
                @click="
                  !payloadStore.$state.isReviewed && onChangeStatus(status.code)
                "
              >
                <span class="location__body-facility-content b6 gray-10 ps-2">
                  {{ status.label }}
                </span>
              </a-radio>
            </a-flex>
          </a-radio-group>
        </a-flex>
      </template>
    </a-flex>
    <app-footer
      v-if="showFooter"
      :back-route-name="'intro'"
      :next-route-name="'office-guidelines'"
      :can-next
    />
  </a-flex>
</template>

<style lang="scss">
.location {
  &__body {
    &-country {
      &-choice {
        overflow-x: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      &-item {
        border-radius: 4px;
        cursor: pointer;
        &--active {
          background-color: $color-primary-3-alpha-50 !important;
        }
        &--deactivate {
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
  }
}
</style>
