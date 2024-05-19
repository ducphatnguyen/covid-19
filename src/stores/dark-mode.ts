import { defineStore } from "pinia";

import type { DarkMode } from "@/types";

export const useDarkMode = defineStore("dark-mode", {
  state: (): DarkMode => ({
    isDarkMode: false,
  }),
  actions: {
    handleChange(darkmode: DarkMode) {
      this.$patch(darkmode);
    },
  },
  persist: [
    {
      key: (id) => `persisted-${id}`,
      // paths: ["isDarkMode"],
      storage: localStorage,
    },
  ],
});
