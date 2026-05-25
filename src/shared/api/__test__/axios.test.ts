import { describe, expect, it, vi } from "vitest";

describe("apiClient", () => {
  it("creates an axios client with the JSON content type header", async () => {
    const { apiClient } =
      await vi.importActual<typeof import("../axios")>("../axios");

    expect(apiClient.defaults.baseURL).toBeUndefined();
    expect(apiClient.defaults.headers["Content-Type"]).toBe("application/json");
  });
});
