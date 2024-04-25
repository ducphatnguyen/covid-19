import { defineStore } from "pinia";
import { type Payload } from "@/types";

export const usePayload = defineStore({
    id: "payload",
    state: (): Payload => ({}),
    actions: {
        onChange(
            key: string,
            value: string | number | boolean | Record<number, boolean>
        ) {
            this.$state = {... this.$state, [key]: value};
        }
    }
});

