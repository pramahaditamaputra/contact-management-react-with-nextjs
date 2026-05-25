import { describe, it, expect, vi } from "vitest";
import { useContactsQuery } from "../useContactsQuery";
import { useQuery } from "@tanstack/react-query";
import { contactQueryKeys } from "../contact.querykeys";

vi.mock("@tanstack/react-query", () => ({ useQuery: vi.fn() }));
vi.mock("../../../domain/usecases/get-contacts.usecase", () => ({
  GetContactsUseCase: class {
    execute() {
      return Promise.resolve([]);
    }
  },
}));

describe("useContactsQuery", () => {
  it("calls useQuery with correct queryKey and queryFn/select work", async () => {
    (useQuery as any).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    });

    useContactsQuery({ seed: "s", pageIndex: 0, pageSize: 5 });

    expect(useQuery).toHaveBeenCalled();
    const calledWith = (useQuery as any).mock.calls[0][0];
    expect(calledWith.queryKey).toEqual(contactQueryKeys.list("s", 0, 5));

    // call queryFn and select to ensure paths are executable
    const data = await calledWith.queryFn();
    expect(Array.isArray(data)).toBe(true);
    expect(calledWith.select).toBeInstanceOf(Function);
    const ui = calledWith.select([
      {
        id: "1",
        name: "A",
        phone: "p",
        cell: "c",
        location: "l",
        email: "e",
        dob: new Date().toISOString(),
        picture: "",
      },
    ]);
    expect(Array.isArray(ui)).toBe(true);
  });
});
