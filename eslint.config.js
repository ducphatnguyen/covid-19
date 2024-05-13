import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
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
      "vue/component-name-in-template-casing": ["error", "kebab-case"],
      "vue/custom-event-name-casing": ["error", "kebab-case"],
      "vue/html-self-closing": "off",

      "vue/multiline-html-element-content-newline": "off",
      "vue/order-in-components": [
        "error",
        {
          order: [
            "name",
            "inheritAttrs",
            "extends",
            "directives",
            "mixins",
            "components",
            "emits",
            "inject",
            "ROUTER_GUARDS",
            "props",
            "provide",
            "data",
            "computed",
            "watch",
            "LIFE_CYCLE_HOOKS",
            "methods",
            ["template", "render"],
            "renderError",
          ],
        },
      ],
      "vue/padding-line-between-blocks": "error",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
];
