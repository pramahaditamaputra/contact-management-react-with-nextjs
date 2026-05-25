import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "coverage/**",
    "lcov-report/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

// Add test-specific overrides to relax rules that are noisy in test files
const testOverrides = {
  overrides: [
    {
      files: ["**/__test__/**", "**/*.test.*", "**/*.spec.*"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@next/next/no-img-element": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { argsIgnorePattern: "^_" },
        ],
      },
    },
  ],
};

if (!eslintConfig.overrides) eslintConfig.overrides = [];
eslintConfig.overrides.push(...testOverrides.overrides);

// Also relax some rules globally to reduce noise for this workspace tests
eslintConfig.rules = {
  ...(eslintConfig.rules || {}),
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-require-imports": "off",
  "@next/next/no-img-element": "off",
};

export default eslintConfig;
