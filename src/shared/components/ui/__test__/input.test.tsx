import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "../input";

describe("Input", () => {
  it("renders an input with the shared slot marker", () => {
    render(<Input aria-label="Email" type="email" />);

    const input = screen.getByLabelText("Email");

    expect(input).toHaveAttribute("data-slot", "input");
    expect(input).toHaveAttribute("type", "email");
  });
});
