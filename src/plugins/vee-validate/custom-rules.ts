import * as AllRules from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import { defineRule, configure } from "vee-validate";

import { LOCALES } from "@/constants";
import { usePayload } from "@/stores";
import { validatePhoneNumber } from "@/utils";

const rules = AllRules as Record<string, any>;
Object.entries(rules).forEach(([name, rule]) => {
  defineRule(name, rule);
  console.log(name, rule);
});

(async () => {
  const dictionary: Record<string, any> = {};
  for (const locale of LOCALES) {
    dictionary[locale] = await import(
      `../../../node_modules/@vee-validate/i18n/dist/locale/${locale}.json`
    );
  }

  dictionary.vi.default.messages = {
    ...dictionary.vi.default.messages,
    noSpecialCharacters: "{field} không được chứa ký tự đặc biệt.",
  };

  console.log(dictionary.vi.default.messages);
  configure({
    generateMessage: localize(dictionary),
  });
  console.log(dictionary.vi.default.messages);
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
