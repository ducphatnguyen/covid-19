import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";
import id from "@/locales/id.json";

export const i18n = createI18n({
  useScope: "global",
  legacy: false,
  // locale: "vi", // Ngôn ngữ mặc định
  fallbackLocale: "en",
  messages: {
    en,
    vi,
    id,
  },
});
