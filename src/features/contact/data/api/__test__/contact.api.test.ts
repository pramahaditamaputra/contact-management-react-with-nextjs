import { describe, expect, it, beforeEach, vi } from "vitest";
import { contactApi } from "../contact.api";
import { apiClient } from "@/src/shared/api/axios";

vi.mock("@/src/shared/api/axios", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("contactApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches contacts with keyword params", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        users: [{ id: "1", name: "Budi", phone: "0812" }],
        total: 1,
        skip: 0,
        limit: 10,
      },
    } as never);

    await contactApi.getContacts("budi");

    expect(apiClient.get).toHaveBeenCalledWith("/users", {
      params: { keyword: "budi" },
    });
  });

  it("fetches contacts without keyword params", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        users: [{ id: "1", name: "Budi", phone: "0812" }],
        total: 1,
        skip: 0,
        limit: 10,
      },
    } as never);

    await contactApi.getContacts();

    expect(apiClient.get).toHaveBeenCalledWith("/users", {
      params: undefined,
    });
  });

  it("fetches a contact by id", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: { id: "1", name: "Budi", phone: "0812" },
    } as never);

    await contactApi.getContact("1");

    expect(apiClient.get).toHaveBeenCalledWith("/users/1");
  });

  it("creates a contact", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { id: "1", name: "Budi", phone: "0812" },
    } as never);

    await contactApi.createContact({
      name: "Budi",
      phone: "0812",
      email: "[email protected]",
    });

    expect(apiClient.post).toHaveBeenCalledWith("/users", {
      name: "Budi",
      phone: "0812",
      email: "[email protected]",
    });
  });

  it("updates a contact", async () => {
    vi.mocked(apiClient.put).mockResolvedValueOnce({
      data: { id: "1", name: "Budi Updated", phone: "0812" },
    } as never);

    await contactApi.updateContact("1", { name: "Budi Updated" });

    expect(apiClient.put).toHaveBeenCalledWith("/users/1", {
      name: "Budi Updated",
    });
  });

  it("deletes a contact", async () => {
    vi.mocked(apiClient.delete).mockResolvedValueOnce(undefined as never);

    await contactApi.deleteContact("1");

    expect(apiClient.delete).toHaveBeenCalledWith("/users/1");
  });
});
