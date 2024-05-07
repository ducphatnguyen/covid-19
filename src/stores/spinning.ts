import { defineStore } from "pinia";

import type { Spinning } from "@/types";

export const useSpinning = defineStore("spinning", {
  state: (): Spinning => ({
    isSpinning: false,
  }),
  actions: {
    handleChange(key: keyof Spinning, value: boolean) {
      this.$patch({ [key]: value });
    },
  },
});
