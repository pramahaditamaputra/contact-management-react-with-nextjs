import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Dialog, DialogTrigger, DialogContent } from "../dialog";

describe("Dialog interaction", () => {
  it("opens dialog content when trigger is clicked", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <div>Dialog Body</div>
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByText("Open");
    fireEvent.click(trigger);
    expect(screen.getByText("Dialog Body")).toBeDefined();
  });
});
