import { describe, expect, it, vi, beforeEach } from "vitest";

const mutateAsync = vi.fn().mockResolvedValue(undefined);

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

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import contactEditModalReducer from "../../state/contact-edit-modal.slice";
import { ContactEditSheet } from "../ContactEditSheet";
import * as updateContactMutationModule from "../../queries/useUpdateContactMutation";

const ReduxProvider = Provider as React.ComponentType<{
  store: ReturnType<typeof makeStore>;
  children?: React.ReactNode;
}>;

function makeStore() {
  return configureStore({
    reducer: {
      contactEditModal: contactEditModalReducer,
    },
    preloadedState: {
      contactEditModal: {
        isOpen: true,
        contact: {
          id: "1",
          name: "Budi",
          phone: "0812",
          email: "budi@example.com",
          image: "https://example.com/avatar.png",
          notes: "Friend",
        },
      },
    },
  });
}

describe("ContactEditSheet", () => {
  beforeEach(() => {
    vi.spyOn(
      updateContactMutationModule,
      "useUpdateContactMutation",
    ).mockReturnValue({
      mutateAsync,
      isPending: false,
    } as never);
  });

  it("shows the selected contact and submits updates", async () => {
    const user = userEvent.setup();
    const store = makeStore();

    render(
      <ReduxProvider store={store}>
        <ContactEditSheet />
      </ReduxProvider>,
    );

    expect(screen.getByText("Edit Contact")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Budi");

    await user.clear(screen.getByLabelText("Name"));
    await user.type(screen.getByLabelText("Name"), "Budi Updated");
    await user.click(screen.getByRole("button", { name: "Update contact" }));

    expect(mutateAsync).toHaveBeenCalledWith({
      id: "1",
      payload: {
        name: "Budi Updated",
        phone: "0812",
        email: "budi@example.com",
        image: "https://example.com/avatar.png",
        notes: "Friend",
      },
    });
    expect(store.getState().contactEditModal.isOpen).toBe(false);
  });

  it("closes the sidebar when requested", async () => {
    const user = userEvent.setup();
    const store = makeStore();

    render(
      <ReduxProvider store={store}>
        <ContactEditSheet />
      </ReduxProvider>,
    );

    await user.click(screen.getByRole("button", { name: "close" }));

    expect(store.getState().contactEditModal.isOpen).toBe(false);
  });
});
