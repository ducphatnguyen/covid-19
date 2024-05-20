import axios from "axios";
import { defineStore } from "pinia";

import { API_URLS, STATUS } from "@/constants";
import { usePayload } from "@/stores";
import type { Country, Payload } from "@/types";

export const useCountryStore = defineStore("countries", {
  state: () => ({
    countries: [] as Country[],
    dialingCodes: [
      { countryCode: "IND", dialingCode: "+91" },
      { countryCode: "AUS", dialingCode: "+61" },
      { countryCode: "VNM", dialingCode: "+84" },
    ],
    loading: true,
  }),
  actions: {
    async getCountries() {
      this.loading = true;
      try {
        const response = await axios.get<Country[]>(API_URLS.countries);
        this.countries = response.data.map((country) => ({
          ...country,
          ...this.dialingCodes.find((dc) => dc.countryCode === country.code),
        }));
        this.handlePayload(this.countries);
      } catch (error) {
        console.error("Error when getting location:", error);
      } finally {
        this.loading = false;
      }
    },

    handlePayload(countries: Country[]) {
      const payloadStore = usePayload();
      const payloadItem = localStorage.getItem("payload");
      const payload = JSON.parse(payloadItem || "{}");

      if (payload?.isStep2Navigated) {
        payloadStore.$patch(payload);
      } else {
        const { checklistAnswers } = payloadStore.$state;
        const {
          code: countryCode,
          facilityList,
          questionList,
          dialingCode,
        } = countries?.[0] || {};

        payloadStore.handleChange("countryCode", countryCode);
        payloadStore.handleChange("facilityId", facilityList?.[0]?.id);
        payloadStore.handleChange("statusCode", STATUS?.[0]?.code);

        questionList?.forEach(({ code }) => {
          payloadStore.handleChange("checklistAnswers", {
            ...checklistAnswers,
            [code]: null,
          });
        });

        const resetFields = {
          isPdfOpened: false,
          isStep2Navigated: false,
          isReviewed: false,
          dialingCode,
          firstName: "",
          lastName: "",
          contactNumber: "",
          isInfoConfirmed: false,
        };

        Object.entries(resetFields).forEach(([field, value]) => {
          payloadStore.handleChange(field as keyof Payload, value);
        });
      }
    },
  },
});
