<script setup lang="ts">
import { computed } from 'vue';

import { AppFooter, Progress} from "@/components";
import { usePayload } from "@/stores";

const payloadStore = usePayload();
const canNext = computed(() => payloadStore.$state.isPdfOpened!);

const onClickPdf = () => {
    payloadStore.handleChange('isPdfOpened', true);
}
</script>

<template>
    <a-flex class="office-guidelines" vertical>
        <Progress :title="'1. Office-guidelines'" :description="'Next: Health Checklist'" :currentStep="1" :total-steps="3" />
        <a-flex class="pt-16 pb-23" align="center" vertical>
            <div style="text-align:center" class="pb-4 b6 gray-9">
                <span>Read and acknowledge<br> the Office Guidelines</span>
            </div>
            <a-flex
                style="background: #f6f6fa; width: 220px; height: 220px; border-radius: 50%;" justify="center" align="center" vertical>
                <a href="https://assets.kpmg/content/dam/kpmg/ie/pdf/2020/05/6232_COVID19_Return_to_Work_PDF_May_2020.pdf" target="_blank">
                    <a-space direction="vertical" align="center" @click="onClickPdf" >
                        <img src="../../assets/images/office-guidelines/pdf.png" alt="">
                        <span class="b6 gray-8 mt-2">
                            Tap to open PDF
                        </span>
                    </a-space>
                </a>
            </a-flex>
        </a-flex>
        <AppFooter :backRouteName="'location'" :nextRouteName="'health-checklist'" :isStep2Navigated="true" :canNext/> 
    </a-flex>
</template>

<style lang="scss"></style>