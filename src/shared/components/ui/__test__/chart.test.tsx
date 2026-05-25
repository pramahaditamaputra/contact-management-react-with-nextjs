/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import {
  ChartStyle,
  ChartTooltipContent,
  ChartLegendContent,
  ChartContainer,
} from "../chart";

describe("chart utilities", () => {
  it("ChartTooltipContent returns null for inactive or empty payload", () => {
    const config = { a: { label: "A" } } as any;

    // inactive
    render(
      <ChartContainer config={config}>
        <ChartTooltipContent active={false} payload={[]} />
      </ChartContainer>,
    );
    // nothing rendered
    expect(document.body.textContent).not.toContain("A");
  });

  it("ChartStyle returns style tag when config contains colors", () => {
    render(<ChartStyle id="c1" config={{ x: { color: "#123" } }} />);
    expect(document.querySelector("style")).toBeTruthy();
    expect(document.querySelector("style")?.innerHTML).toContain("--color-x");
  });

  it("ChartTooltipContent and ChartLegendContent render with provided payload", () => {
    const config = { v: { label: "V" } } as any;

    render(
      <ChartContainer config={config}>
        <ChartTooltipContent
          active
          payload={[{ name: "v", value: 1, dataKey: "v" } as any]}
        />
        <ChartLegendContent
          payload={[
            { name: "v", value: 1, dataKey: "v", color: "#000" } as any,
          ]}
        />
      </ChartContainer>,
    );

    expect(document.body.textContent).toContain("V");
  });
});
