import { describe, expect, it, vi } from "vitest";

vi.mock("@/src/shared/components/ui/dialog", () => ({
  Dialog: ({
    children,
    onOpenChange,
    open,
  }: {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
  }) => (
    <div data-open={String(open)}>
      <button type="button" onClick={() => onOpenChange?.(true)}>
        open
      </button>
      <button type="button" onClick={() => onOpenChange?.(false)}>
        close
      </button>
      {children}
    </div>
  ),
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  ),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactCreateDialog } from "../ContactCreateDialog";

describe("ContactCreateDialog", () => {
  it("opens and submits the form", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <ContactCreateDialog
        isOpen
        loading={false}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />,
    );

    await user.type(screen.getByLabelText("Name"), "Budi");
    await user.type(screen.getByLabelText("Phone"), "0812");
    await user.click(screen.getByRole("button", { name: "Create contact" }));

    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      name: "Budi",
      phone: "0812",
      email: "",
      image: "",
      notes: "",
    });
  });

  it("closes the dialog when requested", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <ContactCreateDialog
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
