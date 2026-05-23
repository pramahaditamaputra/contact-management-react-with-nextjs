import { describe, expect, it, beforeEach, vi } from "vitest";
import { useCreateContactMutation } from "./useCreateContactMutation";
import { useDeleteContactMutation } from "./useDeleteContactMutation";
import { useUpdateContactMutation } from "./useUpdateContactMutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactQueryKeys } from "./contact.querykeys";

const createContact = vi.fn();
const deleteContact = vi.fn();
const updateContact = vi.fn();
const invalidateQueries = vi.fn().mockResolvedValue(undefined);

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(function (options) {
    return options;
  }),
  useQueryClient: vi.fn(function () {
    return {
      invalidateQueries,
    };
  }),
}));

vi.mock("../../data/repositories/contact.repository.impl", () => ({
  ContactRepositoryImpl: class {
    createContact = createContact;
    deleteContact = deleteContact;
    updateContact = updateContact;
  },
}));

describe("contact mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates contacts and invalidates the list query", async () => {
    createContact.mockResolvedValueOnce({
      id: "1",
      name: "Budi",
      phone: "0812",
    });

    const mutation = useCreateContactMutation();

    await expect(
      mutation.mutationFn({ name: "Budi", phone: "0812" }),
    ).resolves.toEqual({
      id: "1",
      name: "Budi",
      phone: "0812",
    });

    await mutation.onSuccess?.();

    expect(createContact).toHaveBeenCalledWith({
      name: "Budi",
      phone: "0812",
    });
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: contactQueryKeys.all,
    });
  });

  it("deletes contacts and invalidates the list query", async () => {
    deleteContact.mockResolvedValueOnce(undefined);

    const mutation = useDeleteContactMutation();

    await expect(mutation.mutationFn("1")).resolves.toBeUndefined();
    await mutation.onSuccess?.();

    expect(deleteContact).toHaveBeenCalledWith("1");
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: contactQueryKeys.all,
    });
  });

  it("updates contacts and invalidates list and detail queries", async () => {
    updateContact.mockResolvedValueOnce({
      id: "1",
      name: "Budi Updated",
      phone: "0812",
    });

    const mutation = useUpdateContactMutation();

    await expect(
      mutation.mutationFn({
        id: "1",
        payload: { name: "Budi Updated" },
      }),
    ).resolves.toEqual({
      id: "1",
      name: "Budi Updated",
      phone: "0812",
    });

    await mutation.onSuccess?.(undefined, {
      id: "1",
      payload: { name: "Budi Updated" },
    });

    expect(updateContact).toHaveBeenCalledWith("1", {
      name: "Budi Updated",
    });
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: contactQueryKeys.all,
    });
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: contactQueryKeys.detail("1"),
    });
    expect(vi.mocked(useQueryClient)).toHaveBeenCalled();
    expect(vi.mocked(useMutation)).toHaveBeenCalled();
  });
});
