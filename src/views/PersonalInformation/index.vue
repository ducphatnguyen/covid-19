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

const contactFormSchema = {
    firstName: 'required|validName|minMaxLength:2,20',
    lastName: 'required|validName|minMaxLength:2,20',
    contactNumber: 'required|contactNumber',
}

// Data
const { validate } = useForm();
const router = useRouter();

const payloadStore = usePayload();
const countryStore = useCountryStore();

// Computed
const countries = computed(() => countryStore.$state.countries);

const canSubmit = computed(() => {
    const { firstName, lastName, dialingCode, contactNumber, isInfoConfirmed } = payloadStore.$state;
    return !!firstName && !!lastName && !!dialingCode && !!contactNumber && !!isInfoConfirmed;
});

// Method
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

const onSubmit = async (values: any) => {
    console.log(values);
    try {
        const { valid } = await validate();
        if (valid) {
            router.push({ name: "successfully" });
        }
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <a-flex class="office-guidelines" vertical>
        <Progress :title="'3. Contact Information'" :description="'Final Step'" :currentStep="3" :total-steps="3" />

        <Form :validation-schema="contactFormSchema" v-slot="{ errors, handleSubmit }">
            <a-form @submit="handleSubmit(onSubmit)">
                <a-flex class="px-4 py-6" gap="middle" vertical>

                    <a-flex class="b6 gray-9">
                        <span>Please fill in your contact details:</span>
                    </a-flex>

                    <a-form style="background: #f6f6fa;" class="p-4" :label-col="{ span: 24 }">

                        <!-- General Information -->
                        <a-flex gap="middle" vertical>

                            <Field v-slot="{ field, value }" name="firstName" id="firstName"
                                v-model="payloadStore.$state.firstName" @change="onChangeFirstName">
                                <a-form-item class="mb-0" has-feedback
                                    :validate-status="errors.firstName ? 'error' : value ? 'success' : ''"
                                    :help="errors.firstName">
                                    <template #label>
                                        <span class="b7 gray-9">
                                            First Name
                                        </span>
                                    </template>
                                    <a-input :="field" placeholder="First Name" autocomplete="off" />
                                </a-form-item>
                            </Field>

                            <Field v-slot="{ field, value }" name="lastName" id="lastName"
                                v-model="payloadStore.$state.lastName" @change="onChangeLastName">
                                <a-form-item class="mb-0" has-feedback
                                    :validate-status="errors.lastName ? 'error' : value ? 'success' : ''"
                                    :help="errors.lastName">
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
                                    <a-col :span="6">

                                        <Field v-slot="{ field }" name="dialingCode" id="dialingCode"
                                            v-model="payloadStore.$state.dialingCode"
                                            @change="onChangeDialingCode(payloadStore.$state.dialingCode!)">
                                            <a-select :="field" :dropdown-match-select-width="false"
                                                :option-label-prop="'label'">
                                                <a-select-option v-for="country in countries"
                                                    :value="country.dialingCode" :label="country.dialingCode">
                                                    <a-flex class="py-4" align="center">
                                                        <span> ({{ country.dialingCode }})</span>
                                                        <img style="width: 38px; height: 24px; object-fit: cover"
                                                            class="mx-2" :src="getCountryFlagUrl(country.code)"
                                                            alt="Country Flag">
                                                        <span>{{ country.name }}</span>
                                                    </a-flex>
                                                </a-select-option>
                                            </a-select>
                                        </Field>

                                    </a-col>
                                    <a-col :span="18">
                                        <Field v-slot="{ field, value }" name="contactNumber" id="contactNumber"
                                            v-model="payloadStore.$state.contactNumber" @change="onChangeContactNumber">
                                            <a-form-item class="mb-0" has-feedback
                                                :validate-status="errors.contactNumber ? 'error' : value ? 'success' : ''"
                                                :help="errors.contactNumber">
                                                <a-input :="field" placeholder="Contact Number" />
                                            </a-form-item>
                                        </Field>
                                    </a-col>
                                </a-row>
                            </a-form-item>
                        </a-flex>

                        <!-- Regulations -->
                        <a-flex vertical>

                            <Field v-slot="{ field }" name="isInfoConfirmed" id="isInfoConfirmed"
                                @change="onChangeIsInfoConfirmed(payloadStore.$state.isInfoConfirmed!)">
                                <a-form-item class="pt-6 mb-0">
                                    <a-form-item name="remember" no-style>
                                        <a-flex>
                                            <a-checkbox :="field" v-model:checked="payloadStore.$state.isInfoConfirmed"
                                                :size="[24, 24]">
                                                <span class="b7 gray-8">
                                                    I confirm that the above information is
                                                    accurate and I have
                                                    read and understood the requirements and expectations of entering
                                                    the
                                                    Silicon
                                                    Stack
                                                    premises. {{ Object.keys(errors).length }}
                                                </span>
                                            </a-checkbox>
                                        </a-flex>
                                    </a-form-item>
                                </a-form-item>
                            </Field>
                        </a-flex>
                    </a-form>
                </a-flex>

                <AppFooter :backRouteName="'health-checklist'" :type="'submit'"
                    :canSubmit="canSubmit && Object.keys(errors).length === 0" />

            </a-form>
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
