<script setup lang="ts">
import { ref } from "vue";
import type { MenuProps } from "ant-design-vue";
import { SettingOutlined } from "@ant-design/icons-vue";

import { LANGUAGES } from "@/constants";
import { useDarkMode, useLanguageMode } from "@/stores";

//Data
const darkModeStore = useDarkMode();
const languageModeStore = useLanguageMode();

const visible = ref<boolean>(false);

const handleMenuClick: MenuProps["onClick"] = (e) => {
  if (e.key === "close") {
    visible.value = false;
  }
};

const handleLanguageChange = (languageCode: string, languageName: string) => {
  languageModeStore.handleChange({
    languageCode,
    languageName,
  });
  window.location.reload();
};
</script>

<template>
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
              @click="handleLanguageChange(language.code, language.label)"
            >
              {{ language.label }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </template>
    </a-dropdown>
  </a-tooltip>
</template>

<style lang="scss" scoped>
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
