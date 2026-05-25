import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../dropdown-menu";

describe("DropdownMenu interaction", () => {
  it("renders dropdown trigger", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
      </DropdownMenu>
    );

    const trigger = screen.getByText("Menu");
    expect(trigger).toBeDefined();
  });
});
