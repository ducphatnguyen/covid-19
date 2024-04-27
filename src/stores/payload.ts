import { defineStore } from "pinia";

import { type Payload } from "@/types";


export const usePayload = defineStore({
    id: "payload",

    state: (): Payload => ({
        isPdfOpened: false,
        isStep2Navigated: false,
    }),

    actions: {
        onChange(
            key: string,
            value: string | number | boolean | Record<string, boolean | null>
        ) {
            this.$state = {... this.$state, [key]: value};
            // localStorage.setItem(key, value.toString())
        }
    },
});

