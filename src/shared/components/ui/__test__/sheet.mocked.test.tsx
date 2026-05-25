vi.mock("radix-ui", () => {
  const React = require("react");
  const Base = (props: any) => React.createElement("div", props);
  return {
    Dialog: {
      Root: Base,
      Trigger: (props: any) => React.createElement("button", props),
      Portal: Base,
      Content: (props: any) => React.createElement("div", props),
      Title: (props: any) => React.createElement("h3", props),
      Description: (props: any) => React.createElement("p", props),
      Close: (props: any) => React.createElement("button", props),
    },
  };
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sheet } from "../sheet";

describe("Sheet (mocked radix) coverage", () => {
  it("renders sheet with close button variation", () => {
    render(
      <Sheet>
        <div>sheet inner</div>
      </Sheet>
    );

    expect(screen.getByText("sheet inner")).toBeDefined();
  });
});
