/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { GetContactsUseCase } from "../get-contacts.usecase";

describe("GetContactsUseCase", () => {
  it("calls repository.getContacts with mapped params", async () => {
    const repo = { getContacts: vi.fn().mockResolvedValue([]) };
    const useCase = new GetContactsUseCase(repo as any);

    await useCase.execute({ seed: "s", page: 1, results: 5 });

    expect(repo.getContacts).toHaveBeenCalledWith({
      seed: "s",
      pageSize: 5,
      pageIndex: 1,
    });
  });
});
