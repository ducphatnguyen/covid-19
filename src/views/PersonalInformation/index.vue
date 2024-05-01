<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { AppFooter, Progress } from "@/components";
import { usePayload, useCountryStore } from "@/stores";
import { getCountryFlagUrl } from '@/utils';

import { Form, Field, defineRule } from "vee-validate";


// Data
defineRule('required', (value: string) => {
    if (!value || !value.length) {
        return 'This field is required';
    }
    return true;
});
defineRule('minMax', (value: string, [min, max]: any) => {
    if (!value || !value.length) {
        return true;
    }
    const numericValue = Number(value);
    if (numericValue < min) {
        return `This field must be greater than ${min}`;
    }
    if (numericValue > max) {
        return `This field must be less than ${max}`;
    }
    return true;
});

const router = useRouter();

const payloadStore = usePayload();
const countryStore = useCountryStore();

const progressProps = {
    title: "3. Contact Information",
    description: "Final Step",
    currentStep: 3,
    totalSteps: 3
};

const footerRouteProps = {
    backRouteName: "health-checklist",
};
const type = "submit";

// Computed
const countries = computed(() => countryStore.$state.countries);
console.log(countries.value);

const canSubmit = computed(() => {
    const { firstName, lastName, dialingCode, contactNumber, isInfoConfirmed } = payloadStore.$state;
    console.log(payloadStore.$state)
    return !!firstName && !!lastName && !!dialingCode && !!contactNumber && !!isInfoConfirmed;
});

// Method
const handleChange = (value: string) => {
    console.log("dialingCode", value);
};

const goToResultPage = () => {
    router.push({ name: 'successfully' });
};

const submitContact = async () => {
    goToResultPage();
};

</script>

<template>
    <a-flex class="office-guidelines" vertical>
        <Form @submit="submitContact">
            <Progress :="progressProps" />
            <a-flex class="px-4 py-6" gap="middle" vertical>

                <a-flex class="b6 gray-9">
                    <span>Please fill in your contact details:</span>
                </a-flex>

                <a-form style="background: #f6f6fa;" class="p-4" :label-col="{ span: 24 }">

                    <!-- General Information -->
                    <a-flex gap="middle" vertical>

                        <Field v-slot="{ field }" name="firstName" id="firstName" type="text"
                            v-model="payloadStore.$state.firstName">
                            <a-form-item class="mb-0">
                                <template #label>
                                    <span class="b7 gray-9">
                                        First Name
                                    </span>
                                </template>
                                <a-input :="field" placeholder="First Name" />
                            </a-form-item>
                        </Field>

                        <Field v-slot="{ field }" name="lastName" id="lastName" type="text"
                            v-model="payloadStore.$state.lastName">
                            <a-form-item class="mb-0">
                                <template #label style="height: unset;">
                                    <span class="b7 gray-9 p-0">
                                        Last Name
                                    </span>
                                </template>
                                <a-input :="field" placeholder="Last Name" />
                            </a-form-item>
                        </Field>

                        <a-form-item class="mb-0">
                            <template #label>
                                <span class="b7 gray-9 p-0">
                                    Contact Number
                                </span>
                            </template>
                            <a-flex gap="small">
                                <!-- V-model? -->
                                <a-select v-model:value="payloadStore.$state.dialingCode" @change="handleChange"
                                    style="width: 120px" :dropdown-match-select-width="false"
                                    :option-label-prop="'label'">
                                    <a-select-option :value="country.dialingCode" :label="country.dialingCode"
                                        v-for="country in countries">
                                        <a-flex class="py-4" align="center">
                                            <span> ({{ country.dialingCode }})</span>
                                            <img style="width: 38px; height: 24px; object-fit: cover" class="mx-2"
                                                :src="getCountryFlagUrl(country.code)" alt="Country Flag">
                                            <span>{{ country.name }}</span>
                                        </a-flex>
                                    </a-select-option>
                                </a-select>
                                <Field v-slot="{ field }" name="contactNumber" id="contactNumber" type="text"
                                    v-model="payloadStore.$state.contactNumber">
                                    <a-form-item class="mb-0">
                                        <a-input :="field" placeholder="Contact Number" />
                                    </a-form-item>
                                </Field>
                            </a-flex>
                        </a-form-item>
                    </a-flex>

                    <!-- Regulations -->
                    <a-flex vertical>
                        <a-form-item class="pt-6 mb-0">
                            <a-form-item name="remember" no-style>
                                <a-flex>
                                    <a-checkbox v-model:checked="payloadStore.$state.isInfoConfirmed" :size="[24, 24]">
                                        <span class="b7 gray-8">
                                            I confirm that the above information is
                                            accurate and I have
                                            read and understood the requirements and expectations of entering the
                                            Silicon
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

            <AppFooter :="footerRouteProps" :type @submit:contact="submitContact" :canSubmit/>
        </Form>
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
