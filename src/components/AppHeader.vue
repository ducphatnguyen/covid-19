<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";

import { LANGUAGES } from "@/constants";
import {
  useCountryStore,
  useDarkMode,
  usePayload,
  useLanguageMode,
} from "@/stores";
import { convertDateTime } from "@/utils";

// Data
const countryStore = useCountryStore();
const darkModeStore = useDarkMode();
const payloadStore = usePayload();
const languageModeStore = useLanguageMode();

const currentDateTime = ref<string>("");
const intervalId = ref<number>(0);
const visible = ref<boolean>(false);

// Computed
const countries = computed(() => countryStore.$state.countries);

// Lifecycle
onMounted(() => {
  getConvertDateTime();
  intervalId.value = setInterval(getConvertDateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});

// Methods
const getConvertDateTime = () => {
  currentDateTime.value = convertDateTime(new Date());
};

const getFacilityName = (countryCode: string, facilityId: number) => {
  const country = countries.value.find(
    (country) => country.code === countryCode,
  );
  const facility = country?.facilityList.find((f) => f.id === facilityId);
  return facility?.name || "";
};

const handleMenuClick: MenuProps["onClick"] = (e) => {
  if (e.key === "close") {
    visible.value = false;
  }
};
</script>

<template>
  <a-flex
    class="bg-gray-2 border-bottom p-4"
    justify="space-between"
    align="center"
    gap="small"
  >
    <img
      class="logo"
      src="/src/assets/logo.svg"
      alt="Logo"
    />
    <a-flex
      class="text-right"
      justify="center"
      vertical
    >
      <a-flex gap="small">
        <a-flex vertical>
          <span class="b8 gray-8">
            {{ payloadStore.$state.countryCode }} -
            {{
              getFacilityName(
                payloadStore.$state.countryCode!,
                payloadStore.$state.facilityId!,
              )
            }}
          </span>
          <span class="b8 gray-8">{{ currentDateTime }}</span>
        </a-flex>
        <a-flex
          vertical
          justify="center"
          align="center"
        >
          <a-tooltip placement="right">
            <template #title>
              <span>Settings</span>
            </template>
            <a-dropdown
              v-model:open="visible"
              :arrow="{ pointAtCenter: true }"
              :placement="'bottomRight'"
              :trigger="['click']"
            >
              <setting-outlined class="b4 gray-10" />
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item>
                    <a-switch v-model:checked="darkModeStore.$state.isDarkMode">
                      <template #checkedChildren>
                        <img
                          class="moon-sun-icon icon-effect"
                          src="/src/assets/icons/moon-outline.svg"
                          alt="Moon"
                        />
                      </template>
                      <template #unCheckedChildren>
                        <img
                          class="moon-sun-icon icon-effect"
                          src="/src/assets/icons/sunny-outline.svg"
                          alt="Sunny"
                        />
                      </template>
                    </a-switch>
                  </a-menu-item>

                  <a-sub-menu
                    key="sub1"
                    title="Languages"
                  >
                    <a-menu-item
                      v-for="language in LANGUAGES"
                      :key="language.code"
                      :value="language.code"
                      @click="
                        languageModeStore.handleChange({
                          languageCode: language.code,
                          languageName: language.label,
                        })
                      "
                    >
                      {{ language.label }}
                    </a-menu-item>
                  </a-sub-menu>
                </a-menu>
              </template>
            </a-dropdown>
          </a-tooltip>
        </a-flex>
      </a-flex>
    </a-flex>
  </a-flex>
</template>

<style lang="scss">
.logo {
  width: 100px;
}
.moon-sun-icon {
  cursor: pointer;
}
.icon-effect {
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
