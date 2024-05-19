<script setup lang="ts">
import { computed, onMounted } from "vue";

import { AppFooter, ProgressStepper } from "@/components";
import { FILE_URLS } from "@/constants";
import { usePayload } from "@/stores";

// Data
const payloadStore = usePayload();

// Computed
const canNext = computed(() => payloadStore.$state.isPdfOpened!);

const showFooter = computed(() => {
  return !payloadStore.$state.isReviewed;
});

// Lifecycle
onMounted(() => {
  payloadStore.handleChange("isReviewed", false);
});

// Methods
const onClickPdf = () => {
  payloadStore.handleChange("isPdfOpened", true);
};
</script>

<template>
  <a-flex
    class="office-guidelines"
    vertical
  >
    <progress-stepper
      :title="$t('CIRCLE_PROGRESS_BAR.STEP_1.TITLE')"
      :description="$t('CIRCLE_PROGRESS_BAR.STEP_1.DESCRIPTION')"
      :current-step="Number($t('CIRCLE_PROGRESS_BAR.STEP_1.CURRENT_STEP'))"
      :total-steps="Number($t('CIRCLE_PROGRESS_BAR.TOTAL_STEPS'))"
    />
    <a-flex
      class="pt-16 pb-23"
      align="center"
      vertical
    >
      <div class="pb-4 b6 gray-9 text-center">
        <i18n-t
          keypath="OFFICE_GUIDELINES.REQUIREMENTS"
          tag="span"
        >
          <template #newLine>
            <br />
          </template>
        </i18n-t>
      </div>
      <a-flex
        class="pdf__background bg-layout"
        justify="center"
        align="center"
        vertical
      >
        <a
          :href="FILE_URLS.covid_pdf"
          target="_blank"
        >
          <a-space
            direction="vertical"
            align="center"
            @click="onClickPdf"
          >
            <img
              src="../../assets/images/office-guidelines/pdf.png"
              alt="Covid"
            />
            <span class="b6 gray-8 mt-2">
              {{ $t("OFFICE_GUIDELINES.INSTRUCTION") }}
            </span>
          </a-space>
        </a>
      </a-flex>
    </a-flex>
    <app-footer
      v-if="showFooter"
      :back-route-name="'location'"
      :next-route-name="'health-checklist'"
      :is-step2-navigated="true"
      :can-next
    />
  </a-flex>
</template>

<style lang="scss">
.pdf__background {
  width: 220px;
  height: 220px;
  border-radius: 50%;
}
</style>
