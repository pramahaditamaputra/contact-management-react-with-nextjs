import { describe, it, expect, vi } from "vitest";
/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import { render, screen } from "@testing-library/react";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img alt={props.alt} src={props.src} />,
}));
vi.mock("@/src/shared/components/data-table/data-table-column-header", () => ({
  DataTableColumnHeader: ({ title }: any) => <div>{title}</div>,
}));

import contactColumns from "../columns-contact";

describe("contactColumns", () => {
  it("renders picture cell with image", () => {
    const cols = contactColumns();
    const cell = cols[1].cell!({
      row: { original: { picture: "img.jpg" } },
    } as any) as any;
    render(cell);
    expect(screen.getByAltText("Avatar")).toHaveAttribute("src", "img.jpg");
  });
  it("renders name header using DataTableColumnHeader", () => {
    const cols = contactColumns();
    const header = cols[0].header!({
      column: { getCanSort: () => false },
    } as any) as any;
    render(header);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});
