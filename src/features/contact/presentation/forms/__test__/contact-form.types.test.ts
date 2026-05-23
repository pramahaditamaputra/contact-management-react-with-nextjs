import { describe, expect, it } from "vitest";

describe("runtime modules used by contact forms", () => {
  it("loads type-only and placeholder modules without error", async () => {
    await expect(import("../contact-form.types")).resolves.toBeTruthy();
    await expect(
      import("../../../../../providers/ThemeProvider"),
    ).resolves.toBeTruthy();
  });
});
