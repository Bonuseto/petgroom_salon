import { defineConfig, globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import css from "eslint-plugin-css";
import json from "eslint-plugin-json";
import cssModules from "eslint-plugin-css-modules";
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import reactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    globalIgnores(["build/**/*", "dist/**/*", "node_modules/**/*"]),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...compat.extends(
        "plugin:react/recommended",
        "plugin:css/recommended",
        "plugin:css-modules/recommended",
    ),
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            react,
            css,
            json,
            "css-modules": cssModules,
            "react-you-might-not-need-an-effect": reactYouMightNotNeedAnEffect,
            "react-hooks": fixupPluginRules(reactHooks),
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                project: ["../tsconfig.json"],
                extraFileExtensions: [".module.css"],
            },
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            semi: ["error", "always"],
            "@typescript-eslint/semi": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-you-might-not-need-an-effect/you-might-not-need-an-effect": "warn",
        },
    }
]);
