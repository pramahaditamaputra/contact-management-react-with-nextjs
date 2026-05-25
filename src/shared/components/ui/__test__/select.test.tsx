import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Select, SelectTrigger, SelectContent, SelectItem } from "../select";

describe("Select interaction", () => {
  it("shows select items when opened", () => {
    render(
      <Select>
        <SelectTrigger>Sel</SelectTrigger>
        <SelectContent>
          <SelectItem>Option</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByText("Sel");
    fireEvent.click(trigger);
    expect(screen.getByText("Option")).toBeDefined();
  });
});
