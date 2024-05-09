/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as AllRules from "@vee-validate/rules";
import { defineRule, configure } from "vee-validate";

import { usePayload } from "@/stores";
import { validatePhoneNumber } from "@/utils";

const rules = AllRules as Record<string, any>;
Object.entries(rules).forEach(([key, value]) => {
  defineRule(key, value);
});

configure({
  validateOnInput: true,
  generateMessage: (context) => {
    const messages: Record<string, string> = {
      min: `${context.field} must be at least ${context.rule?.params} characters.`,
      max: `${context.field} must be at most ${context.rule?.params} characters.`,
      required: `${context.field} is required.`,
    };
    const message =
      messages[context.rule!.name] || `${context.field} is not valid.`;
    return message;
  },
});

defineRule("contactNumber", (value: string) => {
  const payloadStore = usePayload();
  const dialingCode = payloadStore.$state.dialingCode;
  return validatePhoneNumber(value, dialingCode) ?? true;
});

defineRule("noSpecialCharacters", (value: string) => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  if (regex.test(value)) {
    return "This field cannot contain special characters.";
  }
  return true;
});
