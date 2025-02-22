import globals from "globals";
import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import prettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  {
    plugins: {
      vue,
      prettier
    },
    rules: {
      "vue/no-unused-vars": "warn", // 启用 Vue 的未使用变量警告
      "vue/valid-v-slot": ["error", { allowModifiers: true }], // 启用 v-slot 的合法性检查
      "vue/multi-word-component-names": "off", // 禁用多单词组件名称的规则
      "vue/max-attributes-per-line": "off", // 禁用 属性新起一行
      "vue/singleline-html-element-content-newline": "off",
      "no-console": "off", // 警告 console.log
      "no-debugger": "warn", // 警告 debugger
      "prettier/prettier": "error" // 强制使用 Prettier 的代码格式化
    }
  }
];
