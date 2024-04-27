import { defineStore } from 'pinia';
import axios from 'axios';

import { type Country, type Question } from "@/types";
import { API_URLs } from '@/constants';
import { usePayload } from '@/stores';

const STATUS = [
    { code: "visitor", label: "Visitor" },
    { code: "employee", label: "Employee" },
];

export const useCountryStore = defineStore({
    id: 'countries',
    state: () => ({
        countries: [] as Country[],
        dialingCodes: [
            { countryCode: "IND", dialingCode: "+91" },
            { countryCode: "AUS", dialingCode: "+61" },
            { countryCode: "VNM", dialingCode: "+84" }
        ]
    }),
    actions: {
        async getCountries() {
            const payloadStore = usePayload();

            try {
                this.countries = (await axios.get<Country[]>(API_URLs.countries)).data;
                console.log(this.countries);

                // Map dialing codes into countries
                this.countries = this.countries.map(country => {
                    const dialingCode = this.dialingCodes.find(dc => dc.countryCode === country.code);
                    return dialingCode ? { ...country, ...dialingCode } : country
                });

                console.log(this.countries);
                
                // Initiate for the first country
                payloadStore.onChange('countryCode', this.countries?.[0]?.code);
                payloadStore.onChange('facilityId', this.countries[0]?.facilityList?.[0]?.id);
                payloadStore.onChange('statusCode', STATUS?.[0]?.code);

                this.countries?.[0].questionList?.forEach((question: Question) => {
                    payloadStore.onChange("checklistAnswers", { ...payloadStore.$state.checklistAnswers, [question.code]: null });
                });
            } catch (error) {
                console.error('Error when getting location:', error);
            }
        },
    },
});
