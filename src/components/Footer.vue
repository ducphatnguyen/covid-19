<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
    backName: string;
    nextName: string;
    canNext: boolean;
}>();

const router = useRouter();
const goBack = () => {
    router.push({ name: props.backName });
};
const goNext = () => {
    router.push({ name: props.nextName });
};
</script>

<template>
    <!-- Footer -->
    <a-row :gutter="[16]" class="footer p-4" style="margin: 0">
        <a-col :span="12">
            <a-button @click="goBack" style="width: 100%" size="large">
                <span class="b6 gray-8">Back</span>
            </a-button>
        </a-col>
        <a-col :span="12">
            <a-button :disabled="!canNext" type="primary" style="width: 100%" @click="goNext" size="large">
                <span class="b6 gray-1">Next</span>
            </a-button>
        </a-col>
    </a-row>
</template>

<style lang="scss" scoped>
.footer {
    border-top: 1px solid #EAEDF0;
}
</style>