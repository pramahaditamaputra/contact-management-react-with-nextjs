vi.mock("radix-ui", () => {
  const React = require("react");
  const Base = (props: any) => React.createElement("div", props);
  return {
    Dialog: {
      Root: Base,
      Trigger: (props: any) => React.createElement("button", props),
      Portal: Base,
      Close: Base,
      Overlay: Base,
      Content: (props: any) => React.createElement("div", props),
      Title: (props: any) => React.createElement("h2", props),
      Description: (props: any) => React.createElement("p", props),
    },
  };
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../dialog";

describe("Dialog (mocked radix) coverage", () => {
  it("renders content with and without close button", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <>
          <DialogContent showCloseButton={false}>
            <DialogTitle>T</DialogTitle>
            <DialogDescription>D</DialogDescription>
          </DialogContent>
          <DialogContent showCloseButton={true}>
            <DialogTitle>T2</DialogTitle>
            <DialogDescription>D2</DialogDescription>
          </DialogContent>
        </>
      </Dialog>,
    );

    expect(screen.getByText("Open")).toBeDefined();
    expect(screen.getByText("T")).toBeDefined();
    expect(screen.getByText("D")).toBeDefined();
    expect(screen.getByText("T2")).toBeDefined();
    expect(screen.getByText("D2")).toBeDefined();
  });
});
