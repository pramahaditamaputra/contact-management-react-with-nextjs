import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/src/features/contact/presentation/views/ContactView", () => ({
  __esModule: true,
  default: () => <div data-testid="contact-view" />,
}));

import ContactsPage from "../page";

describe("Contacts page", () => {
  it("renders ContactView", () => {
    render(<ContactsPage />);
    expect(screen.getByTestId("contact-view")).toBeInTheDocument();
  });
});
