import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

import { ContactCreateView } from "../ContactCreateView";
import { ContactDetailView } from "../ContactDetailView";
import { ContactEditView } from "../ContactEditView";
import * as createViewModelModule from "../../viewmodels/useContactCreateViewModel";
import * as detailViewModelModule from "../../viewmodels/useContactDetailViewModel";
import * as editViewModelModule from "../../viewmodels/useContactEditViewModel";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Contact views", () => {
  it("renders the create view", () => {
    vi.spyOn(
      createViewModelModule,
      "useContactCreateViewModel",
    ).mockReturnValue({
      onSubmit: vi.fn(),
      loading: false,
      error: null,
    } as never);

    render(<ContactCreateView />);

    expect(screen.getByText("Create Contact")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("renders the edit view with initial values", () => {
    vi.spyOn(editViewModelModule, "useContactEditViewModel").mockReturnValue({
      contact: {
        id: "1",
        name: "Budi",
        phone: "0812",
        email: "[email protected]",
        notes: "Friend",
      },
      onSubmit: vi.fn(),
      loading: true,
      error: null,
    } as never);

    render(<ContactEditView id="1" />);

    expect(screen.getByText("Edit Contact")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Budi");
    expect(screen.getByLabelText("Phone")).toHaveValue("0812");
    expect(screen.getByLabelText("Email")).toHaveValue("[email protected]");
    expect(screen.getByLabelText("Notes")).toHaveValue("Friend");
    expect(screen.getByRole("button", { name: "Saving..." })).toBeDisabled();
  });

  it("shows loading when the contact is missing", () => {
    vi.spyOn(
      detailViewModelModule,
      "useContactDetailViewModel",
    ).mockReturnValue({
      contact: null,
      onDelete: vi.fn(),
      loading: true,
      error: null,
    } as never);

    render(<ContactDetailView id="1" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows loading when the edit contact is missing", () => {
    vi.spyOn(editViewModelModule, "useContactEditViewModel").mockReturnValue({
      contact: null,
      onSubmit: vi.fn(),
      loading: true,
      error: null,
    } as never);

    render(<ContactEditView id="1" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders contact details and deletes the contact", async () => {
    const onDelete = vi.fn();
    vi.spyOn(
      detailViewModelModule,
      "useContactDetailViewModel",
    ).mockReturnValue({
      contact: {
        id: "1",
        name: "Budi",
        phone: "0812",
        email: "[email protected]",
        notes: "Friend",
      },
      onDelete,
      loading: false,
      error: null,
    } as never);

    render(<ContactDetailView id="1" />);

    expect(screen.getByText("Budi")).toBeInTheDocument();
    expect(screen.getByText("0812")).toBeInTheDocument();
    expect(screen.getByText("Friend")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute(
      "href",
      "/contacts/edit/1",
    );

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDelete).toHaveBeenCalled();
  });
});
