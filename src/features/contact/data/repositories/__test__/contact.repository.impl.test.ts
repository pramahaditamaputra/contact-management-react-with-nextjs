import { describe, it, expect, vi } from "vitest";
import { ContactRepositoryImpl } from "../contact.repository.impl";
import { contactApi } from "../../api/contact.api";

vi.mock("../../api/contact.api", () => ({
  contactApi: { getContacts: vi.fn() },
}));

describe("ContactRepositoryImpl", () => {
  it("calls contactApi.getContacts and maps result", async () => {
    const dto = {
      results: [],
      info: { seed: "s", results: 0, page: 0, version: "v" },
    };
    vi.mocked(contactApi.getContacts).mockResolvedValueOnce(dto as any);

    const repo = new ContactRepositoryImpl();
    const res = await repo.getContacts({
      seed: "s",
      pageSize: 1,
      pageIndex: 0,
    });

    expect(contactApi.getContacts).toHaveBeenCalledWith({
      seed: "s",
      pageSize: 1,
      pageIndex: 0,
    });
    expect(Array.isArray(res)).toBe(true);
  });
});
