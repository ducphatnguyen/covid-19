import { defineStore } from "pinia";

import type { Languages } from "@/types";

export const useLanguageMode = defineStore("language-mode", {
  state: (): Languages => ({}),
  actions: {
    handleChange(languages: Languages) {
      this.$patch(languages);
    },
  },
  persist: [
    {
      key: (id) => `persisted-${id}`,
      // paths: ["countryCode", "countryName"],
      storage: localStorage,
    },
  ],
});
