vi.mock("vaul", () => {
  const React = require("react");
  const Base = (props: any) => React.createElement("div", props);
  return {
    Drawer: {
      Root: Base,
      Trigger: (props: any) => React.createElement("button", props),
      Overlay: (props: any) => React.createElement("div", props),
      Portal: Base,
      Content: Base,
      Title: (props: any) => React.createElement("h4", props),
      Description: (props: any) => React.createElement("p", props),
      Close: (props: any) => React.createElement("button", props),
    },
  };
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "../drawer";

describe("Drawer (mocked vaul) coverage", () => {
  it("renders drawer content/header/footer variations", () => {
    render(
      <Drawer>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>t</DrawerTitle>
            <DrawerDescription>d</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>f</DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    expect(screen.getByText("t")).toBeDefined();
    expect(screen.getByText("d")).toBeDefined();
    expect(screen.getByText("f")).toBeDefined();
  });
});
