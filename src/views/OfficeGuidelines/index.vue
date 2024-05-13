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
      :title="'1. Office-guidelines'"
      :description="'Next: Health Checklist'"
      :current-step="1"
      :total-steps="3"
    />
    <a-flex
      class="pt-16 pb-23"
      align="center"
      vertical
    >
      <div class="pb-4 b6 gray-9 text-center">
        <span>
          Read and acknowledge
          <br />
          the Office Guidelines
        </span>
      </div>
      <a-flex
        class="background--secondary"
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
            <span class="b6 gray-8 mt-2">Tap to open PDF</span>
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
.background--secondary {
  background: #f6f6fa;
  width: 220px;
  height: 220px;
  border-radius: 50%;
}
</style>
