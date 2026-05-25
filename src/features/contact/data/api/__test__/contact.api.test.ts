import { describe, it, expect, vi } from "vitest";
import { contactApi } from "../contact.api";
import { apiClient } from "@/src/shared/api/axios";
import { endpoints } from "@/src/shared/api/endpoints";

vi.mock("@/src/shared/api/axios", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("contactApi", () => {
  it("calls apiClient.get with correct params", async () => {
    const dto = {
      results: [],
      info: { seed: "s", results: 0, page: 0, version: "v" },
    };
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: dto });

    const res = await contactApi.getContacts({
      seed: "s",
      pageSize: 2,
      pageIndex: 1,
    });

    expect(apiClient.get).toHaveBeenCalledWith(endpoints.contacts, {
      params: { results: 2, page: 1, seed: "s" },
    });
    expect(res).toBe(dto);
  });
});
