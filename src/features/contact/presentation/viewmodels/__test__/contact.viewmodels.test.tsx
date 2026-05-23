import { describe, expect, it, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push,
  })),
}));

const createMutation = vi.fn();
const deleteMutation = vi.fn();
const updateMutation = vi.fn();

import { useContactCreateViewModel } from "../useContactCreateViewModel";
import { useContactDetailViewModel } from "../useContactDetailViewModel";
import { useContactEditViewModel } from "../useContactEditViewModel";
import * as createMutationModule from "../../queries/useCreateContactMutation";
import * as deleteMutationModule from "../../queries/useDeleteContactMutation";
import * as updateMutationModule from "../../queries/useUpdateContactMutation";
import * as contactQueryModule from "../../queries/useContactQuery";

describe("contact view models", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a contact and redirects to the list", async () => {
    createMutation.mockResolvedValueOnce(undefined);

    vi.spyOn(createMutationModule, "useCreateContactMutation").mockReturnValue({
      mutateAsync: createMutation,
      isPending: false,
      error: null,
    } as never);

    const { result } = renderHook(() => useContactCreateViewModel());

    await result.current.onSubmit({ name: "Budi", phone: "0812" });

    expect(createMutation).toHaveBeenCalledWith({
      name: "Budi",
      phone: "0812",
    });
    expect(push).toHaveBeenCalledWith("/contacts");
  });

  it("loads a contact and deletes it before redirecting", async () => {
    deleteMutation.mockResolvedValueOnce(undefined);

    vi.spyOn(deleteMutationModule, "useDeleteContactMutation").mockReturnValue({
      mutateAsync: deleteMutation,
      isPending: false,
      error: null,
    } as never);

    vi.spyOn(contactQueryModule, "useContactQuery").mockReturnValue({
      data: { id: "1", name: "Budi", phone: "0812" },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as never);

    const { result } = renderHook(() => useContactDetailViewModel("1"));

    expect(result.current.contact).toEqual({
      id: "1",
      name: "Budi",
      phone: "0812",
    });

    await result.current.onDelete();

    expect(deleteMutation).toHaveBeenCalledWith("1");
    expect(push).toHaveBeenCalledWith("/contacts");
  });

  it("returns null contact when detail data is missing", () => {
    vi.spyOn(contactQueryModule, "useContactQuery").mockReturnValue({
      data: undefined,
      isLoading: true,
      error: new Error("missing"),
      refetch: vi.fn(),
    } as never);

    const { result } = renderHook(() => useContactDetailViewModel("1"));

    expect(result.current.contact).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("updates a contact and redirects to the detail page", async () => {
    updateMutation.mockResolvedValueOnce(undefined);

    vi.spyOn(updateMutationModule, "useUpdateContactMutation").mockReturnValue({
      mutateAsync: updateMutation,
      isPending: false,
      error: null,
    } as never);

    vi.spyOn(contactQueryModule, "useContactQuery").mockReturnValue({
      data: { id: "1", name: "Budi", phone: "0812" },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as never);

    const { result } = renderHook(() => useContactEditViewModel("1"));

    await result.current.onSubmit({
      name: "Budi Updated",
      phone: "0812",
    });

    expect(updateMutation).toHaveBeenCalledWith({
      id: "1",
      payload: {
        name: "Budi Updated",
        phone: "0812",
      },
    });
    expect(push).toHaveBeenCalledWith("/contacts/1");
  });

  it("returns null contact when edit data is missing", () => {
    vi.spyOn(contactQueryModule, "useContactQuery").mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as never);

    const { result } = renderHook(() => useContactEditViewModel("1"));

    expect(result.current.contact).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
