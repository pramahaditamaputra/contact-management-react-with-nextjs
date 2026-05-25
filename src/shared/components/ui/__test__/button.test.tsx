import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../button";

describe("Button", () => {
  it("renders the default button state", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveAttribute("data-variant", "default");
    expect(button).toHaveAttribute("data-size", "default");
  });

  it("supports variant and size overrides", () => {
    render(
      <Button variant="outline" size="sm">
        Outline
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Outline" });

    expect(button).toHaveAttribute("data-variant", "outline");
    expect(button).toHaveAttribute("data-size", "sm");
    expect(button.className).toContain("border-border");
  });
});
