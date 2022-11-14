module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: ["off", 4, { SwitchCase: 1 }],
        // indent: ["SwitchCase", 4],
        // Отступ количество пробелов
        "multiline-ternary": ["off", "always-multiline"],
        semi: [2, "always"], // Точка с запятой в конце строки
        "no-unused-vars": [2, { vars: "local", args: "none" }],
        // Ошибка при наличии пробела при обозночении функции, уберём её
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        "comma-dangle": "off",
        // Использование двойных кавычек
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "object-shorthand": ["off", "always"]
    }
};
