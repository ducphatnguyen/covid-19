<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { AppFooter, Progress } from "@/components";
import { usePayload, useCountryStore } from "@/stores";
import { getCountryFlagUrl, validatePhoneNumber } from '@/utils';

import { Form, Field, defineRule, useForm } from "vee-validate";

// Define rules
defineRule('required', (value: string) => {
    if (!value || !value.length) {
        return 'This field is required';
    }
    return true;
});

defineRule('minMaxLength', (value: string, [min, max]: [number, number]) => {
    if (value.length < min) {
        return `This field must be at least ${min} characters long`;
    }
    if (value.length > max) {
        return `This field must be at most ${max} characters long`;
    }
    return true;
});

defineRule('validName', (value: string) => {
    if (/\d/.test(value)) {
        return 'First name cannot contain numbers';
    }
    return true;
});

defineRule('contactNumber', (value: string) => {
    const dialingCode = payloadStore.$state.dialingCode;
    const validation = validatePhoneNumber(value, dialingCode);
    if (validation !== true) {
        return validation; 
    }
    return true;
});

// Data
const router = useRouter();

const payloadStore = usePayload();
const countryStore = useCountryStore();

// Computed
const countries = computed(() => countryStore.$state.countries);


const canSubmit = computed(() => {
    // Các Field không bị bắt lỗi bởi rules (defineRule)
    const { firstName, lastName, dialingCode, contactNumber, isInfoConfirmed } = payloadStore.$state;
    return !!firstName && !!lastName && !!dialingCode && !!contactNumber && !!isInfoConfirmed ;
});

// Method
const goToResultPage = () => {
    router.push({ name: 'successfully' });
};

const submitContact = async () => {
    goToResultPage();
};

const onChangeFirstName = (event: Event) => {
    const newFirstName = (event.target as HTMLInputElement).value;
    payloadStore.handleChange('firstName', newFirstName);
}

const onChangeLastName = (event: Event) => {
    const newLastName = (event.target as HTMLInputElement).value;
    payloadStore.handleChange('lastName', newLastName);
}

const onChangeContactNumber = (event: Event) => {
    const newContactNumber = (event.target as HTMLInputElement).value;
    payloadStore.handleChange('contactNumber', newContactNumber);
}

const onChangeDialingCode = (dialingCode: string) => {
    payloadStore.handleChange('dialingCode', dialingCode);
}

const onChangeIsInfoConfirmed = (isInfoConfirmed: boolean) => {
    payloadStore.handleChange('isInfoConfirmed', isInfoConfirmed);
}

</script>

<template>
    <a-flex class="office-guidelines" vertical>
        <Form @submit="submitContact">
            <Progress :title="'3. Contact Information'" :description="'Final Step'" :currentStep="3" :total-steps="3" />
            <a-flex class="px-4 py-6" gap="middle" vertical>

                <a-flex class="b6 gray-9">
                    <span>Please fill in your contact details:</span>
                </a-flex>

                <a-form style="background: #f6f6fa;" class="p-4" :label-col="{ span: 24 }">

                    <!-- General Information -->
                    <a-flex gap="middle" vertical>

                        <Field v-slot="{ field, errors, value }" name="firstName" id="firstName"
                            v-model="payloadStore.$state.firstName" @change="onChangeFirstName"
                            rules="required|validName|minMaxLength:2,50">
                            <a-form-item class="mb-0" has-feedback :validate-status="errors.length ? 'error' : value ? 'success' : '' " :help="errors[0]">
                                <template #label>
                                    <span class="b7 gray-9">
                                        First Name 
                                    </span>
                                </template>
                                <a-input :="field" placeholder="First Name" autocomplete="off"/>
                            </a-form-item>
                        </Field>

                        <Field v-slot="{ field, errors }" name="lastName" id="lastName" type="text"
                            v-model="payloadStore.$state.lastName" @change="onChangeLastName"
                            rules="required|validName|minMaxLength:2,50">
                            <a-form-item class="mb-0"  :validate-status="errors.length ? 'error' : 'success'" :help="errors[0]">
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

                            <a-row :gutter="6">
                                <a-col :span="6"><a-select v-model:value="payloadStore.$state.dialingCode"
                                        @change="onChangeDialingCode(payloadStore.$state.dialingCode!)"
                                        :dropdown-match-select-width="false" :option-label-prop="'label'">
                                        <a-select-option v-for="country in countries" :value="country.dialingCode"
                                            :label="country.dialingCode">
                                            <a-flex class="py-4" align="center">
                                                <span> ({{ country.dialingCode }})</span>
                                                <img style="width: 38px; height: 24px; object-fit: cover" class="mx-2"
                                                    :src="getCountryFlagUrl(country.code)" alt="Country Flag">
                                                <span>{{ country.name }}</span>
                                            </a-flex>
                                        </a-select-option>
                                    </a-select></a-col>
                                <a-col :span="18">
                                    <Field v-slot="{ field, errors }" name="contactNumber" id="contactNumber"
                                        v-model="payloadStore.$state.contactNumber" @change="onChangeContactNumber"
                                        rules="required|contactNumber"> 
                                        <a-form-item class="mb-0" :validateStatus="errors.length ? 'error' : ''"
                                            :help="errors[0]">
                                            <a-input :="field" placeholder="Contact Number" />
                                        </a-form-item>
                                    </Field>
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-flex>

                    <!-- Regulations -->
                    <a-flex vertical>
                        <a-form-item class="pt-6 mb-0">
                            <a-form-item name="remember" no-style>
                                <a-flex>
                                    <a-checkbox v-model:checked="payloadStore.$state.isInfoConfirmed" :size="[24, 24]"
                                        @change="onChangeIsInfoConfirmed(payloadStore.$state.isInfoConfirmed!)">
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
            <AppFooter :backRouteName="'health-checklist'" :type="'submit'" @submit:contact="submitContact"
                :canSubmit />
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
