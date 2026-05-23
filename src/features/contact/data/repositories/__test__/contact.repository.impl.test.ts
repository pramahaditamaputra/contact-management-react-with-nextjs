import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../api/contact.api", () => ({
  contactApi: {
    getContacts: vi.fn(),
    getContact: vi.fn(),
    createContact: vi.fn(),
    updateContact: vi.fn(),
    deleteContact: vi.fn(),
  },
}));

import { ContactRepositoryImpl } from "../contact.repository.impl";
import { contactApi } from "../../api/contact.api";

describe("ContactRepositoryImpl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("maps api result to entity on getContacts", async () => {
    vi.mocked(contactApi.getContacts).mockResolvedValue({
      users: [
        { id: "1", firstName: "Budi", lastName: "Santoso", phone: "0812" },
      ],
      total: 1,
      skip: 0,
      limit: 10,
    });

    const repo = new ContactRepositoryImpl();
    const result = await repo.getContacts();

    expect(result).toEqual({
      items: [
        {
          id: "1",
          name: "Budi Santoso",
          phone: "0812",
          email: "N/A",
          image: "https://via.placeholder.com/150",
        },
      ],
      total: 1,
      skip: 0,
      limit: 10,
    });
  });

  it("forwards keyword to api on getContacts", async () => {
    vi.mocked(contactApi.getContacts).mockResolvedValue({
      users: [
        { id: "2", firstName: "Siti", lastName: "Aminah", phone: "0813" },
      ],
      total: 1,
      skip: 0,
      limit: 10,
    });

    const repo = new ContactRepositoryImpl();
    const result = await repo.getContacts("siti");

    expect(contactApi.getContacts).toHaveBeenCalledWith("siti", 0, 5);
    expect(result).toEqual({
      items: [
        {
          id: "2",
          name: "Siti Aminah",
          phone: "0813",
          email: "N/A",
          image: "https://via.placeholder.com/150",
        },
      ],
      total: 1,
      skip: 0,
      limit: 10,
    });
  });

  it("returns contact entity or null on getContact", async () => {
    vi.mocked(contactApi.getContact).mockResolvedValue({
      id: "1",
      firstName: "Budi",
      lastName: "Santoso",
      phone: "0812",
    });

    const repo = new ContactRepositoryImpl();
    const result = await repo.getContact("1");

    expect(contactApi.getContact).toHaveBeenCalledWith("1");
    expect(result).toEqual({
      id: "1",
      name: "Budi Santoso",
      phone: "0812",
      email: "N/A",
      image: "https://via.placeholder.com/150",
    });

    vi.mocked(contactApi.getContact).mockResolvedValue(null as never);
    const result2 = await repo.getContact("2");
    expect(result2).toBeNull();
  });

  it("calls createContact api", async () => {
    vi.mocked(contactApi.createContact).mockResolvedValue({
      id: "1",
      firstName: "Budi",
      lastName: "Santoso",
      phone: "0812",
    });

    const repo = new ContactRepositoryImpl();
    await repo.createContact({ name: "Budi", phone: "0812" });

    expect(contactApi.createContact).toHaveBeenCalledWith({
      name: "Budi",
      phone: "0812",
    });
  });

  it("maps api result to entity on updateContact and calls api", async () => {
    vi.mocked(contactApi.updateContact).mockResolvedValue({
      id: "1",
      firstName: "Budi",
      lastName: "Updated",
      phone: "0812",
    });

    const repo = new ContactRepositoryImpl();
    const result = await repo.updateContact("1", { name: "Budi Updated" });

    expect(contactApi.updateContact).toHaveBeenCalledWith("1", {
      name: "Budi Updated",
    });
    expect(result).toEqual({
      id: "1",
      name: "Budi Updated",
      phone: "0812",
      email: "N/A",
      image: "https://via.placeholder.com/150",
    });
  });

  it("calls deleteContact api", async () => {
    vi.mocked(contactApi.deleteContact).mockResolvedValue(undefined);

    const repo = new ContactRepositoryImpl();
    await repo.deleteContact("1");

    expect(contactApi.deleteContact).toHaveBeenCalledWith("1");
  });
});
