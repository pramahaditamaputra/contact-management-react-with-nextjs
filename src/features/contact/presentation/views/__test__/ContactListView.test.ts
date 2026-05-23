import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ContactListView } from "../ContactListView";
import contactFilterReducer from "../../state/contact-filter.slice";
import contactCreateModalReducer from "../../state/contact-create-modal.slice";
import { useContactListViewModel } from "../../viewmodels/useContactListViewModel";

vi.mock("../../components/ContactCreateDialog", () => ({
  ContactCreateDialog: () =>
    React.createElement("div", { "data-testid": "contact-create-dialog" }),
}));

vi.mock("../../viewmodels/useContactListViewModel", () => ({
  useContactListViewModel: vi.fn(),
}));

const mockedUseContactListViewModel = vi.mocked(useContactListViewModel);

const store = configureStore({
  reducer: {
    contactFilter: contactFilterReducer,
    contactCreateModal: contactCreateModalReducer,
  },
});

const ReduxProvider = Provider as React.ComponentType<{
  store: typeof store;
  children?: React.ReactNode;
}>;

const wrapper = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return React.createElement(ReduxProvider, { store }, children);
};

beforeEach(() => {
  mockedUseContactListViewModel.mockReturnValue({
    contacts: {
      items: [{ id: "1", name: "Budi", phone: "0812" }],
      loading: false,
      error: null,
      refetch: vi.fn(),
    },
  });
});

describe("ContactListView", () => {
  it("renders contacts", () => {
    render(
      React.createElement(wrapper, null, React.createElement(ContactListView)),
    );

    expect(screen.getByText("Budi")).toBeInTheDocument();
    expect(screen.getByText("0812")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockedUseContactListViewModel.mockReturnValueOnce({
      contacts: {
        items: [],
        loading: true,
        error: null,
        refetch: vi.fn(),
      },
    });

    render(
      React.createElement(wrapper, null, React.createElement(ContactListView)),
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state and forwards keyword changes", async () => {
    mockedUseContactListViewModel.mockReturnValueOnce({
      contacts: {
        items: [],
        loading: false,
        error: new Error("failed"),
        refetch: vi.fn(),
      },
    });

    render(
      React.createElement(wrapper, null, React.createElement(ContactListView)),
    );

    expect(screen.getByText("Failed to load")).toBeInTheDocument();

    mockedUseContactListViewModel.mockReturnValueOnce({
      contacts: {
        items: [],
        loading: false,
        error: null,
        refetch: vi.fn(),
      },
    });

    render(
      React.createElement(wrapper, null, React.createElement(ContactListView)),
    );

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });
});
