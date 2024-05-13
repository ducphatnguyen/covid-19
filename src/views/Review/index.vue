<script setup lang="ts">
import { onMounted } from "vue";

import {
  Location,
  OfficeGuidelines,
  HealthChecklist,
  PersonalInformation,
  Successfully,
} from "@/views";
import { usePayload } from "@/stores";

// Data
const payloadStore = usePayload();

// Lifecycle
onMounted(() => {
  payloadStore.handleChange("isReviewed", true);
});
</script>

<template>
  <location />
  <office-guidelines />
  <health-checklist />
  <personal-information />
  <successfully />
</template>

<style lang="scss"></style>
