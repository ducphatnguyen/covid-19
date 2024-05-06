import { defineStore } from "pinia";

import { type Spinning } from "@/types";

export const useSpinning = defineStore({
  id: "spinning",
  state: (): Spinning => ({
    isSpinning: false,
  }),
  actions: {
    handleChange(key: string, value: boolean) {
      this.$patch({ [key]: value });
    },
  },
});
