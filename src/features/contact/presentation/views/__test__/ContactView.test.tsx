import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("../../viewmodels/useContactViewModel", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("@/src/shared/components/data-table/data-table", () => ({
  DataTable: ({ children }: any) => (
    <div data-testid="data-table">{children}</div>
  ),
}));

import ContactView from "../ContactView";
import useContactViewModel from "../../viewmodels/useContactViewModel";

const mocked = vi.mocked(useContactViewModel as any);

describe("ContactView", () => {
  it("renders failed state when contacts.error present", () => {
    mocked.mockReturnValueOnce({ contacts: { error: new Error("x") } } as any);
    const { getByText } = render((<ContactView />) as any);
    expect(getByText("Failed to load")).toBeInTheDocument();
  });

  it("renders DataTable when contacts present", () => {
    mocked.mockReturnValueOnce({
      contacts: { items: [], loading: false, error: null },
      pagination: {},
      columns: [],
    } as any);
    render((<ContactView />) as any);
    expect(screen.getByTestId("data-table")).toBeInTheDocument();
  });
});
