import { describe, expect, it, vi } from "vitest";
import { CreateContactUseCase } from "../create-contact.usecase";
import { DeleteContactUseCase } from "../delete-contact.usecase";
import { GetContactUseCase } from "../get-contact.usecase";
import { UpdateContactUseCase } from "../update-contact.usecase";

const createRepository = () => ({
  getContacts: vi.fn(),
  getContact: vi.fn(),
  createContact: vi.fn(),
  updateContact: vi.fn(),
  deleteContact: vi.fn(),
});

describe("contact use cases", () => {
  it("forwards create payload", async () => {
    const repository = createRepository();
    repository.createContact.mockResolvedValueOnce({
      id: "1",
      name: "Budi",
      phone: "0812",
    });

    const useCase = new CreateContactUseCase(repository);
    const result = await useCase.execute({ name: "Budi", phone: "0812" });

    expect(repository.createContact).toHaveBeenCalledWith({
      name: "Budi",
      phone: "0812",
    });
    expect(result).toEqual({ id: "1", name: "Budi", phone: "0812" });
  });

  it("forwards delete id", async () => {
    const repository = createRepository();
    repository.deleteContact.mockResolvedValueOnce(undefined);

    const useCase = new DeleteContactUseCase(repository);
    await useCase.execute("1");

    expect(repository.deleteContact).toHaveBeenCalledWith("1");
  });

  it("forwards get contact id", async () => {
    const repository = createRepository();
    repository.getContact.mockResolvedValueOnce({
      id: "1",
      name: "Budi",
      phone: "0812",
    });

    const useCase = new GetContactUseCase(repository);
    const result = await useCase.execute("1");

    expect(repository.getContact).toHaveBeenCalledWith("1");
    expect(result).toEqual({ id: "1", name: "Budi", phone: "0812" });
  });

  it("forwards update payload", async () => {
    const repository = createRepository();
    repository.updateContact.mockResolvedValueOnce({
      id: "1",
      name: "Budi Updated",
      phone: "0812",
    });

    const useCase = new UpdateContactUseCase(repository);
    const result = await useCase.execute("1", { name: "Budi Updated" });

    expect(repository.updateContact).toHaveBeenCalledWith("1", {
      name: "Budi Updated",
    });
    expect(result).toEqual({
      id: "1",
      name: "Budi Updated",
      phone: "0812",
    });
  });
});
