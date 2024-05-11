<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { usePayload, useCountryStore } from "@/stores";
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
  <a-flex class="successfully" vertical>
    <a-flex v-if="type === 'success'" class="result px-15 pt-2" vertical>
      <a-flex class="pb-8" align="center" vertical>
        <img
          class="pb-8 result__img--sucess"
          src="/src/assets/images/successfully/success.svg"
          alt="Result"
        />
        <span class="h5 gray-10 pb-4 text-center">Check-In Successful!</span>
        <span class="b6 gray-8 text-center">
          Thank you for completing. You can now safely enter the office. Please
          be sure to check-in on each office visit. Have a great day!
        </span>
      </a-flex>
    </a-flex>
    <a-flex v-else-if="type === 'fail'" class="result px-9" vertical>
      <a-flex class="pb-5" align="center" vertical>
        <img
          class="pb-8 result__img--fail"
          src="/src/assets/images/successfully/fail.svg"
          alt="Result"
        />
        <span class="h5 gray-10 pb-1 text-center">Check-In Failed!</span>
        <span class="b6 gray-8 text-center">
          To prevent the possible spread of COVID and ensure the safety of you
          and your colleagues, you’re not eligible to enter our Silicon Stack
          site at this time.
        </span>
        <span class="b6 gray-9 text-center pt-8">
          Please call your Silicon Stack Line Manager or Meeting Host
          immediately to advise.
        </span>
      </a-flex>
    </a-flex>

    <a-flex
      wrap="wrap"
      align="center"
      justify="center"
      gap="small"
      class="mb-24"
      :class="type === 'success' ? 'px-15' : 'px-9'"
    >
      <a-button style="min-width: 120px" size="large" @click="goBackHome">
        <span class="b6 gray-8" style="width: 1">Back Home</span>
      </a-button>
      <a-button
        style="min-width: 120px"
        size="large"
        @click="goToReviewPage"
        v-if="!payloadStore.$state.isReviewed"
      >
        <span class="b6 gray-8">Review</span>
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
