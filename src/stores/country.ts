import { defineStore } from 'pinia';

import axios from 'axios';
import { type Country } from "@/types";
import { API_URLs } from '@/constants';

export const useCountryStore = defineStore({
    id: 'countries',
    state: () => ({
        countries: [] as Country[],
    }),
    actions: {
        async getCountries() {
            try {
                this.countries = (await axios.get<Country[]>(API_URLs.countries)).data;
                console.log(this.countries);
            } catch (error) {
                console.error('Error when getting location:', error);
            }
        },
    },
});

// // Fetch countries on store creation
await useCountryStore().getCountries();
