import { defineStore } from "pinia";

import type { Payload } from "@/types";

export const usePayload = defineStore("payload", {
  state: (): Payload => ({}),
  actions: {
    handleChange(key: keyof Payload, value: string | number | boolean | Record<string, boolean | null>) {
      this.$patch({ [key]: value });
      localStorage.setItem("payload", JSON.stringify(this.$state));
    },
  },
});
