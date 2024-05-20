import * as AllRules from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import { defineRule, configure } from "vee-validate";

import { usePayload } from "@/stores";
import { validatePhoneNumber } from "@/utils";
import { LANGUAGES } from "@/constants";

const rules = AllRules as Record<string, any>;
Object.entries(rules).forEach(([name, rule]) => {
  defineRule(name, rule);
});

(async () => {
  const dictionary: Record<string, any> = {};

  for (const { code: localeCode } of LANGUAGES) {
    try {
      const locale = await import(
        `../../../node_modules/@vee-validate/i18n/dist/locale/${localeCode}.json`
      );
      dictionary[localeCode] = locale.messages;
    } catch (error) {
      console.error(`Error loading locale ${localeCode}:`, error);
      dictionary[localeCode] = {};
    }
  }

  // Configure messages with i18n

  dictionary.vi.contactNumber = "{field} không hợp lệ";
  dictionary.id.contactNumber = "{field} tidak valid";
  dictionary.en.contactNumber = "Invalid {field}";

  dictionary.vi.noSpecialCharacters = "{field} không được chứa ký tự đặc biệt.";
  dictionary.id.noSpecialCharacters =
    "{field} tidak boleh mengandung karakter khusus.";
  dictionary.en.noSpecialCharacters =
    "{field} must not contain special characters.";

  configure({
    generateMessage: localize({
      en: { messages: dictionary.en },
      id: { messages: dictionary.id },
      vi: { messages: dictionary.vi },
    }),
  });
})();

defineRule("contactNumber", (value: string) => {
  const payloadStore = usePayload();
  const { dialingCode } = payloadStore.$state;
  return validatePhoneNumber(value, dialingCode) ?? true;
});

defineRule("noSpecialCharacters", (value: string) => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  return !regex.test(value);
});
