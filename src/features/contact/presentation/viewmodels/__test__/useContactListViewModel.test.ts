import { describe, it, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contactPaginationSlice from "../../state/contact-pagination.slice";

vi.mock("../../queries/useContactsQuery", () => ({
  useContactsQuery: vi.fn(() => ({
    data: [{ id: "1", name: "Budi", phone: "0812" }],
    isLoading: false,
    isFetching: false,
    error: null,
    refetch: vi.fn(),
  })),
}));

import { useContactsQuery } from "../../queries/useContactsQuery";
import useContactViewModel from "../useContactViewModel";

const store = configureStore({
  reducer: {
    contactPagination: contactPaginationSlice,
  },
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
  return React.createElement(ReduxProvider, { store }, children);
};

describe("useContactViewModel", () => {
  it("reads pagination from redux and loads contacts", () => {
    const { result } = renderHook(() => useContactViewModel(), { wrapper });

    expect(result.current.pagination.state).toEqual({
      pageIndex: 0,
      pageSize: 5,
    });
    expect(result.current.contacts.items).toEqual([
      { id: "1", name: "Budi", phone: "0812" },
    ]);
    expect(result.current.pagination.pageCount).toBeUndefined();
    expect(vi.mocked(useContactsQuery)).toHaveBeenCalledWith({
      pageIndex: 0,
      pageSize: 5,
    });
  });

  it("updates pagination through redux", () => {
    const { result } = renderHook(() => useContactViewModel(), { wrapper });

    act(() => {
      result.current.pagination.onPaginationChange({
        pageIndex: 2,
        pageSize: 10,
      });
    });

    expect(result.current.pagination.state).toEqual({
      pageIndex: 2,
      pageSize: 10,
    });
    expect(vi.mocked(useContactsQuery)).toHaveBeenLastCalledWith({
      pageIndex: 2,
      pageSize: 10,
    });
  });
});
