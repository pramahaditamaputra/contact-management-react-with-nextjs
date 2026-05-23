import { describe, expect, it, vi } from "vitest";

describe("apiClient", () => {
  it("uses the configured base url and json header", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.test");
    vi.resetModules();

    const { apiClient } =
      await vi.importActual<typeof import("../axios")>("../axios");

    expect(apiClient.defaults.baseURL).toBe("https://api.example.test");
    expect(
      apiClient.defaults.headers["Content-Type"] ??
        apiClient.defaults.headers.common?.["Content-Type"],
    ).toBe("application/json");
  });
});
