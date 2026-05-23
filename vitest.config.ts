import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__test__/vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/__tests__/*.{ts,tsx}",
        "src/**/?(*.){spec,test}.{ts,tsx}",
        "src/shared/components/**",
        "src/shared/hooks/**",
        "src/shared/utils/**",
        "src/features/contact/presentation/components/DataTable/**",
        "src/features/contact/domain/entities/**/*",
        "src/features/contact/domain/repositories/**/*",
        "src/features/contact/presentation/forms/contact-form.types.ts",
        "src/providers/I18nProvider.tsx",
        "src/providers/ThemeProvider.tsx",
      ],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});
