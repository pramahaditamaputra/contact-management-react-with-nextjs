import { describe, it, expect, vi } from "vitest";
import { GetContactsUseCase } from "../get-contacts.usecase";

describe("GetContactsUseCase", () => {
  it("calls repository with keyword", async () => {
    const repository = {
      getContact: vi.fn(),
      getContacts: vi.fn().mockResolvedValue([]),
      createContact: vi.fn(),
      updateContact: vi.fn(),
      deleteContact: vi.fn(),
    };

    const useCase = new GetContactsUseCase(repository);
    await useCase.execute("budi");

    expect(repository.getContacts).toHaveBeenCalledWith("budi", 0, 5);
  });
});
