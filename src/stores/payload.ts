import { defineStore } from "pinia";

import { type Payload } from "@/types";

export const usePayload = defineStore({
  id: "payload",

  state: (): Payload => ({
    // isPdfOpened: false,
    // isStep2Navigated: false,
  }),

  actions: {
    handleChange(
      key: string,
      value: string | number | boolean | Record<string, boolean | null>,
    ) {
      this.$patch({ [key]: value });
      localStorage.setItem("payload", JSON.stringify(this.$state));
    },
  },
});
