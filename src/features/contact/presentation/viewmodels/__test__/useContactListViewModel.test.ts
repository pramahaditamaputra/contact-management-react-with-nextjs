import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contactFilterSlice from "../../state/contact-filter.slice";
import contactCreateModalReducer from "../../state/contact-create-modal.slice";
import contactEditModalReducer from "../../state/contact-edit-modal.slice";
import contactDeleteModalReducer from "../../state/contact-delete-modal.slice";

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

const createMutateAsync = vi.fn().mockResolvedValue(undefined);
const updateMutateAsync = vi.fn().mockResolvedValue(undefined);

const deleteMutateAsync = vi.fn().mockResolvedValue(undefined);

vi.mock("../../queries/useCreateContactMutation", () => ({
  useCreateContactMutation: vi.fn(() => ({
    mutateAsync: createMutateAsync,
    isPending: false,
    error: null,
  })),
}));

vi.mock("../../queries/useUpdateContactMutation", () => ({
  useUpdateContactMutation: vi.fn(() => ({
    mutateAsync: updateMutateAsync,
    isPending: false,
    error: null,
  })),
}));

vi.mock("../../queries/useDeleteContactMutation", () => ({
  useDeleteContactMutation: vi.fn(() => ({
    mutateAsync: deleteMutateAsync,
    isPending: false,
  })),
}));

import { useContactsQuery } from "../../queries/useContactsQuery";
import { useContactListViewModel } from "../useContactListViewModel";
import { useCreateContactMutation } from "../../queries/useCreateContactMutation";
import { useUpdateContactMutation } from "../../queries/useUpdateContactMutation";
import { useDeleteContactMutation } from "../../queries/useDeleteContactMutation";

const store = configureStore({
  reducer: {
    contactFilter: contactFilterSlice,
    contactCreateModal: contactCreateModalReducer,
    contactEditModal: contactEditModalReducer,
    contactDeleteModal: contactDeleteModalReducer,
  },
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
  beforeEach(() => {
    createMutateAsync.mockClear();
    updateMutateAsync.mockClear();
    deleteMutateAsync.mockClear();
  });

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

  it("handles create dialog state and submit flow", async () => {
    const { result } = renderHook(() => useContactListViewModel(), { wrapper });

    act(() => {
      result.current.createDialog.onOpenChange(true);
    });

    expect(result.current.createDialog.isOpen).toBe(true);

    await act(async () => {
      await result.current.createDialog.onSubmit({
        name: "Budi",
        phone: "0812",
        email: "",
        image: "",
        notes: "",
      });
    });

    expect(createMutateAsync).toHaveBeenCalledWith({
      name: "Budi",
      phone: "0812",
      email: "",
      image: "",
      notes: "",
    });
    expect(result.current.createDialog.isOpen).toBe(false);
    expect(vi.mocked(useCreateContactMutation)).toHaveBeenCalled();
  });

  it("handles edit sheet state and submit flow", async () => {
    const { result } = renderHook(() => useContactListViewModel(), { wrapper });

    act(() => {
      result.current.actions.onEditContact({
        id: "1",
        name: "Budi",
        phone: "0812",
      });
    });

    expect(result.current.editSheet.isOpen).toBe(true);
    expect(result.current.editSheet.contactId).toBe("1");

    await act(async () => {
      await result.current.editSheet.onSubmit({
        name: "Budi Updated",
        phone: "0812",
        email: "budi@example.com",
        image: "https://example.com/avatar.png",
        notes: "Friend",
      });
    });

    expect(updateMutateAsync).toHaveBeenCalledWith({
      id: "1",
      payload: {
        name: "Budi Updated",
        phone: "0812",
        email: "budi@example.com",
        image: "https://example.com/avatar.png",
        notes: "Friend",
      },
    });
    expect(result.current.editSheet.isOpen).toBe(false);
    expect(result.current.editSheet.contactId).toBeNull();
    expect(vi.mocked(useUpdateContactMutation)).toHaveBeenCalled();
  });

  it("opens the delete dialog and confirms deletion", async () => {
    const { result } = renderHook(() => useContactListViewModel(), { wrapper });

    act(() => {
      result.current.actions.onDeleteContactRequest({
        id: "1",
        name: "Budi",
        phone: "0812",
      });
    });

    expect(result.current.deleteDialog.open).toBe(true);
    expect(result.current.deleteDialog.contactId).toBe("1");

    await act(async () => {
      await result.current.deleteDialog.onConfirm();
    });

    expect(deleteMutateAsync).toHaveBeenCalledWith("1");
    expect(result.current.deleteDialog.open).toBe(false);
    expect(result.current.deleteDialog.contactId).toBeNull();
    expect(vi.mocked(useDeleteContactMutation)).toHaveBeenCalled();
  });
});
