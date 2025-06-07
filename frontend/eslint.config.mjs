// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import youMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import pluginTailwindcss from "eslint-plugin-tailwindcss";

export default defineConfig([
  // 1) Core JS/TSX rules
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      js,
      tailwindcss: pluginTailwindcss,
    },
    extends: [
      "js/recommended", // optional, pulls in all tailwindcss rules
    ],
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/no-arbitrary-value": "warn",
      "tailwindcss/no-custom-classname": "warn",
      "tailwindcss/no-contradicting-classname": "warn",
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
    },
  },

  // 2) Browser globals for JS/TS/JSX/TSX
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // 3) TypeScript‐ESLint recommended rules
  tseslint.configs.recommended,

  // 4) React (and React Hooks) “flat” recommended rules,
  //    with explicit React version detection (18.2.0).
  {
    // Start with everything that pluginReact.configs.flat.recommended gives you…
    ...pluginReact.configs.flat.recommended,

    // …then add a `settings` block so that eslint-plugin-react
    // knows you’re on React v18.2.0:
    settings: {
      react: {
        version: "18.2.0",
      },
    },
  },

  // 5) “You Might Not Need an Effect” plugin for .js/.jsx/.ts/.tsx files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-you-might-not-need-an-effect": youMightNotNeedAnEffect,
    },
    rules: {
      "react-you-might-not-need-an-effect/you-might-not-need-an-effect": "warn",
    },
  },

  // 6) JSON linting
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.json5"],
    plugins: { json },
    language: "json/json5",
    extends: ["json/recommended"],
  },

  // 7) CSS linting
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
]);
