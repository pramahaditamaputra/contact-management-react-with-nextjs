import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Label } from "../label";

describe("Label", () => {
  it("renders the shared label slot marker", () => {
    render(<Label htmlFor="email">Email</Label>);

    const label = screen.getByText("Email");

    expect(label).toHaveAttribute("data-slot", "label");
    expect(label).toHaveAttribute("for", "email");
  });
});
