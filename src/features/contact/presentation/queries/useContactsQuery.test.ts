import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContactsQuery } from "./useContactsQuery";

vi.mock("../../data/repositories/contact.repository.impl", () => ({
  ContactRepositoryImpl: vi.fn().mockImplementation(function () {
    return {
      getContacts: vi
        .fn()
        .mockResolvedValue([{ id: "1", name: "Budi", phone: "0812" }]),
    };
  }),
}));

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

    expect(result.current.data).toEqual([
      { id: "1", name: "Budi", phone: "0812" },
    ]);
  });
});
