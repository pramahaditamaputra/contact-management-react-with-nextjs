import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Drawer, DrawerTrigger, DrawerContent } from "../drawer";

describe("Drawer interaction", () => {
  it("opens drawer content when trigger is clicked", () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <div>Drawer Body</div>
        </DrawerContent>
      </Drawer>
    );

    const trigger = screen.getByText("Open");
    fireEvent.click(trigger);
    expect(screen.getByText("Drawer Body")).toBeDefined();
  });
});
