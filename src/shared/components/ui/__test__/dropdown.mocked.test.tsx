/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
vi.mock("radix-ui", () => {
  const React = require("react");
  const Base = (props: any) => React.createElement("div", props);
  return {
    DropdownMenu: {
      Root: Base,
      Trigger: (props: any) => React.createElement("button", props),
      Portal: Base,
      Content: Base,
      Item: (props: any) => React.createElement("div", props),
      CheckboxItem: (props: any) => React.createElement("div", props),
      RadioGroup: Base,
      RadioItem: (props: any) => React.createElement("div", props),
      Label: (props: any) => React.createElement("div", props),
      Separator: (props: any) => React.createElement("hr", props),
      Sub: Base,
      SubTrigger: (props: any) => React.createElement("div", props),
      SubContent: Base,
      Group: Base,
      ItemIndicator: Base,
    },
  };
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "../dropdown-menu";

describe("DropdownMenu (mocked radix) coverage", () => {
  it("renders items and checkbox/radio/sub variants", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>t</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>it</DropdownMenuItem>
          <DropdownMenuCheckboxItem checked>cb</DropdownMenuCheckboxItem>
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem>r</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>sub</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>subc</DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuLabel>lab</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuShortcut>sc</DropdownMenuShortcut>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByText("it")).toBeDefined();
    expect(screen.getByText("cb")).toBeDefined();
    expect(screen.getByText("r")).toBeDefined();
    expect(screen.getByText("subc")).toBeDefined();
    expect(screen.getByText("lab")).toBeDefined();
    expect(screen.getByText("sc")).toBeDefined();
  });
});
