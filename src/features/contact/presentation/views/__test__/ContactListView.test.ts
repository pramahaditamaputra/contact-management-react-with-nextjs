import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ContactListView } from "../ContactListView";
import { useContactListViewModel } from "../../viewmodels/useContactListViewModel";

vi.mock("../../components/ContactCreateDialog", () => ({
  ContactCreateDialog: () =>
    React.createElement("div", { "data-testid": "contact-create-dialog" }),
}));

vi.mock("../../components/ContactEditSheet", () => ({
  ContactEditSheet: () =>
    React.createElement("div", { "data-testid": "contact-edit-sheet" }),
}));

vi.mock("../../components/ContactDeleteDialog", () => ({
  ContactDeleteDialog: ({
    contact,
    open,
  }: {
    contact: { name: string } | null;
    open: boolean;
  }) =>
    React.createElement("div", {
      "data-testid": "contact-delete-dialog",
      "data-open": String(open),
      "data-contact": contact?.name ?? "",
    }),
}));

vi.mock("../../viewmodels/useContactListViewModel", () => ({
  useContactListViewModel: vi.fn(),
}));

const mockedUseContactListViewModel = vi.mocked(useContactListViewModel);
let onKeywordChangeMock = vi.fn();
let onCreateContactMock = vi.fn();
let onEditContactMock = vi.fn();
let onDeleteContactRequestMock = vi.fn();

beforeEach(() => {
  onKeywordChangeMock = vi.fn();
  onCreateContactMock = vi.fn();
  onEditContactMock = vi.fn();
  onDeleteContactRequestMock = vi.fn();
  mockedUseContactListViewModel.mockReturnValue({
    filter: {
      keyword: "",
      onKeywordChange: onKeywordChangeMock,
    },
    pagination: {
      state: { pageIndex: 0, pageSize: 5 },
      pageCount: 1,
      onPaginationChange: vi.fn(),
    },
    contacts: {
      items: [{ id: "1", name: "Budi", phone: "0812" }],
      totalCount: 1,
      loading: false,
      error: null,
      refetch: vi.fn(),
    },
    createDialog: {
      isOpen: false,
      loading: false,
      error: null,
      onOpenChange: vi.fn(),
      onSubmit: vi.fn(),
    },
    editSheet: {
      contact: null,
      isOpen: false,
      initialValues: null,
      loading: false,
      error: null,
      onOpenChange: vi.fn(),
      onSubmit: vi.fn(),
    },
    deleteDialog: {
      contact: null,
      open: false,
      loading: false,
      onOpenChange: vi.fn(),
      onConfirm: vi.fn(),
    },
    actions: {
      onCreateContact: onCreateContactMock,
      onEditContact: onEditContactMock,
      onDeleteContactRequest: onDeleteContactRequestMock,
    },
  });
});

describe("ContactListView", () => {
  it("renders contacts", () => {
    render(React.createElement(ContactListView));

    expect(screen.getByText("Budi")).toBeInTheDocument();
    expect(screen.getByText("0812")).toBeInTheDocument();
  });

  it("triggers create action from the view model", () => {
    render(React.createElement(ContactListView));

    screen.getByRole("button", { name: "Add Contact" }).click();

    expect(onCreateContactMock).toHaveBeenCalledTimes(1);
  });

  it("triggers edit action from the view model", async () => {
    const user = userEvent.setup();

    render(React.createElement(ContactListView));

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByText("Edit"));

    expect(onEditContactMock).toHaveBeenCalledWith({
      id: "1",
      name: "Budi",
      phone: "0812",
    });
  });

  it("triggers delete action from the row menu", async () => {
    const user = userEvent.setup();

    render(React.createElement(ContactListView));

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByText("Delete"));

    expect(onDeleteContactRequestMock).toHaveBeenCalledWith({
      id: "1",
      name: "Budi",
      phone: "0812",
    });
  });

  it("shows loading state", () => {
    mockedUseContactListViewModel.mockReturnValueOnce({
      filter: {
        keyword: "",
        onKeywordChange: vi.fn(),
      },
      pagination: {
        state: { pageIndex: 0, pageSize: 5 },
        pageCount: 1,
        onPaginationChange: vi.fn(),
      },
      contacts: {
        items: [],
        totalCount: 0,
        loading: true,
        error: null,
        refetch: vi.fn(),
      },
      createDialog: {
        isOpen: false,
        loading: false,
        error: null,
        onOpenChange: vi.fn(),
        onSubmit: vi.fn(),
      },
      editSheet: {
        contact: null,
        isOpen: false,
        initialValues: null,
        loading: false,
        error: null,
        onOpenChange: vi.fn(),
        onSubmit: vi.fn(),
      },
      deleteDialog: {
        contact: null,
        open: false,
        loading: false,
        onOpenChange: vi.fn(),
        onConfirm: vi.fn(),
      },
      actions: {
        onCreateContact: vi.fn(),
        onEditContact: vi.fn(),
        onDeleteContactRequest: vi.fn(),
      },
    });

    const { container } = render(React.createElement(ContactListView));

    expect(
      container.querySelectorAll('[data-slot="skeleton"]').length,
    ).toBeGreaterThan(0);
  });

  it("shows error state", () => {
    mockedUseContactListViewModel.mockReturnValueOnce({
      filter: {
        keyword: "",
        onKeywordChange: vi.fn(),
      },
      pagination: {
        state: { pageIndex: 0, pageSize: 5 },
        pageCount: 1,
        onPaginationChange: vi.fn(),
      },
      contacts: {
        items: [],
        totalCount: 0,
        loading: false,
        error: new Error("failed"),
        refetch: vi.fn(),
      },
      createDialog: {
        isOpen: false,
        loading: false,
        error: null,
        onOpenChange: vi.fn(),
        onSubmit: vi.fn(),
      },
      editSheet: {
        contact: null,
        isOpen: false,
        initialValues: null,
        loading: false,
        error: null,
        onOpenChange: vi.fn(),
        onSubmit: vi.fn(),
      },
      deleteDialog: {
        contact: null,
        open: false,
        loading: false,
        onOpenChange: vi.fn(),
        onConfirm: vi.fn(),
      },
      actions: {
        onCreateContact: vi.fn(),
        onEditContact: vi.fn(),
        onDeleteContactRequest: vi.fn(),
      },
    });

    render(React.createElement(ContactListView));

    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  it("forwards keyword changes from the search input", () => {
    render(React.createElement(ContactListView));

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "siti" },
    });

    expect(onKeywordChangeMock).toHaveBeenCalledWith("siti");
  });
});
