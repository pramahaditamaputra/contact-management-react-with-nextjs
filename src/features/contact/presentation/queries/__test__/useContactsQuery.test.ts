import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../../data/repositories/contact.repository.impl", () => ({
  ContactRepositoryImpl: vi.fn().mockImplementation(function () {
    return {
      getContacts: vi.fn().mockResolvedValue({
        items: [{ id: "1", name: "Budi", phone: "0812" }],
        total: 1,
        skip: 0,
        limit: 1,
      }),
    };
  }),
}));

import { useContactsQuery } from "../useContactsQuery";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return React.createElement(QueryClientProvider, { client }, children);
};

describe("useContactsQuery", () => {
  it("returns contacts", async () => {
    const { result } = renderHook(() => useContactsQuery("budi"), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      items: [
        expect.objectContaining({
          id: "1",
          name: "Budi",
          phone: "0812",
        }),
      ],
      total: 1,
      skip: 0,
      limit: 1,
    });
  });
});
