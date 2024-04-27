<script setup lang="ts">
import { computed } from 'vue';

import { AppFooter, Progress } from "@/components";
import { usePayload, useCountryStore } from "@/stores";
import { type Country } from "@/types";

// Data
const ANSWER = [
    { code: true, label: "YES" },
    { code: false, label: "NO" },
];

const payloadStore = usePayload();
const countryStore = useCountryStore();

console.log(payloadStore.$state);

const { countryCode, checklistAnswers } = payloadStore.$state;

const progressProps = {
    title: "2. Health Checklist",
    description: "Next: Personal Information",
    currentStep: 2,
    totalSteps: 3
};

const footerRouteProps = {
    backRouteName: "office-guidelines",
    nextRouteName: "personal-information",
};

// Computed
const countries = computed(() => countryStore.$state.countries);

const questionsByCountry = computed(() => {
    return countries.value.find((country: Country) => country.code === countryCode)?.questionList;
});

const canNext = computed(() => {
    if (!checklistAnswers) return false;
    return Object.values(checklistAnswers).every(answer => answer !== null);
});
</script>

<template>
    <a-flex class="office-guidelines" vertical>
        <Progress :="progressProps" />
        <a-flex class="px-4 py-6" gap="middle" vertical>
            <a-flex class="b6 gray-9">
                <span>Select your current health information:</span>
            </a-flex>

            <a-flex style="background: #f6f6fa;" class="p-4" gap="middle" vertical
                v-for="(question, index) in questionsByCountry" :key="question.code">
                <span class="h6 gray-10">
                    {{ index + 1 }}. {{ question.desc }}
                </span>
                <a-radio-group v-model:value="checklistAnswers![question.code]">
                    <a-flex gap="middle" vertical>
                        <a-radio v-for="ans in ANSWER" :value="ans.code" :key="ans.code" >
                            <span class="b6 gray-10 ps-2">{{ ans.label }}</span>
                        </a-radio>
                    </a-flex>
                </a-radio-group>
            </a-flex>
        </a-flex>
        <AppFooter :="footerRouteProps" :canNext="canNext" />
    </a-flex>
</template>

<style lang="scss"></style>
