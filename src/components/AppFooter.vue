<script setup lang="ts">
import { useRouter } from "vue-router";
import { usePayload } from "@/stores";

const props = defineProps<{
    backRouteName: string;
    nextRouteName?: string;
    canNext?: boolean;
    isStep2Navigated?: boolean;
}>();

const payloadStore = usePayload();
console.log(payloadStore.$state)

const router = useRouter();
const goBack = () => {
    router.push({ name: props.backRouteName });
};
const goNext = () => {
    if (props.nextRouteName === 'health-checklist') {
        payloadStore.onChange('isStep2Navigated', props.isStep2Navigated);
    }

    router.push({ name: props.nextRouteName });
};
</script>

<template>
    <a-row :gutter="[16]" class="footer p-4" style="margin: 0">
        <a-col :span="12">
            <a-button style="width: 100%" @click="goBack"  size="large">
                <span class="b6 gray-8">Back</span>
            </a-button>
        </a-col>
        <a-col :span="12">
            <a-button style="width: 100%" :disabled="!canNext" type="primary" @click="goNext" size="large">
                <span :class="{'gray-6':!canNext}" class="b6 gray-1">Next</span>
            </a-button>
        </a-col>
    </a-row>
</template>

<style lang="scss">
.footer {
    border-top: 1px solid #EAEDF0;
}
</style>