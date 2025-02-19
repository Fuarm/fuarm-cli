module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended' // 如果你使用 Prettier
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
    },
    plugins: [
        'vue',
        'prettier' // 如果你使用 Prettier
    ],
    rules: {
        'vue/no-unused-vars': 'warn', // 启用 Vue 的未使用变量警告
        'vue/valid-v-slot': ['error', { allowModifiers: true }], // 启用 v-slot 的合法性检查
        'no-console': 'warn', // 警告 console.log
        'no-debugger': 'warn', // 警告 debugger
        'prettier/prettier': 'error' // 强制使用 Prettier 的代码格式化
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                'vue/multi-word-component-names': 'off' // 禁用多单词组件名称的规则
            }
        }
    ]
};
