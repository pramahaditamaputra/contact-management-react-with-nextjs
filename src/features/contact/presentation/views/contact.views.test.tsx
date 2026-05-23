import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ContactCreateView } from "./ContactCreateView";
import { ContactDetailView } from "./ContactDetailView";
import { ContactEditView } from "./ContactEditView";
import { ContactForm } from "../components/ContactForm";
import { useContactCreateViewModel } from "../viewmodels/useContactCreateViewModel";
import { useContactDetailViewModel } from "../viewmodels/useContactDetailViewModel";
import { useContactEditViewModel } from "../viewmodels/useContactEditViewModel";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("../components/ContactForm", () => ({
  ContactForm: vi.fn(() => <div data-testid="contact-form" />),
}));

vi.mock("../viewmodels/useContactCreateViewModel", () => ({
  useContactCreateViewModel: vi.fn(),
}));

vi.mock("../viewmodels/useContactDetailViewModel", () => ({
  useContactDetailViewModel: vi.fn(),
}));

vi.mock("../viewmodels/useContactEditViewModel", () => ({
  useContactEditViewModel: vi.fn(),
}));

const mockedContactForm = vi.mocked(ContactForm);
const mockedCreateViewModel = vi.mocked(useContactCreateViewModel);
const mockedDetailViewModel = vi.mocked(useContactDetailViewModel);
const mockedEditViewModel = vi.mocked(useContactEditViewModel);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Contact views", () => {
  it("renders the create view", () => {
    const onSubmit = vi.fn();
    mockedCreateViewModel.mockReturnValue({
      onSubmit,
      loading: false,
      error: null,
    } as never);

    render(<ContactCreateView />);

    expect(screen.getByText("Create Contact")).toBeInTheDocument();
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
    expect(mockedContactForm).toHaveBeenCalledWith(
      expect.objectContaining({ onSubmit, loading: false }),
      undefined,
    );
  });

  it("renders the edit view with initial values", () => {
    const onSubmit = vi.fn();
    mockedEditViewModel.mockReturnValue({
      contact: {
        id: "1",
        name: "Budi",
        phone: "0812",
        email: "[email protected]",
        notes: "Friend",
      },
      onSubmit,
      loading: true,
      error: null,
    } as never);

    render(<ContactEditView id="1" />);

    expect(screen.getByText("Edit Contact")).toBeInTheDocument();
    expect(mockedContactForm).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValues: {
          name: "Budi",
          phone: "0812",
          email: "[email protected]",
          notes: "Friend",
        },
        onSubmit,
        loading: true,
      }),
      undefined,
    );
  });

  it("shows loading when the contact is missing", () => {
    mockedDetailViewModel.mockReturnValue({
      contact: null,
      onDelete: vi.fn(),
      loading: true,
      error: null,
    } as never);

    render(<ContactDetailView id="1" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows loading when the edit contact is missing", () => {
    mockedEditViewModel.mockReturnValue({
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
    mockedDetailViewModel.mockReturnValue({
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
