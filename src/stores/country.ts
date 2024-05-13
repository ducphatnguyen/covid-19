import axios from "axios";
import { defineStore } from "pinia";

import { API_URLS, STATUS } from "@/constants";
import { usePayload } from "@/stores";
import type { Country, Question } from "@/types";

export const useCountryStore = defineStore("countries", {
  state: () => ({
    countries: [] as Country[],
    dialingCodes: [
      { countryCode: "IND", dialingCode: "+91" },
      { countryCode: "AUS", dialingCode: "+61" },
      { countryCode: "VNM", dialingCode: "+84" },
    ],
    spinning: true,
  }),
  actions: {
    async getCountries() {
      try {
        this.$patch({ spinning: true });
        this.countries = (await axios.get<Country[]>(API_URLS.countries)).data;
        // Map dialing codes into countries
        this.countries = this.countries.map((country) => {
          const dialingCode = this.dialingCodes.find(
            (dc) => dc.countryCode === country.code,
          );
          return dialingCode ? { ...country, ...dialingCode } : country;
        });

        // Initiate and Save when reload
        this.handlePayload(this.countries);
      } catch (error) {
        console.error("Error when getting location:", error);
      } finally {
        this.$patch({ spinning: false });
      }
    },

    handlePayload(countries: Country[]) {
      const payloadStore = usePayload();
      const payloadItem = localStorage.getItem("payload");
      const payload = JSON.parse(payloadItem!);

      if (payload !== null && payload.isStep2Navigated) {
        payloadStore.$patch(payload);
      } else {
        const { checklistAnswers } = payloadStore.$state;
        payloadStore.handleChange("countryCode", countries?.[0]?.code);
        payloadStore.handleChange(
          "facilityId",
          countries?.[0]?.facilityList?.[0]?.id,
        );
        payloadStore.handleChange("statusCode", STATUS?.[0]?.code);

        countries?.[0]?.questionList?.forEach((question: Question) => {
          payloadStore.handleChange("checklistAnswers", {
            ...checklistAnswers,
            [question.code]: null,
          });
        });

        payloadStore.handleChange("isPdfOpened", false);
        payloadStore.handleChange("isStep2Navigated", false);
        payloadStore.handleChange("isReviewed", false);
        payloadStore.handleChange("dialingCode", countries?.[0]?.dialingCode);

        payloadStore.handleChange("firstName", "");
        payloadStore.handleChange("lastName", "");
        payloadStore.handleChange("contactNumber", "");
        payloadStore.handleChange("isInfoConfirmed", false);
      }
    },
  },
});
