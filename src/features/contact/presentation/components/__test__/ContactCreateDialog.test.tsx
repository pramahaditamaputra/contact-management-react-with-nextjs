import { describe, expect, it, vi, beforeEach } from "vitest";

const mutateAsync = vi.fn().mockResolvedValue(undefined);

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

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import contactCreateModalReducer from "../../state/contact-create-modal.slice";
import { ContactCreateDialog } from "../ContactCreateDialog";
import * as createContactMutationModule from "../../queries/useCreateContactMutation";

const store = configureStore({
  reducer: {
    contactCreateModal: contactCreateModalReducer,
  },
  preloadedState: {
    contactCreateModal: { isOpen: false },
  },
});

const ReduxProvider = Provider as React.ComponentType<{
  store: typeof store;
  children?: React.ReactNode;
}>;

describe("ContactCreateDialog", () => {
  beforeEach(() => {
    vi.spyOn(
      createContactMutationModule,
      "useCreateContactMutation",
    ).mockReturnValue({
      mutateAsync,
      isPending: false,
    } as never);
  });

  it("opens and submits the form", async () => {
    const user = userEvent.setup();

    render(
      <ReduxProvider store={store}>
        <ContactCreateDialog />
      </ReduxProvider>,
    );

    await user.click(screen.getByRole("button", { name: "open" }));
    expect(store.getState().contactCreateModal.isOpen).toBe(true);

    await user.type(screen.getByLabelText("Name"), "Budi");
    await user.type(screen.getByLabelText("Phone"), "0812");
    await user.click(screen.getByRole("button", { name: "Create contact" }));

    expect(mutateAsync).toHaveBeenCalledWith({
      name: "Budi",
      phone: "0812",
      email: "",
      notes: "",
    });
    expect(store.getState().contactCreateModal.isOpen).toBe(false);
  });

  it("closes the dialog when requested", async () => {
    const user = userEvent.setup();

    store.dispatch({ type: "contactCreateModal/openContactCreateModal" });

    render(
      <ReduxProvider store={store}>
        <ContactCreateDialog />
      </ReduxProvider>,
    );

    await user.click(screen.getByRole("button", { name: "close" }));

    expect(store.getState().contactCreateModal.isOpen).toBe(false);
  });
});
