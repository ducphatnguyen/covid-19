import * as AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import { defineRule, configure } from "vee-validate";
import { ref } from "vue";

import { LOCALES } from "@/constants";
import { usePayload } from "@/stores";
import { validatePhoneNumber } from "@/utils";

const active_locale = ref<string>("en");
const rules = AllRules as Record<string, any>;
Object.entries(rules).forEach(([name, rule]) => {
  defineRule(name, rule);
});

(async () => {
  const dictionary: Record<string, any> = {};
  for (const locale of LOCALES) {
    dictionary[locale] = await import(
      `../../../node_modules/@vee-validate/i18n/dist/locale/${locale}.json`
    );
  }
  configure({
    generateMessage: localize(dictionary),
  });
  setLocale(active_locale.value);
})();

defineRule("contactNumber", (value: string) => {
  const payloadStore = usePayload();
  const { dialingCode } = payloadStore.$state;
  return validatePhoneNumber(value, dialingCode) ?? true;
});

defineRule("noSpecialCharacters", (value: string) => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  return regex.test(value)
    ? "This field cannot contain special characters."
    : true;
});
