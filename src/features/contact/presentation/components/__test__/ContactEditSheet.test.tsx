import { describe, expect, it, vi } from "vitest";

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

describe("ContactEditSheet", () => {
  it("shows the selected contact and submits updates", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <ContactEditSheet
        contact={{
          id: "1",
          name: "Budi",
          phone: "0812",
          email: "budi@example.com",
          image: "https://example.com/avatar.png",
          notes: "Friend",
        }}
        isOpen
        initialValues={{
          name: "Budi",
          phone: "0812",
          email: "budi@example.com",
          image: "https://example.com/avatar.png",
          notes: "Friend",
        }}
        loading={false}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />,
    );

    expect(screen.getByText("Edit Contact")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Budi");

    await user.clear(screen.getByLabelText("Name"));
    await user.type(screen.getByLabelText("Name"), "Budi Updated");
    await user.click(screen.getByRole("button", { name: "Update contact" }));

    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      name: "Budi Updated",
      phone: "0812",
      email: "budi@example.com",
      image: "https://example.com/avatar.png",
      notes: "Friend",
    });
  });

  it("closes the sidebar when requested", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <ContactEditSheet
        contact={{
          id: "1",
          name: "Budi",
          phone: "0812",
        }}
        isOpen
        initialValues={{
          name: "Budi",
          phone: "0812",
          email: undefined,
          image: undefined,
          notes: undefined,
        }}
        loading={false}
        onOpenChange={onOpenChange}
        onSubmit={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    await user.click(screen.getByRole("button", { name: "close" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
