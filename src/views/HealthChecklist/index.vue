<script setup lang="ts">
import { computed } from "vue";

import { AppFooter, Progress } from "@/components";
import { usePayload, useCountryStore } from "@/stores";
import type { Country } from "@/types";

// Data
const ANSWERS = [
  { code: true, label: "YES" },
  { code: false, label: "NO" },
];

const payloadStore = usePayload();
const countryStore = useCountryStore();
const { checklistAnswers } = payloadStore.$state;

// Computed
const countries = computed(() => countryStore.$state.countries);

const questionsByCountry = computed(() => {
  const { countryCode } = payloadStore.$state;
  return countries.value.find((country: Country) => country.code === countryCode)?.questionList;
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
  <a-flex class="office-guidelines" vertical>
    <Progress
      :title="'2. Health Checklist'"
      :description="'Next: Personal Information'"
      :currentStep="2"
      :total-steps="3"
    />
    <a-flex class="px-4 py-6" gap="middle" vertical>
      <a-flex class="b6 gray-9">
        <span>Select your current health information:</span>
      </a-flex>

      <a-flex
        v-for="(question, index) in questionsByCountry"
        :key="question.code"
        style="background: #f6f6fa"
        class="p-4"
        gap="middle"
        vertical
      >
        <span class="h6 gray-10"> {{ index + 1 }}. {{ question.desc }} </span>
        <a-radio-group v-model:value="checklistAnswers![question.code]">
          <template v-if="!payloadStore.$state.isReviewed">
            <a-flex gap="middle" vertical>
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
            <a-flex gap="middle" vertical>
              <a-radio v-for="answer in ANSWERS" :key="answer.code" :value="answer.code" disabled>
                <span class="b6 gray-10 ps-2">{{ answer.label }}</span>
              </a-radio>
            </a-flex>
          </template>
        </a-radio-group>
      </a-flex>
    </a-flex>
    <AppFooter
      v-if="showFooter"
      :backRouteName="'office-guidelines'"
      :nextRouteName="'personal-information'"
      :canNext="canNext"
    />
  </a-flex>
</template>

<style lang="scss"></style>
