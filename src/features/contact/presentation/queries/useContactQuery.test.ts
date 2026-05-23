import { describe, expect, it, beforeEach, vi } from "vitest";
import { useContactQuery } from "./useContactQuery";
import { contactQueryKeys } from "./contact.querykeys";
import { useQuery } from "@tanstack/react-query";

const getContact = vi.fn();

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(function (options) {
    return options;
  }),
}));

vi.mock("../../data/repositories/contact.repository.impl", () => ({
  ContactRepositoryImpl: class {
    getContact = getContact;
  },
}));

describe("useContactQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates an enabled query for a contact id", async () => {
    getContact.mockResolvedValueOnce({
      id: "1",
      name: "Budi",
      phone: "0812",
    });

    const result = useContactQuery("1");

    expect(vi.mocked(useQuery)).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: contactQueryKeys.detail("1"),
        enabled: true,
      }),
    );
    await expect(result.queryFn()).resolves.toEqual({
      id: "1",
      name: "Budi",
      phone: "0812",
    });
    expect(getContact).toHaveBeenCalledWith("1");
  });

  it("disables the query when id is empty", () => {
    const result = useContactQuery("");

    expect(result.enabled).toBe(false);
  });
});
