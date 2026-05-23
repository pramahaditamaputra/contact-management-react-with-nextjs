import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../ContactForm";

describe("ContactForm", () => {
  it("renders initial values and resets when props change", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const { rerender } = render(
      <ContactForm
        initialValues={{
          name: "Budi",
          phone: "0812",
          email: "[email protected]",
          image: "https://example.com/avatar.png",
          notes: "Friend",
        }}
        onSubmit={onSubmit}
      />,
    );

    expect(screen.getByLabelText("Name")).toHaveValue("Budi");
    expect(screen.getByLabelText("Phone")).toHaveValue("0812");
    expect(screen.getByLabelText("Email")).toHaveValue("[email protected]");
    expect(screen.getByAltText("Photo preview")).toHaveAttribute(
      "src",
      "https://example.com/avatar.png",
    );
    expect(screen.getByLabelText("Notes")).toHaveValue("Friend");

    rerender(
      <ContactForm
        initialValues={{
          name: "Siti",
          phone: "0813",
          email: "",
          image: "",
          notes: "Colleague",
        }}
        onSubmit={onSubmit}
      />,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveValue("Siti");
      expect(screen.getByLabelText("Phone")).toHaveValue("0813");
      expect(screen.getByLabelText("Email")).toHaveValue("");
      expect(screen.queryByAltText("Photo preview")).not.toBeInTheDocument();
      expect(screen.getByLabelText("Notes")).toHaveValue("Colleague");
    });
  });

  it("shows validation errors and submits valid values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<ContactForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Phone is required")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Name"), "Budi");
    await user.type(screen.getByLabelText("Phone"), "0812");
    await user.type(screen.getByLabelText("Email"), "invalid-email");

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Invalid email")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("Email"));
    const photoInput = screen.getByLabelText("Photo") as HTMLInputElement;
    await user.upload(
      photoInput,
      new File(["avatar-bytes"], "avatar.png", { type: "image/png" }),
    );

    await waitFor(() => {
      expect(screen.getByAltText("Photo preview")).toHaveAttribute(
        "src",
        expect.stringContaining("data:image/png;base64,"),
      );
    });

    await user.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toMatchObject({
        name: "Budi",
        phone: "0812",
        email: "",
        notes: "",
      });
      expect(onSubmit.mock.calls[0][0].image).toEqual(
        expect.stringContaining("data:image/png;base64,"),
      );
    });
  });

  it("shows loading state", () => {
    render(
      <ContactForm onSubmit={vi.fn().mockResolvedValue(undefined)} loading />,
    );

    expect(screen.getByRole("button", { name: "Saving..." })).toBeDisabled();
  });
});
