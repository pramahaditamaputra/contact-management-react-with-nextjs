import React from "react";
import { describe, expect, it, vi } from "vitest";

const dialogOnOpenChange = vi.fn();

vi.mock("@/src/shared/components/ui/dialog", () => ({
  Dialog: ({
    children,
    onOpenChange,
    open,
  }: {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
  }) =>
    React.createElement(
      "div",
      { "data-open": String(open) },
      React.createElement(
        "button",
        {
          type: "button",
          onClick: () => onOpenChange?.(false),
        },
        "close",
      ),
      children,
    ),
  DialogContent: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children),
  DialogDescription: ({ children }: { children: React.ReactNode }) =>
    React.createElement("p", null, children),
  DialogFooter: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children),
  DialogHeader: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children),
  DialogTitle: ({ children }: { children: React.ReactNode }) =>
    React.createElement("h2", null, children),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactDeleteDialog } from "../ContactDeleteDialog";

describe("ContactDeleteDialog", () => {
  it("shows the contact details and confirms deletion", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <ContactDeleteDialog
        contact={{ id: "1", name: "Budi", phone: "0812" }}
        open
        loading={false}
        onOpenChange={dialogOnOpenChange}
        onConfirm={onConfirm}
      />,
    );

    expect(screen.getByText("Delete Contact")).toBeInTheDocument();
    expect(screen.getByText(/Budi/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Yes, delete" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("closes the dialog when cancel is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ContactDeleteDialog
        contact={{ id: "1", name: "Budi", phone: "0812" }}
        open
        loading={false}
        onOpenChange={dialogOnOpenChange}
        onConfirm={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(dialogOnOpenChange).toHaveBeenCalledWith(false);
  });
});
