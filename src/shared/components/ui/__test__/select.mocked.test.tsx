/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
vi.mock("radix-ui", () => {
  const React = require("react");
  const Base = (props: any) => React.createElement("div", props);
  return {
    Select: {
      Root: Base,
      Trigger: (props: any) => React.createElement("button", props),
      Icon: (props: any) => React.createElement("span", props),
      Value: (props: any) => React.createElement("div", props),
      Viewport: (props: any) => React.createElement("div", props),
      ItemIndicator: (props: any) => React.createElement("span", props),
      ItemText: (props: any) => React.createElement("span", props),
      Separator: (props: any) => React.createElement("hr", props),
      Portal: Base,
      Content: Base,
      Item: (props: any) => React.createElement("div", props),
      Group: Base,
      Label: (props: any) => React.createElement("div", props),
      ScrollUpButton: (props: any) => React.createElement("div", props),
      ScrollDownButton: (props: any) => React.createElement("div", props),
    },
  };
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
} from "../select";

describe("Select (mocked radix) coverage", () => {
  it("renders Select variants and items", () => {
    render(
      <Select>
        <SelectTrigger>tr</SelectTrigger>
        <SelectContent>
          <SelectItem>i1</SelectItem>
          <SelectScrollUpButton />
          <SelectScrollDownButton />
        </SelectContent>
      </Select>,
    );

    expect(screen.getByText("tr")).toBeDefined();
    expect(screen.getByText("i1")).toBeDefined();
  });
});
