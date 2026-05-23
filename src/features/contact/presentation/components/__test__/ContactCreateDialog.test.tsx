import { describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import contactCreateModalReducer from "../../state/contact-create-modal.slice";
import { ContactCreateDialog } from "../ContactCreateDialog";

const mutateAsync = vi.fn().mockResolvedValue(undefined);

vi.mock("../queries/useCreateContactMutation", () => ({
  useCreateContactMutation: () => ({
    mutateAsync,
    isPending: false,
  }),
}));

vi.mock("./ContactForm", () => ({
  ContactForm: ({
    onSubmit,
    submitLabel,
  }: {
    onSubmit: (values: never) => Promise<void>;
    submitLabel?: string;
  }) => (
    <button
      type="button"
      onClick={() =>
        onSubmit({ name: "Budi", phone: "0812", email: "", notes: "" } as never)
      }
    >
      {submitLabel ?? "Save"}
    </button>
  ),
}));

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
  it("opens and submits the form", async () => {
    const user = userEvent.setup();

    render(
      <ReduxProvider store={store}>
        <ContactCreateDialog />
      </ReduxProvider>,
    );

    await user.click(screen.getByRole("button", { name: "open" }));
    expect(store.getState().contactCreateModal.isOpen).toBe(true);

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
