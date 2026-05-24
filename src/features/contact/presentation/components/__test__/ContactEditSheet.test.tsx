import { describe, expect, it, vi } from "vitest";

vi.mock("../../queries/useContactQuery", () => ({
  useContactQuery: vi.fn(),
}));

vi.mock("@/src/shared/components/ui/sheet", () => ({
  Sheet: ({
    children,
    onOpenChange,
    open,
  }: {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
  }) => (
    <div data-open={String(open)}>
      <button type="button" onClick={() => onOpenChange?.(false)}>
        close
      </button>
      {children}
    </div>
  ),
  SheetContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SheetDescription: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
  SheetHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SheetTitle: ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  ),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactEditSheet } from "../ContactEditSheet";
import { useContactQuery } from "../../queries/useContactQuery";

describe("ContactEditSheet", () => {
  it("shows the selected contact and submits updates", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    vi.mocked(useContactQuery).mockReturnValue({
      data: {
        id: "1",
        name: "Budi Fresh",
        phone: "0812-9999",
        email: "fresh@example.com",
        image: "https://example.com/fresh.png",
        notes: "Loaded from detail API",
      },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    } as never);

    render(
      <ContactEditSheet
        contactId="1"
        isOpen
        loading={false}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />,
    );

    expect(screen.getByText("Edit Contact")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Budi Fresh");

    await user.clear(screen.getByLabelText("Name"));
    await user.type(screen.getByLabelText("Name"), "Budi Updated");
    await user.click(screen.getByRole("button", { name: "Update contact" }));

    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      name: "Budi Updated",
      phone: "0812-9999",
      email: "fresh@example.com",
      image: "https://example.com/fresh.png",
      notes: "Loaded from detail API",
    });
  });

  it("closes the sidebar when requested", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    vi.mocked(useContactQuery).mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: true,
      error: null,
      refetch: vi.fn(),
    } as never);

    render(
      <ContactEditSheet
        contactId="1"
        isOpen
        loading={false}
        onOpenChange={onOpenChange}
        onSubmit={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    await user.click(screen.getByRole("button", { name: "close" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
