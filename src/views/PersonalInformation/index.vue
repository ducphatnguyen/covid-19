<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Form as VForm, Field as VField, useForm } from "vee-validate";

import { AppFooter, ProgressStepper } from "@/components";
import { usePayload, useCountryStore } from "@/stores";
import { getCountryFlagUrl } from "@/utils";

const contactFormSchema = {
  firstName: "required|noSpecialCharacters|min:2|max:20",
  lastName: "required|noSpecialCharacters|min:2|max:20",
  dialingCode: "required",
  contactNumber: "required|contactNumber",
};

// Data
const { validate } = useForm();
const router = useRouter();

const countryStore = useCountryStore();
const payloadStore = usePayload();

// Computed
const countries = computed(() => countryStore.$state.countries);

const canSubmit = computed(() => {
  const { firstName, lastName, dialingCode, contactNumber, isInfoConfirmed } =
    payloadStore.$state;
  return (
    !!firstName &&
    !!lastName &&
    !!dialingCode &&
    !!contactNumber &&
    !!isInfoConfirmed
  );
});

const showFooter = computed(() => {
  return !payloadStore.$state.isReviewed;
});

// Lifecycle
onMounted(() => {
  payloadStore.handleChange("isReviewed", false);
});

// Methods
const onChangeFirstName = (event: Event) => {
  const newFirstName = (event.target as HTMLInputElement).value;
  payloadStore.handleChange("firstName", newFirstName);
};

const onChangeLastName = (event: Event) => {
  const newLastName = (event.target as HTMLInputElement).value;
  payloadStore.handleChange("lastName", newLastName);
};

const onChangeContactNumber = (event: Event) => {
  const newContactNumber = (event.target as HTMLInputElement).value;
  payloadStore.handleChange("contactNumber", newContactNumber);
};

const onChangeDialingCode = (dialingCode: string) => {
  payloadStore.handleChange("dialingCode", dialingCode);
};

const onChangeIsInfoConfirmed = (isInfoConfirmed: boolean) => {
  payloadStore.handleChange("isInfoConfirmed", isInfoConfirmed);
};

const onSubmit = async () => {
  try {
    const { valid } = await validate();
    if (valid) {
      router.push({ name: "successfully" });
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <a-flex
    class="office-guidelines"
    vertical
  >
    <progress-stepper
      :title="'3. Contact Information'"
      :description="'Final Step'"
      :current-step="3"
      :total-steps="3"
    />

    <v-form
      v-slot="{ errors, handleSubmit }"
      :validation-schema="contactFormSchema"
    >
      <a-form @submit="handleSubmit(onSubmit)">
        <a-flex
          class="px-4 py-6"
          gap="middle"
          vertical
        >
          <a-flex class="b6 gray-9">
            <span>Please fill in your contact details:</span>
          </a-flex>

          <a-form
            style="background: #f6f6fa"
            class="p-4"
            :label-col="{ span: 24 }"
          >
            <!-- General Information -->
            <a-flex
              gap="middle"
              vertical
            >
              <template v-if="!payloadStore.$state.isReviewed">
                <v-field
                  id="firstName"
                  v-slot="{ field, value }"
                  v-model="payloadStore.$state.firstName"
                  label="First Name"
                  name="firstName"
                  @change="onChangeFirstName"
                >
                  <a-form-item
                    class="mb-0"
                    has-feedback
                    :validate-status="
                      errors.firstName ? 'error' : value ? 'success' : ''
                    "
                    :help="errors.firstName"
                  >
                    <template #label>
                      <span class="b7 gray-9">First Name</span>
                    </template>
                    <a-input
                      v-bind="field"
                      placeholder="First Name"
                      autocomplete="off"
                    />
                  </a-form-item>
                </v-field>
              </template>
              <template v-else>
                <v-field
                  id="firstName"
                  v-slot="{ field }"
                  v-model="payloadStore.$state.firstName"
                  label="First Name"
                  name="firstName"
                >
                  <a-form-item class="mb-0">
                    <template #label>
                      <span class="b7 gray-9">First Name</span>
                    </template>
                    <a-input
                      v-bind="field"
                      placeholder="First Name"
                      autocomplete="off"
                      disabled
                    />
                  </a-form-item>
                </v-field>
              </template>

              <template v-if="!payloadStore.$state.isReviewed">
                <v-field
                  id="lastName"
                  v-slot="{ field, value }"
                  v-model="payloadStore.$state.lastName"
                  label="Last Name"
                  name="lastName"
                  @change="onChangeLastName"
                >
                  <a-form-item
                    class="mb-0"
                    has-feedback
                    :validate-status="
                      errors.lastName ? 'error' : value ? 'success' : ''
                    "
                    :help="errors.lastName"
                  >
                    <template #label>
                      <span class="b7 gray-9 p-0">Last Name</span>
                    </template>
                    <a-input
                      v-bind="field"
                      placeholder="Last Name"
                    />
                  </a-form-item>
                </v-field>
              </template>
              <template v-else>
                <v-field
                  id="lastName"
                  v-slot="{ field }"
                  v-model="payloadStore.$state.lastName"
                  label="Last Name"
                  name="lastName"
                >
                  <a-form-item class="mb-0">
                    <template #label>
                      <span class="b7 gray-9 p-0">Last Name</span>
                    </template>
                    <a-input
                      v-bind="field"
                      placeholder="Last Name"
                      disabled
                    />
                  </a-form-item>
                </v-field>
              </template>

              <a-form-item class="mb-0">
                <template #label>
                  <span class="b7 gray-9 p-0">Contact Number</span>
                </template>

                <a-row :gutter="[6, 4]">
                  <a-col>
                    <template v-if="!payloadStore.$state.isReviewed">
                      <v-field
                        id="dialingCode"
                        v-slot="{ field, value }"
                        v-model="payloadStore.$state.dialingCode"
                        label="Dialing Code"
                        name="dialingCode"
                        @change="
                          onChangeDialingCode(payloadStore.$state.dialingCode!)
                        "
                      >
                        <a-select
                          v-bind="field"
                          :dropdown-match-select-width="false"
                          :option-label-prop="'label'"
                          has-feedback
                          :validate-status="
                            errors.dialingCode
                              ? 'error'
                              : value
                                ? 'success'
                                : ''
                          "
                          :help="errors.dialingCode"
                        >
                          <a-select-option
                            v-for="country in countries"
                            :key="country.dialingCode"
                            :value="country.dialingCode"
                            :label="country.dialingCode"
                          >
                            <a-flex
                              class="py-4"
                              align="center"
                            >
                              <span>({{ country.dialingCode }})</span>
                              <img
                                style="
                                  width: 38px;
                                  height: 24px;
                                  object-fit: cover;
                                "
                                class="mx-2"
                                :src="getCountryFlagUrl(country.code)"
                                alt="Country Flag"
                              />
                              <span>{{ country.name }}</span>
                            </a-flex>
                          </a-select-option>
                        </a-select>
                      </v-field>
                    </template>
                    <template v-else>
                      <v-field
                        id="dialingCode"
                        v-slot="{ field }"
                        v-model="payloadStore.$state.dialingCode"
                        label="Dialing Code"
                        name="dialingCode"
                      >
                        <a-select
                          v-bind="field"
                          :dropdown-match-select-width="false"
                          :option-label-prop="'label'"
                          disabled
                        >
                          <a-select-option
                            v-for="country in countries"
                            :key="country.dialingCode"
                            :value="country.dialingCode"
                            :label="country.dialingCode"
                          >
                            <a-flex
                              class="py-4"
                              align="center"
                            >
                              <span>({{ country.dialingCode }})</span>
                              <img
                                style="
                                  width: 38px;
                                  height: 24px;
                                  object-fit: cover;
                                "
                                class="mx-2"
                                :src="getCountryFlagUrl(country.code)"
                                alt="Country Flag"
                              />
                              <span>{{ country.name }}</span>
                            </a-flex>
                          </a-select-option>
                        </a-select>
                      </v-field>
                    </template>
                  </a-col>

                  <a-col flex="1 1 150px">
                    <template v-if="!payloadStore.$state.isReviewed">
                      <v-field
                        id="contactNumber"
                        v-slot="{ field, value }"
                        v-model="payloadStore.$state.contactNumber"
                        label="Contact Number"
                        name="contactNumber"
                        @change="onChangeContactNumber"
                      >
                        <a-form-item
                          class="mb-0"
                          has-feedback
                          :validate-status="
                            errors.contactNumber
                              ? 'error'
                              : value
                                ? 'success'
                                : ''
                          "
                          :help="errors.contactNumber"
                        >
                          <a-input
                            v-bind="field"
                            placeholder="Contact Number"
                          />
                        </a-form-item>
                      </v-field>
                    </template>
                    <template v-else>
                      <v-field
                        id="contactNumber"
                        v-slot="{ field }"
                        v-model="payloadStore.$state.contactNumber"
                        label="Contact Number"
                        name="contactNumber"
                      >
                        <a-form-item class="mb-0">
                          <a-input
                            v-bind="field"
                            placeholder="Contact Number"
                            disabled
                          />
                        </a-form-item>
                      </v-field>
                    </template>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-flex>

            <!-- Regulations -->
            <a-flex vertical>
              <template v-if="!payloadStore.$state.isReviewed">
                <v-field
                  id="isInfoConfirmed"
                  v-slot="{ field }"
                  label="Info Confirmation"
                  name="isInfoConfirmed"
                  @change="
                    onChangeIsInfoConfirmed(
                      payloadStore.$state.isInfoConfirmed!,
                    )
                  "
                >
                  <a-form-item
                    class="pt-6 mb-0"
                    name="remember"
                  >
                    <a-flex>
                      <a-checkbox
                        v-bind="field"
                        v-model:checked="payloadStore.$state.isInfoConfirmed"
                        :size="[24, 24]"
                      >
                        <span class="b7 gray-8">
                          I confirm that the above information is accurate and I
                          have read and understood the requirements and
                          expectations of entering the Silicon Stack premises.
                        </span>
                      </a-checkbox>
                    </a-flex>
                  </a-form-item>
                </v-field>
              </template>
              <template v-else>
                <v-field
                  id="isInfoConfirmed"
                  v-slot="{ field }"
                  label="Info Confirmation"
                  name="isInfoConfirmed"
                >
                  <a-form-item
                    class="pt-6 mb-0"
                    name="remember"
                  >
                    <a-flex>
                      <a-checkbox
                        v-bind="field"
                        v-model:checked="payloadStore.$state.isInfoConfirmed"
                        :size="[24, 24]"
                        disabled
                      >
                        <span class="b7 gray-8">
                          I confirm that the above information is accurate and I
                          have read and understood the requirements and
                          expectations of entering the Silicon Stack premises.
                        </span>
                      </a-checkbox>
                    </a-flex>
                  </a-form-item>
                </v-field>
              </template>
            </a-flex>
          </a-form>
        </a-flex>

        <app-footer
          v-if="showFooter"
          :back-route-name="'health-checklist'"
          :type="'submit'"
          :can-submit="canSubmit && !Object.keys(errors).length"
        />
      </a-form>
    </v-form>
  </a-flex>
</template>

<style lang="scss"></style>
