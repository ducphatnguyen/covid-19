<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useCountryStore, usePayload } from "@/stores";
import type { Country, Payload, Question } from "@/types";

// Data
const router = useRouter();

const countryStore = useCountryStore();
const payloadStore = usePayload();

// Computed
const countries = computed(() => countryStore.$state.countries);

const questionList = computed(() => {
  const { countryCode } = payloadStore.$state;
  const country = countries.value.find(
    (country: Country) => country.code === countryCode,
  );
  return country ? country.questionList : [];
});

const type = computed(() => {
  const { checklistAnswers } = payloadStore.$state;
  if (questionList.value.length) {
    return compareResults(checklistAnswers, questionList.value)
      ? "fail"
      : "success";
  } else {
    return "";
  }
});

// Lifecycle
onMounted(() => {
  payloadStore.handleChange("isReviewed", false);
});

const compareResults = (
  checklistAnswers: Payload["checklistAnswers"],
  questionList: Question[],
) => {
  return questionList.some(
    (question) =>
      checklistAnswers &&
      question.code in checklistAnswers &&
      checklistAnswers[question.code] !== question.answer,
  );
};

const goBackHome = async () => {
  router.push({ name: "intro" });
};

const goToReviewPage = () => {
  router.push({ name: "review" });
};
</script>

<template>
  <a-flex
    class="successfully"
    vertical
  >
    <a-flex
      v-if="type === 'success'"
      class="result px-15 pt-2"
      vertical
    >
      <a-flex
        class="pb-8"
        align="center"
        vertical
      >
        <img
          class="pb-8 result__img--sucess"
          src="/src/assets/images/successfully/success.svg"
          alt="Result"
        />
        <span class="h5 gray-10 pb-4 text-center">
          {{ $t("SUCCESFULLY.SUCCESS.MESSAGE") }}
        </span>
        <span class="b6 gray-8 text-center">
          {{ $t("SUCCESFULLY.SUCCESS.DESCRIPTION") }}
        </span>
      </a-flex>
    </a-flex>
    <a-flex
      v-else-if="type === 'fail'"
      class="result px-9"
      vertical
    >
      <a-flex
        class="pb-5"
        align="center"
        vertical
      >
        <img
          class="result__img--fail pb-8"
          src="/src/assets/images/successfully/fail.svg"
          alt="Result"
        />
        <span class="h5 gray-10 pb-1 text-center">
          {{ $t("SUCCESFULLY.FAILURE.MESSAGE") }}
        </span>
        <span class="b6 gray-8 text-center">
          {{ $t("SUCCESFULLY.FAILURE.DESCRIPTION") }}
        </span>
        <span class="b6 gray-9 text-center pt-8">
          {{ $t("SUCCESFULLY.FAILURE.INSTRUCTION") }}
        </span>
      </a-flex>
    </a-flex>

    <a-flex
      class="mb-24"
      :class="type === 'success' ? 'px-15' : 'px-9'"
      wrap="wrap"
      align="center"
      justify="center"
      gap="small"
    >
      <a-button
        style="min-width: 120px"
        size="large"
        @click="goBackHome"
      >
        <span class="b6">{{ $t("BUTTON.BACK_HOME") }}</span>
      </a-button>
      <a-button
        v-if="!payloadStore.$state.isReviewed"
        style="min-width: 120px"
        size="large"
        @click="goToReviewPage"
      >
        <span class="b6">{{ $t("BUTTON.REVIEW") }}</span>
      </a-button>
    </a-flex>
  </a-flex>
</template>

<style lang="scss">
.result {
  &__img {
    &--sucess {
      width: 270px;
    }

    &--fail {
      width: 120px;
    }
  }
}
</style>
