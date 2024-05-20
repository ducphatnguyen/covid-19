<script setup lang="ts">
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
import { useRouter } from "vue-router";

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

const payloadStore = usePayload();
const router = useRouter();

const confirmNavigation = (title: string, content: string) => {
  Modal.confirm({
    title,
    icon: createVNode(ExclamationCircleOutlined),
    content,
    onOk: () => router.push({ name: props.backRouteName }),
    onCancel: () => {},
    width: 300,
  });
};

// Methods
const navigateBack = () => {
  if (props.backRouteName === "intro") {
    confirmNavigation(
      "Confirmation",
      "The data will be cleared. Are you sure you want to back?",
    );
  } else {
    router.push({ name: props.backRouteName });
  }
};

const navigateNext = () => {
  if (props.nextRouteName === "health-checklist") {
    payloadStore.handleChange("isStep2Navigated", props.isStep2Navigated);
  }
  router.push({ name: props.nextRouteName });
};
</script>

<template>
  <a-row
    style="margin: 0"
    class="border-top p-4"
    :gutter="[16]"
  >
    <a-col :span="12">
      <a-button
        class="button-100"
        size="large"
        @click="navigateBack"
      >
        <span class="b6">{{ $t("BUTTON.BACK") }}</span>
      </a-button>
    </a-col>
    <a-col
      v-if="props.type !== 'submit'"
      :span="12"
    >
      <a-button
        class="button-100"
        type="primary"
        size="large"
        :disabled="!canNext"
        @click="navigateNext"
      >
        <span
          class="b6"
          :class="{ 'gray-6': !canNext }"
        >
          {{ $t("BUTTON.NEXT") }}
        </span>
      </a-button>
    </a-col>
    <a-col
      v-else
      :span="12"
    >
      <a-button
        class="button-100"
        type="primary"
        size="large"
        html-type="submit"
        :disabled="!canSubmit"
      >
        <span
          class="b6"
          :class="{ 'gray-6': !canSubmit }"
        >
          {{ $t("BUTTON.SUBMIT") }}
        </span>
      </a-button>
    </a-col>
  </a-row>
</template>

<style lang="scss"></style>
