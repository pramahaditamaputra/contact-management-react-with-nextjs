import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import ContactsPage from "../page";
import ContactCreatePage from "../create/page";
import ContactDetailPage from "../[id]/page";
import ContactEditPage from "../edit/[id]/page";
import { ContactListView } from "@/src/features/contact/presentation/views/ContactView";
import { ContactCreateView } from "@/src/features/contact/presentation/views/ContactCreateView";
import { ContactDetailView } from "@/src/features/contact/presentation/views/ContactDetailView";
import { ContactEditView } from "@/src/features/contact/presentation/views/ContactEditView";

vi.mock("@/src/features/contact/presentation/views/ContactListView", () => ({
  ContactListView: vi.fn(() => <div data-testid="contact-list-view" />),
}));

vi.mock("@/src/features/contact/presentation/views/ContactCreateView", () => ({
  ContactCreateView: vi.fn(() => <div data-testid="contact-create-view" />),
}));

vi.mock("@/src/features/contact/presentation/views/ContactDetailView", () => ({
  ContactDetailView: vi.fn(() => <div data-testid="contact-detail-view" />),
}));

vi.mock("@/src/features/contact/presentation/views/ContactEditView", () => ({
  ContactEditView: vi.fn(() => <div data-testid="contact-edit-view" />),
}));

describe("contact pages", () => {
  it("renders the contacts list page", () => {
    render(<ContactsPage />);

    expect(screen.getByTestId("contact-list-view")).toBeInTheDocument();
    expect(vi.mocked(ContactListView)).toHaveBeenCalled();
  });

  it("renders the create contact page", () => {
    render(<ContactCreatePage />);

    expect(screen.getByTestId("contact-create-view")).toBeInTheDocument();
    expect(vi.mocked(ContactCreateView)).toHaveBeenCalled();
  });

  it("renders the detail contact page", async () => {
    const element = await ContactDetailPage({
      params: Promise.resolve({ id: "1" }),
    });

    render(element);

    expect(screen.getByTestId("contact-detail-view")).toBeInTheDocument();
    expect(vi.mocked(ContactDetailView)).toHaveBeenCalledWith(
      { id: "1" },
      undefined,
    );
  });

  it("renders the edit contact page", async () => {
    const element = await ContactEditPage({
      params: Promise.resolve({ id: "1" }),
    });

    render(element);

    expect(screen.getByTestId("contact-edit-view")).toBeInTheDocument();
    expect(vi.mocked(ContactEditView)).toHaveBeenCalledWith(
      { id: "1" },
      undefined,
    );
  });
});
