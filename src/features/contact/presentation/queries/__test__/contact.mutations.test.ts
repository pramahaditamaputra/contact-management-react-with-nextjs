import { describe, expect, it, beforeEach, vi } from "vitest";

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

vi.mock("../../../data/api/contact.api", () => ({
  contactApi: {
    createContact: vi.fn().mockResolvedValue({
      id: "1",
      name: "Budi",
      phone: "0812",
    }),
    deleteContact: vi.fn().mockResolvedValue(undefined),
    updateContact: vi.fn().mockResolvedValue({
      id: "1",
      name: "Budi Updated",
      phone: "0812",
    }),
  },
}));

import { useCreateContactMutation } from "../useCreateContactMutation";
import { useDeleteContactMutation } from "../useDeleteContactMutation";
import { useUpdateContactMutation } from "../useUpdateContactMutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactQueryKeys } from "../contact.querykeys";
import {
  CreateContactPayload,
  UpdateContactPayload,
} from "../../../domain/repositories/contact.repository";
import { Contact } from "../../../domain/entities/contact";

type MutationOptionsLike<TVariables, TData> = {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (
    data: TData | undefined,
    variables: TVariables,
  ) => Promise<void> | void;
};

describe("contact mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getLastMutationOptions = <TVariables, TData>() => {
    const call = vi.mocked(useMutation).mock.calls.at(-1);

    return call?.[0] as MutationOptionsLike<TVariables, TData>;
  };

  it("creates contacts and invalidates the list query", async () => {
    useCreateContactMutation();
    const options = getLastMutationOptions<CreateContactPayload, Contact>();

    await expect(
      options.mutationFn({ name: "Budi", phone: "0812" }),
    ).resolves.toEqual(
      expect.objectContaining({
        id: "1",
        name: "Budi",
        phone: "0812",
      }),
    );

    await options.onSuccess?.(
      { id: "1", name: "Budi", phone: "0812" },
      { name: "Budi", phone: "0812" },
    );

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: contactQueryKeys.all,
    });
  });

  it("deletes contacts and invalidates the list query", async () => {
    useDeleteContactMutation();
    const options = getLastMutationOptions<string, void>();

    await expect(options.mutationFn("1")).resolves.toBeUndefined();
    await options.onSuccess?.(undefined, "1");

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: contactQueryKeys.all,
    });
  });

  it("updates contacts and invalidates list and detail queries", async () => {
    useUpdateContactMutation();
    const options = getLastMutationOptions<
      { id: string; payload: UpdateContactPayload },
      Contact
    >();

    await expect(
      options.mutationFn({
        id: "1",
        payload: { name: "Budi Updated" },
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        id: "1",
        name: "Budi Updated",
        phone: "0812",
      }),
    );

    await options.onSuccess?.(undefined, {
      id: "1",
      payload: { name: "Budi Updated" },
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
