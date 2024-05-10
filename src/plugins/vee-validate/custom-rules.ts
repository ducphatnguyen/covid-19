import { ref } from "vue";
import * as AllRules from "@vee-validate/rules";
import { defineRule, configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";

import { LOCALES } from "@/constants";
import { usePayload } from "@/stores";
import { validatePhoneNumber } from "@/utils";

const rules = AllRules as Record<string, any>;
Object.entries(rules).forEach(([name, rule]) => {
  defineRule(name, rule);
});
const active_code = ref<string>("en");

(async () => {
  const dictionary: Record<string, any> = {};
  for (const code of LOCALES) {
    dictionary[code] = await import(
      `../../../node_modules/@vee-validate/i18n/dist/locale/${code}.json`
    );
  }
  configure({
    generateMessage: localize(dictionary),
  });
  setLocale(active_code.value);
})();

defineRule("contactNumber", (value: string) => {
  const payloadStore = usePayload();
  const dialingCode = payloadStore.$state.dialingCode;
  return validatePhoneNumber(value, dialingCode) ?? true;
});

defineRule("noSpecialCharacters", (value: string) => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  return regex.test(value)
    ? "This field cannot contain special characters."
    : true;
});
