import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ContactListView } from "../ContactListView";
import contactFilterReducer from "../../state/contact-filter.slice";
import { useContactListViewModel } from "../../viewmodels/useContactListViewModel";

vi.mock("../../viewmodels/useContactListViewModel", () => ({
  useContactListViewModel: vi.fn(),
}));

const mockedUseContactListViewModel = vi.mocked(useContactListViewModel);

const store = configureStore({
  reducer: { contactFilter: contactFilterReducer },
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
    filter: {
      keyword: "",
      onKeywordChange: vi.fn(),
    },
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
      filter: {
        keyword: "",
        onKeywordChange: vi.fn(),
      },
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
    const onKeywordChange = vi.fn();
    mockedUseContactListViewModel.mockReturnValueOnce({
      filter: {
        keyword: "",
        onKeywordChange,
      },
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
      filter: {
        keyword: "",
        onKeywordChange,
      },
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

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Search contact"), "budi");

    expect(onKeywordChange).toHaveBeenCalled();
    expect(onKeywordChange).toHaveBeenLastCalledWith("i");
  });
});
