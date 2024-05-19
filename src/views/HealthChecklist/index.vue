<script setup lang="ts">
import { computed } from "vue";

import { AppFooter, ProgressStepper } from "@/components";
import { ANSWERS } from "@/constants";
import { useCountryStore, usePayload } from "@/stores";
import type { Country } from "@/types";

// Data
const countryStore = useCountryStore();
const payloadStore = usePayload();
const { checklistAnswers } = payloadStore.$state;

// Computed
const countries = computed(() => countryStore.$state.countries);

const questionsByCountry = computed(() => {
  const { countryCode } = payloadStore.$state;
  return countries.value.find(
    (country: Country) => country.code === countryCode,
  )?.questionList;
});

const canNext = computed(() => {
  if (!checklistAnswers) return false;
  return Object.values(checklistAnswers).every((answer) => answer !== null);
});

const showFooter = computed(() => {
  return !payloadStore.$state.isReviewed;
});

// Methods
const onChangeCheckListAnswers = (questionCode: string, answer: boolean) => {
  payloadStore.handleChange("checklistAnswers", {
    ...checklistAnswers,
    [questionCode]: answer,
  });
};
</script>

<template>
  <a-flex
    class="office-guidelines"
    vertical
  >
    <progress-stepper
      :title="$t('CIRCLE_PROGRESS_BAR.STEP_2.TITLE')"
      :description="$t('CIRCLE_PROGRESS_BAR.STEP_2.DESCRIPTION')"
      :current-step="Number($t('CIRCLE_PROGRESS_BAR.STEP_2.CURRENT_STEP'))"
      :total-steps="Number($t('CIRCLE_PROGRESS_BAR.TOTAL_STEPS'))"
    />
    <a-flex
      class="px-4 py-6"
      gap="middle"
      vertical
    >
      <a-flex class="b6 gray-9">
        <span>{{ $t("HEALTH_CHECKLIST.HEALTH_SELECTION_GUIDE") }}</span>
      </a-flex>
      <a-flex
        v-for="(question, index) in questionsByCountry"
        :key="question.code"
        class="p-4 bg-layout"
        gap="middle"
        vertical
      >
        <span class="h6 gray-10">{{ index + 1 }}. {{ question.desc }}</span>
        <a-radio-group v-model:value="checklistAnswers![question.code]">
          <template v-if="!payloadStore.$state.isReviewed">
            <a-flex
              gap="middle"
              vertical
            >
              <a-radio
                v-for="answer in ANSWERS"
                :key="answer.code"
                :value="answer.code"
                @change="onChangeCheckListAnswers(question.code, answer.code)"
              >
                <span class="b6 gray-10 ps-2">{{ answer.label }}</span>
              </a-radio>
            </a-flex>
          </template>
          <template v-else>
            <a-flex
              gap="middle"
              vertical
            >
              <a-radio
                v-for="answer in ANSWERS"
                :key="answer.code"
                :value="answer.code"
                disabled
              >
                <span class="b6 gray-10 ps-2">{{ answer.label }}</span>
              </a-radio>
            </a-flex>
          </template>
        </a-radio-group>
      </a-flex>
    </a-flex>
    <app-footer
      v-if="showFooter"
      :back-route-name="'office-guidelines'"
      :next-route-name="'personal-information'"
      :can-next="canNext"
    />
  </a-flex>
</template>

<style lang="scss"></style>
