import { describe, it, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contactFilterSlice from "../../state/contact-filter.slice";

vi.mock("../../queries/useContactsQuery", () => ({
  useContactsQuery: vi.fn(() => ({
    data: {
      items: [{ id: "1", name: "Budi", phone: "0812" }],
      total: 1,
      skip: 0,
      limit: 5,
    },
    isLoading: false,
    isFetching: false,
    error: null,
    refetch: vi.fn(),
  })),
}));

import { useContactsQuery } from "../../queries/useContactsQuery";
import { useContactListViewModel } from "../useContactListViewModel";

const store = configureStore({
  reducer: { contactFilter: contactFilterSlice },
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const ReduxProvider = Provider as React.ComponentType<{
  store: typeof store;
  children?: React.ReactNode;
}>;

const wrapper = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(ReduxProvider, { store }, children),
  );
};

describe("useContactListViewModel", () => {
  it("returns keyword and contacts", () => {
    const { result } = renderHook(() => useContactListViewModel(), { wrapper });

    expect(result.current.filter.keyword).toBe("");
    expect(result.current.contacts.items).toEqual([
      { id: "1", name: "Budi", phone: "0812" },
    ]);
    expect(result.current.contacts.totalCount).toBe(1);
    expect(result.current.pagination.pageCount).toBe(1);
  });

  it("falls back to empty contacts when data is missing", () => {
    vi.mocked(useContactsQuery).mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      isFetching: true,
      error: new Error("missing"),
      refetch: vi.fn(),
    } as never);

    const { result } = renderHook(() => useContactListViewModel(), { wrapper });

    expect(result.current.contacts.items).toEqual([]);
    expect(result.current.contacts.loading).toBe(true);
    expect(result.current.contacts.error).toBeInstanceOf(Error);
  });

  it("dispatches keyword updates", () => {
    const { result } = renderHook(() => useContactListViewModel(), { wrapper });

    act(() => {
      result.current.filter.onKeywordChange("siti");
    });

    expect(result.current.filter.keyword).toBe("siti");
  });
});
