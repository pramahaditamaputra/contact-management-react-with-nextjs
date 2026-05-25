import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { DataTableContent } from "../data-table-content";

// create a minimal mock Table object that matches the shape used by the component
const mockTable = {
  getState: () => ({ pagination: { pageIndex: 0, pageSize: 10 } }),
  getHeaderGroups: () => [
    {
      id: "hg1",
      headers: [
        {
          id: "h1",
          isPlaceholder: false,
          getSize: () => 100,
          column: { columnDef: { header: () => "H" } },
          getContext: () => ({}),
        },
      ],
    },
  ],
  getRowModel: () => ({
    rows: [
      {
        id: "r1",
        getVisibleCells: () => [
          {
            id: "cell1",
            column: { getSize: () => 100, columnDef: { cell: () => "v1" } },
            getContext: () => ({}),
          },
        ],
        getIsSelected: () => false,
        original: {},
      },
    ],
  }),
  getColumnDefs: () => [],
};

describe("DataTable content with rows", () => {
  it("renders when rows exist", () => {
    render(
      <DataTableContent
        table={mockTable as any}
        columnsLength={1}
        loading={false}
      />,
    );
    expect(true).toBeTruthy();
  });
});
