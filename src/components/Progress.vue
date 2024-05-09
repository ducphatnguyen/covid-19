<script setup lang="ts">
import { usePayload } from "@/stores";

// Data
const props = defineProps<{
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
}>();

const payloadStore = usePayload();

const percent = (100 * props.currentStep) / props.totalSteps;
</script>

<template>
  <a-flex class="px-4" justify="space-between">
    <a-flex vertical>
      <span class="h5 primary-9">{{ props.title }}</span>
      <span class="b7 gray-8">{{ props.description }}</span>
    </a-flex>

    <a-progress
      v-if="!payloadStore.$state.isReviewed"
      type="circle"
      size="small"
      :percent="percent"
      :stroke-width="9"
    >
      <template #format>
        <span class="b8"
          >{{ props.currentStep }} of {{ props.totalSteps }}</span
        >
      </template>
    </a-progress>
  </a-flex>
</template>

<style lang="scss"></style>
