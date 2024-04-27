<script setup lang="ts">
import { ref, computed, reactive, type UnwrapRef } from 'vue';

import { AppFooter, Progress } from "@/components";
import { usePayload, useCountryStore } from "@/stores";
import { type Country } from "@/types";

import { UserOutlined, DownOutlined } from '@ant-design/icons-vue';
import type { SelectProps } from 'ant-design-vue';

interface FormState {
    name: string;
    delivery: boolean;
    type: string[];
    resource: string;
    desc: string;
    remember: true,
}
const formState: UnwrapRef<FormState> = reactive({
    name: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    remember: true,
});

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};


const value = ref(['lucy']);

// Data
const payloadStore = usePayload();
const { checklistAnswers } = payloadStore.$state;

const countryStore = useCountryStore();

const progressProps = {
    title: "3. Contact Information",
    description: "Final Step",
    currentStep: 3,
    totalSteps: 3
};

const footerRouteProps = {
    backRouteName: "health-checklist",
    nextRouteName: "personal-information",
};

// Computed
const countries = computed(() => countryStore.$state.countries);

const canNext = computed(() => {
    return !checklistAnswers ? false : Object.values(checklistAnswers).every(answer => answer !== null);
});

</script>

<template>
    <a-flex class="office-guidelines" vertical>
        <Progress :="progressProps" />
        <a-flex class="px-4 py-6" gap="middle" vertical>

            <a-flex class="b6 gray-9">
                <span>Please fill in your contact details:</span>
            </a-flex>

            <a-form style="background: #f6f6fa;" class="p-4" :model="formState" :label-col="{ span: 24 }">

                <!-- General information -->
                <a-flex gap="middle" vertical>
                    <a-form-item class="mb-0">

                        <template #label>
                            <span class="b7 gray-9">
                                First Name
                            </span>
                        </template>

                        <a-input v-model:value="formState.name" />
                    </a-form-item>

                    <a-form-item class="mb-0">
                        <template #label style="height: unset;">
                            <span class="b7 gray-9 p-0">
                                Last Name
                            </span>
                        </template>
                        <a-input v-model:value="formState.name" />
                    </a-form-item>

                    <a-form-item class="mb-0">
                        <template #label>
                            <span class="b7 gray-9 p-0">
                                Contact Number
                            </span>
                        </template>

                        <a-flex gap="small">

                            <a-select v-model:value="value" @change="handleChange" style="width: 120px"
                                :dropdown-match-select-width="false">

                                <a-select-opt-group>

                                    <template #label>
                                        <span class="h6 bg-black">
                                            Select Country
                                        </span>
                                    </template>

                                    <a-select-option value="jack">
                                        Hi
                                    </a-select-option>

                                    <a-select-option value="lucy">
                                        Lucy
                                    </a-select-option>

                                </a-select-opt-group>

                            </a-select>
                            <a-input v-model:value="formState.name" />
                        </a-flex>

                    </a-form-item>
                </a-flex>

                <!-- Regulations -->
                <a-flex vertical>
                    <a-form-item class="pt-6 mb-0">
                        <a-form-item name="remember" no-style>
                            <a-flex>
                                <a-checkbox v-model:checked="formState.remember" :size="[24,24]">
                                    <span class="b7 gray-8">
                                        I confirm that the above information is
                                        accurate and I have
                                        read and understood the requirements and expectations of entering the Silicon
                                        Stack
                                        premises.
                                    </span>
                                </a-checkbox>
                            </a-flex>
                        </a-form-item>
                    </a-form-item>
                </a-flex>
            </a-form>

        </a-flex>
        <AppFooter :="footerRouteProps" :canNext />
    </a-flex>
</template>

<style lang="scss">
.ant-col-24.ant-form-item-label {
    padding: 0;
}

.ant-form-item .ant-form-item-label>label {
    height: unset;
}

.ant-checkbox {
    align-self: start;
    &+span {
        padding-inline-start: 16px;
    }
}

.ant-checkbox .ant-checkbox-inner {
    width: 24px;
    height: 24px;
    &:after {
        inset-inline-start: 32.5%;
    }
} 

</style>
