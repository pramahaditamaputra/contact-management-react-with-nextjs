import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Sheet, SheetTrigger, SheetContent } from "../sheet";

describe("Sheet interaction", () => {
  it("shows sheet content when trigger is clicked", () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <div>Sheet Body</div>
        </SheetContent>
      </Sheet>,
    );

    const trigger = screen.getByText("Open");
    fireEvent.click(trigger);
    expect(screen.getByText("Sheet Body")).toBeDefined();
  });
});
