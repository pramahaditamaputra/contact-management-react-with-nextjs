import { describe, expect, it, beforeEach, vi } from "vitest";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(function (options) {
    return options;
  }),
}));

vi.mock("../../../data/repositories/contact.repository.impl", () => ({
  ContactRepositoryImpl: class {
    getContact = vi.fn().mockResolvedValue({
      id: "1",
      name: "Budi",
      phone: "0812",
    });
  },
}));

import { useContactQuery } from "../useContactQuery";
import { contactQueryKeys } from "../contact.querykeys";
import { useQuery } from "@tanstack/react-query";

describe("useContactQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getLastQueryOptions = () => {
    const call = vi.mocked(useQuery).mock.calls.at(-1);

    return call?.[0] as {
      queryKey: readonly unknown[];
      queryFn: () => Promise<unknown>;
      enabled?: boolean;
    };
  };

  it("creates an enabled query for a contact id", async () => {
    useContactQuery("1");
    const options = getLastQueryOptions();

    expect(vi.mocked(useQuery)).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: contactQueryKeys.detail("1"),
        enabled: true,
      }),
    );
    await expect(options.queryFn()).resolves.toEqual(
      expect.objectContaining({
        id: "1",
        name: "Budi",
        phone: "0812",
      }),
    );
  });

  it("disables the query when id is empty", () => {
    useContactQuery("");
    const options = getLastQueryOptions();

    expect(options.enabled).toBe(false);
  });
});
