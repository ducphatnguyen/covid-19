import { defineStore } from 'pinia';
import axios from 'axios';

import { type Country, type Question } from "@/types";
import { API_URLs } from '@/constants';
import { usePayload } from '@/stores';

const STATUS = [
    { code: "visitor", label: "Visitor" },
    { code: "employee", label: "Employee" },
];

// Hàm xử lý payload
const handlePayload = (payloadStore: any, countries: Country[]) => {
    const payloadItem = localStorage.getItem('payload');
    const payload = JSON.parse(payloadItem!);

    if (payload != null && payload.isStep2Navigated) {
        payloadStore.$patch(payload);
    }
    else {
        payloadStore.handleChange('countryCode', countries?.[0]?.code);
        payloadStore.handleChange('facilityId', countries[0]?.facilityList?.[0]?.id);
        payloadStore.handleChange('statusCode', STATUS?.[0]?.code);

        countries?.[0].questionList?.forEach((question: Question) => {
            payloadStore.handleChange("checklistAnswers", { ...payloadStore.$state.checklistAnswers, [question.code]: null });
        });

        payloadStore.handleChange('isPdfOpened', false);
        payloadStore.handleChange('isStep2Navigated', false);
        payloadStore.handleChange('dialingCode', countries?.[0]?.dialingCode!);

        payloadStore.handleChange('firstName', '');
        payloadStore.handleChange('lastName', '');
        payloadStore.handleChange('contactNumber', '');
        payloadStore.handleChange('isInfoConfirmed', false);
    }
}

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

                // Initiate and Save when reload
                handlePayload(payloadStore, this.countries);
                console.log(payloadStore.$state);
            } catch (error) {
                console.error('Error when getting location:', error);
            }
        },
    },
});