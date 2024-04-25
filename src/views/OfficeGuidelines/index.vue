<script setup lang="ts">
import { ref, computed } from 'vue';

import { AppFooter} from "@/components";

const isClicked = ref<boolean>(false);
const onClickPdf = () => {
    isClicked.value = true;
}
const canNext = computed(() => {
    if(isClicked.value == true) {
        return true;
    }
    return false;
});
</script>

<template>
    <a-flex class="office-guidelines" vertical>

        <a-flex justify="space-between" class="progress">
            <a-flex vertical>
                <span class="h5 primary-9">1. Office-guidelines</span>
                <span class="b7 gray-8">Next: Health Checklist</span>
            </a-flex>
            <a-progress type="circle" :percent="100 / 3" size="small" :strokeWidth="9" :strokeColor="'#15B982'">
                <template #format="percent">
                    <span class="b8">1 of 3</span>
                </template>
            </a-progress>
        </a-flex>

        <a-flex align="center" class="pt-16 pb-23" vertical>

            <div style="text-align:center" class="pb-4 b6 gray-9">
                <span>Read and acknowledge<br> the Office Guidelines</span>
            </div>
            <a-flex
                style="background: #ececec; width: 220px; height: 220px; display: flex; justify-content: center; align-items: center; flex-direction: column; border-radius: 50%;">
                <a href="https://assets.kpmg/content/dam/kpmg/ie/pdf/2020/05/6232_COVID19_Return_to_Work_PDF_May_2020.pdf" target="_blank">
                    <a-space direction="vertical" align="center" @click="onClickPdf" >
                        <img src="../../assets/images/office-guidelines/pdf.png" alt="">
                        <span style="margin-top: 10px" class="b6 gray-8">
                            Tap to open PDF
                        </span>
                    </a-space>
                </a>
            </a-flex>
        </a-flex>

        <!-- Footer -->
        <AppFooter :nextName="'office-guidelines'" :backName="'intro'"  :canNext="canNext"/> 
    </a-flex>

</template>

<style lang="scss" scoped>
.progress {
    padding: 0 16px;
}
</style>