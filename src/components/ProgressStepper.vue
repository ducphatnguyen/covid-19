<script setup lang="ts">
import { usePayload, useDarkMode } from "@/stores";

// Data
const props = defineProps<{
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
}>();

const payloadStore = usePayload();
const darkMode = useDarkMode();

const percent = (100 * props.currentStep) / props.totalSteps;
</script>

<template>
  <a-flex
    class="px-4"
    justify="space-between"
  >
    <a-flex vertical>
      <span class="h5 primary-9">{{ props.title }}</span>
      <span class="b7 gray-8">{{ props.description }}</span>
    </a-flex>

    <a-progress
      v-if="!payloadStore.$state.isReviewed"
      type="circle"
      size="small"
      status="success"
      :percent="percent"
      :stroke-width="9"
      :trail-color="darkMode.$state.isDarkMode ? '#B0B0B0' : ''"
    >
      <template #format>
        <span class="b8">
          {{ props.currentStep }} {{ $t("CIRCLE_PROGRESS_BAR.OF") }}
          {{ props.totalSteps }}
        </span>
      </template>
    </a-progress>
  </a-flex>
</template>

<style lang="scss"></style>
