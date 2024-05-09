<script setup lang="ts">
import { createVNode } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

import { usePayload } from "@/stores";

// Data
const props = defineProps<{
  backRouteName: string;
  nextRouteName?: string;
  canNext?: boolean;
  canSubmit?: boolean;
  isStep2Navigated?: boolean;
  type?: string;
}>();

const router = useRouter();
const payloadStore = usePayload();

// Methods
const goBack = () => {
  if (props.backRouteName === "intro") {
    Modal.confirm({
      title: "Confirmation",
      icon: createVNode(ExclamationCircleOutlined),
      content: "The data will be cleared. Are you sure you want to back?",
      onOk: () => {
        router.push({ name: "intro" });
      },
      onCancel: () => {},
      width: 300,
    });
  } else {
    router.push({ name: props.backRouteName });
  }
};

const goNext = () => {
  if (props.nextRouteName === "health-checklist") {
    payloadStore.handleChange("isStep2Navigated", props.isStep2Navigated);
  }
  router.push({ name: props.nextRouteName });
};
</script>

<template>
  <a-row style="margin: 0" class="footer p-4" :gutter="[16]">
    <a-col :span="12">
      <a-button style="width: 100%" @click="goBack" size="large">
        <span class="b6 gray-8">Back</span>
      </a-button>
    </a-col>
    <a-col v-if="props.type != 'submit'" :span="12">
      <a-button
        style="width: 100%"
        :disabled="!canNext"
        type="primary"
        @click="goNext"
        size="large"
      >
        <span class="b6 gray-1" :class="{ 'gray-6': !canNext }">Next</span>
      </a-button>
    </a-col>
    <a-col v-else :span="12">
      <a-button
        style="width: 100%"
        type="primary"
        size="large"
        html-type="submit"
        :disabled="!canSubmit"
      >
        <span class="b6 gray-1" :class="{ 'gray-6': !canSubmit }">Submit</span>
      </a-button>
    </a-col>
  </a-row>
</template>

<style lang="scss">
.footer {
  border-top: 1px solid #eaedf0;
}
</style>
