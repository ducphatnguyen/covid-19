<script setup lang="ts">
import { useRouter } from "vue-router";

import { usePayload } from "@/stores";

import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
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

// Method

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
  <a-row :gutter="[16]" class="footer p-4" style="margin: 0">
    <a-col :span="12">
      <a-button style="width: 100%" @click="goBack" size="large">
        <span class="b6 gray-8">Back</span>
      </a-button>
    </a-col>
    <a-col :span="12" v-if="props.type != 'submit'">
      <a-button
        style="width: 100%"
        :disabled="!canNext"
        type="primary"
        @click="goNext"
        size="large"
      >
        <span :class="{ 'gray-6': !canNext }" class="b6 gray-1">Next</span>
      </a-button>
    </a-col>
    <a-col :span="12" v-else>
      <a-button
        style="width: 100%"
        :disabled="!canSubmit"
        type="primary"
        size="large"
        html-type="submit"
      >
        <span :class="{ 'gray-6': !canSubmit }" class="b6 gray-1">Submit</span>
      </a-button>
    </a-col>
  </a-row>
</template>

<style lang="scss">
.footer {
  border-top: 1px solid #eaedf0;
}
</style>
