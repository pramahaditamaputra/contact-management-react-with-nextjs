import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "../badge";

describe("Badge", () => {
  it("renders the default badge variant", () => {
    render(<Badge>New</Badge>);

    const badge = screen.getByText("New");

    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveAttribute("data-variant", "default");
  });

  it("supports the outline variant", () => {
    render(<Badge variant="outline">Draft</Badge>);

    const badge = screen.getByText("Draft");

    expect(badge).toHaveAttribute("data-variant", "outline");
    expect(badge.className).toContain("border-border");
  });
});
