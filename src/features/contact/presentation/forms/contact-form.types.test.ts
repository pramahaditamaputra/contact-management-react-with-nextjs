import { describe, expect, it } from "vitest";

describe("runtime modules used by contact forms", () => {
  it("loads type-only and placeholder modules without error", async () => {
    await expect(import("../forms/contact-form.types")).resolves.toBeTruthy();
    await expect(import("../../domain/entities/contact")).resolves.toBeTruthy();
    await expect(
      import("../../domain/repositories/contact.repository"),
    ).resolves.toBeTruthy();
    await expect(
      import("../../../../providers/I18nProvider"),
    ).resolves.toBeTruthy();
    await expect(
      import("../../../../providers/ThemeProvider"),
    ).resolves.toBeTruthy();
  });
});
