import { defineStore } from "pinia";

import type { DarkMode } from "@/types";

export const useDarkMode = defineStore("dark-mode", {
  state: (): DarkMode => ({
    isDarkMode: false,
  }),
  actions: {
    handleChange(isDarkMode: DarkMode) {
      this.$patch(isDarkMode);
    },
  },
  persist: [
    {
      key: (id) => `persisted-${id}`,
      paths: ["isDarkMode"],
      storage: localStorage,
    },
  ],
});
