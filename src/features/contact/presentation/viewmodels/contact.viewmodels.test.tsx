import { describe, expect, it, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useContactCreateViewModel } from "./useContactCreateViewModel";
import { useContactDetailViewModel } from "./useContactDetailViewModel";
import { useContactEditViewModel } from "./useContactEditViewModel";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push,
  })),
}));

const createMutation = vi.fn();
const deleteMutation = vi.fn();
const updateMutation = vi.fn();
const contactQuery = vi.fn();

vi.mock("../queries/useCreateContactMutation", () => ({
  useCreateContactMutation: vi.fn(() => ({
    mutateAsync: createMutation,
    isPending: false,
    error: null,
  })),
}));

vi.mock("../queries/useDeleteContactMutation", () => ({
  useDeleteContactMutation: vi.fn(() => ({
    mutateAsync: deleteMutation,
    isPending: false,
    error: null,
  })),
}));

vi.mock("../queries/useUpdateContactMutation", () => ({
  useUpdateContactMutation: vi.fn(() => ({
    mutateAsync: updateMutation,
    isPending: false,
    error: null,
  })),
}));

vi.mock("../queries/useContactQuery", () => ({
  useContactQuery: vi.fn(() => contactQuery()),
}));

describe("contact view models", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    contactQuery.mockReturnValue({
      data: { id: "1", name: "Budi", phone: "0812" },
      isLoading: false,
      error: null,
    });
  });

  it("creates a contact and redirects to the list", async () => {
    createMutation.mockResolvedValueOnce(undefined);

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
    contactQuery.mockReturnValueOnce({
      data: { id: "1", name: "Budi", phone: "0812" },
      isLoading: false,
      error: null,
    });

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
    contactQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      error: new Error("missing"),
    });

    const { result } = renderHook(() => useContactDetailViewModel("1"));

    expect(result.current.contact).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("updates a contact and redirects to the detail page", async () => {
    updateMutation.mockResolvedValueOnce(undefined);
    contactQuery.mockReturnValueOnce({
      data: { id: "1", name: "Budi", phone: "0812" },
      isLoading: false,
      error: null,
    });

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
    contactQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useContactEditViewModel("1"));

    expect(result.current.contact).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
