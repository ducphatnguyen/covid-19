import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module",
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",

      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          htmlWhitespaceSensitivity: "ignore",
        },
      ],
      "vue/block-lang": [
        "error",
        {
          script: {
            lang: "ts",
          },
        },
      ],
      "vue/multi-word-component-names": "off",

      "no-unused-expressions": "error",
    },
  },
];
