import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("renders initial values and resets when props change", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const { rerender } = render(
      <ContactForm
        initialValues={{
          name: "Budi",
          phone: "0812",
          email: "[email protected]",
          notes: "Friend",
        }}
        onSubmit={onSubmit}
      />,
    );

    expect(screen.getByPlaceholderText("Name")).toHaveValue("Budi");
    expect(screen.getByPlaceholderText("Phone")).toHaveValue("0812");
    expect(screen.getByPlaceholderText("Email")).toHaveValue(
      "[email protected]",
    );
    expect(screen.getByPlaceholderText("Notes")).toHaveValue("Friend");

    rerender(
      <ContactForm
        initialValues={{
          name: "Siti",
          phone: "0813",
          email: "",
          notes: "Colleague",
        }}
        onSubmit={onSubmit}
      />,
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Name")).toHaveValue("Siti");
      expect(screen.getByPlaceholderText("Phone")).toHaveValue("0813");
      expect(screen.getByPlaceholderText("Email")).toHaveValue("");
      expect(screen.getByPlaceholderText("Notes")).toHaveValue("Colleague");
    });
  });

  it("shows validation errors and submits valid values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<ContactForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Phone is required")).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Name"), "Budi");
    await user.type(screen.getByPlaceholderText("Phone"), "0812");
    await user.type(screen.getByPlaceholderText("Email"), "invalid-email");

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Invalid email")).toBeInTheDocument();

    await user.clear(screen.getByPlaceholderText("Email"));
    await user.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toEqual({
        name: "Budi",
        phone: "0812",
        email: "",
        notes: "",
      });
    });
  });

  it("shows loading state", () => {
    render(
      <ContactForm onSubmit={vi.fn().mockResolvedValue(undefined)} loading />,
    );

    expect(screen.getByRole("button", { name: "Saving..." })).toBeDisabled();
  });
});
